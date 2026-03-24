import { getSendDatesForMonth, getNextSendDate } from "@/lib/date-utils";
import {
  getKnowledgeHighlightsForLane,
  getKnowledgeHighlightsForPaths,
  listKnowledgeDocs
} from "@/lib/knowledge";
import { generateDraft, reviseDraft } from "@/lib/providers/ai";
import { getAuthContext } from "@/lib/providers/auth";
import { sendEmailDraft } from "@/lib/providers/email";
import {
  buildTutorialScriptFromDraft,
  getHeyGenProviderMode,
  pollTutorialVideoRender,
  requestTutorialVideoRender
} from "@/lib/providers/heygen";
import { getProviderStatuses } from "@/lib/providers/status";
import { createLinkedAsset, storeUploadedFile } from "@/lib/providers/storage";
import { createSeedState } from "@/lib/seed";
import { readStudioState, updateStudioState } from "@/lib/store";
import type {
  AssetKind,
  Audience,
  DraftContent,
  DraftItem,
  SendDay,
  SourceLane,
  StudioState,
  TutorialVideoWorkflow
} from "@/lib/types";

function nowIso(): string {
  return new Date().toISOString();
}

function pickDraft(state: StudioState, draftId: string): DraftItem {
  const draft = state.drafts.find((entry) => entry.id === draftId);

  if (!draft) {
    throw new Error(`Draft ${draftId} not found.`);
  }

  return draft;
}

function toList(input: string): string[] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function summarizeApprovalPattern(draft: DraftItem): string {
  return `Approved pattern from "${draft.subject}": ${draft.sendDay} ${draft.audience} draft with ${draft.revisionCount} revisions and one clear lesson.`;
}

function canUseTutorialVideoFlow(draft: DraftItem): boolean {
  return draft.status === "approved" || draft.status === "scheduled";
}

function createTutorialVideoState(draft: DraftItem): TutorialVideoWorkflow {
  return {
    status: "script_draft",
    mode: getHeyGenProviderMode(),
    title: `training_${draft.sendDay.toLowerCase()}_${draft.id.slice(0, 8)}`,
    script: buildTutorialScriptFromDraft(draft),
    scriptLocked: false,
    aspectRatio: (process.env.HEYGEN_ASPECT_RATIO as "16:9" | "9:16") || "16:9",
    background: process.env.HEYGEN_BACKGROUND || "#F3EFE7",
    renderId: null,
    renderStatus: null,
    pollCount: 0,
    scriptApprovedAt: null,
    requestedAt: null,
    lastPolledAt: null,
    videoUrl: null,
    thumbnailUrl: null,
    durationLabel: null,
    errorMessage: null,
    attachedAssetId: null,
    rejectionReason: null
  };
}

function createDraftRecord(
  generated: DraftContent,
  input: {
    sendDay: SendDay;
    audience: Audience;
    sourceLane: SourceLane;
    topic: string;
    notes: string;
    complianceMode: "standard" | "safe";
    assetIds: string[];
  }
): DraftItem {
  const createdAt = nowIso();

  return {
    id: crypto.randomUUID(),
    title: generated.title,
    subject: generated.subject,
    previewText: generated.previewText,
    body: generated.body,
    sendDay: input.sendDay,
    audience: input.audience,
    sourceLane: input.sourceLane,
    topic: input.topic,
    notes: input.notes,
    assetIds: input.assetIds,
    status: "draft",
    createdAt,
    updatedAt: createdAt,
    scheduledFor: null,
    aiMode: generated.mode,
    revisionCount: 0,
    lastInstruction: null,
    complianceMode: input.complianceMode,
    tutorialVideo: null
  };
}

export async function getStudioSnapshot() {
  const state = await readStudioState().catch(async () => {
    return createSeedState();
  });
  const docs = await listKnowledgeDocs();
  const providerStatuses = getProviderStatuses();
  const auth = getAuthContext();

  return {
    state,
    docs,
    providerStatuses,
    auth
  };
}

export async function getDashboardData() {
  const { state, providerStatuses } = await getStudioSnapshot();

  return {
    upcoming: state.schedule
      .filter((item) => item.status === "scheduled")
      .sort((left, right) => left.scheduledFor.localeCompare(right.scheduledFor))
      .slice(0, 6),
    approvals: state.drafts.filter((draft) => draft.status === "draft").slice(0, 6),
    recentDrafts: [...state.drafts]
      .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
      .slice(0, 5),
    metrics: {
      totalDrafts: state.drafts.length,
      approvalQueue: state.drafts.filter((draft) => draft.status === "draft").length,
      scheduled: state.schedule.filter((item) => item.status === "scheduled").length,
      sent: state.drafts.filter((draft) => draft.status === "sent").length
    },
    providerStatuses
  };
}

export async function createGeneratedDraft(input: {
  sendDay: SendDay;
  audience: Audience;
  sourceLane: SourceLane;
  topic: string;
  notes: string;
  complianceMode: "standard" | "safe";
  assetIds: string[];
  knowledgePaths?: string[];
}) {
  const state = await readStudioState();
  const attachments = state.assets.filter((asset) => input.assetIds.includes(asset.id));
  const [linkedKnowledge, laneKnowledge] = await Promise.all([
    getKnowledgeHighlightsForPaths(input.knowledgePaths || []),
    getKnowledgeHighlightsForLane(input.sourceLane)
  ]);
  const knowledgeHighlights = [...linkedKnowledge, ...laneKnowledge].filter(
    (value, index, values) => values.indexOf(value) === index
  );
  const generated = await generateDraft({
    ...input,
    attachments,
    preferenceProfile: state.preferences,
    memorySignals: state.memorySignals,
    knowledgeHighlights
  });
  const draft = createDraftRecord(generated, input);

  await updateStudioState((current) => ({
    ...current,
    drafts: [draft, ...current.drafts]
  }));

  return draft;
}

export async function createDraftFromTopic(topicId: string) {
  const state = await readStudioState();
  const topic = state.topics.find((entry) => entry.id === topicId);

  if (!topic) {
    throw new Error("Topic not found.");
  }

  const draft = await createGeneratedDraft({
    sendDay: topic.sendDay,
    audience: topic.suggestedAudience,
    sourceLane: topic.sourceLane,
    topic: topic.title,
    notes: topic.angle,
    complianceMode: "safe",
    assetIds: [],
    knowledgePaths: topic.linkedKnowledgePaths
  });

  await updateStudioState((current) => ({
    ...current,
    topics: current.topics.map((entry) =>
      entry.id === topicId
        ? {
            ...entry,
            used: true
          }
        : entry
    )
  }));

  return draft;
}

export async function reviseExistingDraft(draftId: string, instruction: string) {
  const state = await readStudioState();
  const draft = pickDraft(state, draftId);
  const attachments = state.assets.filter((asset) => draft.assetIds.includes(asset.id));
  const knowledgeHighlights = await getKnowledgeHighlightsForLane(draft.sourceLane);
  const revised = await reviseDraft({
    draft,
    instruction,
    attachments,
    preferenceProfile: state.preferences,
    memorySignals: state.memorySignals,
    knowledgeHighlights
  });
  const updatedAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draftId
        ? {
            ...entry,
            ...revised,
            aiMode: revised.mode,
            revisionCount: entry.revisionCount + 1,
            lastInstruction: instruction,
            updatedAt
          }
        : entry
    ),
    memorySignals: [
      {
        id: crypto.randomUUID(),
        createdAt: updatedAt,
        type: "edit_instruction",
        label: `Edit instruction for ${draft.sendDay}`,
        content: instruction,
        active: true
      },
      ...current.memorySignals
    ]
  }));
}

export async function saveDraftContent(input: {
  draftId: string;
  title: string;
  subject: string;
  previewText: string;
  body: string;
  topic: string;
  notes: string;
  complianceMode: "standard" | "safe";
}) {
  const updatedAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === input.draftId
        ? {
            ...entry,
            title: input.title,
            subject: input.subject,
            previewText: input.previewText,
            body: input.body,
            topic: input.topic,
            notes: input.notes,
            complianceMode: input.complianceMode,
            updatedAt
          }
        : entry
    )
  }));
}

export async function approveDraft(draftId: string, note: string) {
  const auth = getAuthContext();
  const state = await readStudioState();
  const draft = pickDraft(state, draftId);
  const createdAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draftId
        ? {
            ...entry,
            status: "approved",
            updatedAt: createdAt
          }
        : entry
    ),
    approvals: [
      {
        id: crypto.randomUUID(),
        draftId,
        action: "approved",
        note: note || `Approved by ${auth.displayName}.`,
        createdAt
      },
      ...current.approvals
    ],
    memorySignals: [
      {
        id: crypto.randomUUID(),
        createdAt,
        type: "approval_pattern",
        label: "Approved draft pattern",
        content: summarizeApprovalPattern(draft),
        active: true
      },
      ...current.memorySignals
    ]
  }));
}

export async function rejectDraft(draftId: string, note: string) {
  const createdAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draftId
        ? {
            ...entry,
            status: "draft",
            updatedAt: createdAt
          }
        : entry
    ),
    approvals: [
      {
        id: crypto.randomUUID(),
        draftId,
        action: "rejected",
        note: note || "Returned to draft state for revision.",
        createdAt
      },
      ...current.approvals
    ]
  }));
}

export async function scheduleApprovedDraft(input: {
  draftId: string;
  scheduledFor?: string;
  manualOverride: boolean;
}) {
  const createdAt = nowIso();
  const state = await readStudioState();
  const draft = pickDraft(state, input.draftId);

  if (draft.status !== "approved") {
    throw new Error("Only approved drafts can be scheduled.");
  }

  const scheduledFor = input.scheduledFor || getNextSendDate(draft.sendDay);

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draft.id
        ? {
            ...entry,
            status: "scheduled",
            scheduledFor,
            updatedAt: createdAt
          }
        : entry
    ),
    schedule: [
      {
        id: crypto.randomUUID(),
        draftId: draft.id,
        title: draft.title,
        sendDay: draft.sendDay,
        scheduledFor,
        status: "scheduled",
        manualOverride: input.manualOverride,
        createdAt
      },
      ...current.schedule
    ],
    approvals: [
      {
        id: crypto.randomUUID(),
        draftId: draft.id,
        action: "scheduled",
        note: `Scheduled for ${scheduledFor}.`,
        createdAt
      },
      ...current.approvals
    ]
  }));
}

export async function batchScheduleMonth(monthKey: string) {
  const state = await readStudioState();
  const approved = state.drafts.filter((draft) => draft.status === "approved");
  const availableDates = getSendDatesForMonth(monthKey);
  const occupiedDates = new Set(
    state.schedule.filter((entry) => entry.status !== "archived").map((entry) => entry.scheduledFor)
  );
  const mondayDates = availableDates.filter((date) => {
    const isMonday = new Date(`${date}T12:00:00`).getDay() === 1;
    return isMonday && !occupiedDates.has(date);
  });
  const thursdayDates = availableDates.filter((date) => {
    const isThursday = new Date(`${date}T12:00:00`).getDay() === 4;
    return isThursday && !occupiedDates.has(date);
  });
  const mondayDrafts = approved.filter((draft) => draft.sendDay === "Monday");
  const thursdayDrafts = approved.filter((draft) => draft.sendDay === "Thursday");
  let scheduledCount = 0;

  for (const [index, draft] of mondayDrafts.entries()) {
    const nextDate = mondayDates[index];

    if (!nextDate) {
      continue;
    }

    await scheduleApprovedDraft({
      draftId: draft.id,
      scheduledFor: nextDate,
      manualOverride: false
    });
    scheduledCount += 1;
  }

  for (const [index, draft] of thursdayDrafts.entries()) {
    const nextDate = thursdayDates[index];

    if (!nextDate) {
      continue;
    }

    await scheduleApprovedDraft({
      draftId: draft.id,
      scheduledFor: nextDate,
      manualOverride: false
    });
    scheduledCount += 1;
  }

  return scheduledCount;
}

export async function markScheduleSent(scheduleId: string) {
  const state = await readStudioState();
  const schedule = state.schedule.find((entry) => entry.id === scheduleId);

  if (!schedule) {
    throw new Error("Schedule item not found.");
  }

  const draft = pickDraft(state, schedule.draftId);
  const attachments = state.assets.filter((asset) => draft.assetIds.includes(asset.id));
  const result = await sendEmailDraft(draft, attachments);
  const createdAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draft.id
        ? {
            ...entry,
            status: "sent",
            updatedAt: createdAt
          }
        : entry
    ),
    schedule: current.schedule.map((entry) =>
      entry.id === scheduleId
        ? {
            ...entry,
            status: "sent"
          }
        : entry
    ),
    approvals: [
      {
        id: crypto.randomUUID(),
        draftId: draft.id,
        action: "sent",
        note: result.note,
        createdAt
      },
      ...current.approvals
    ]
  }));
}

export async function archiveDraft(draftId: string) {
  const createdAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draftId
        ? {
            ...entry,
            status: "archived",
            updatedAt: createdAt
          }
        : entry
    ),
    schedule: current.schedule.map((entry) =>
      entry.draftId === draftId
        ? {
            ...entry,
            status: "archived"
          }
        : entry
    ),
    approvals: [
      {
        id: crypto.randomUUID(),
        draftId,
        action: "archived",
        note: "Moved to archive.",
        createdAt
      },
      ...current.approvals
    ]
  }));
}

export async function saveAsset(input: {
  name: string;
  kind: AssetKind;
  url?: string;
  file?: File;
}) {
  const asset =
    input.file && input.file.size > 0
      ? await storeUploadedFile(input.file)
      : createLinkedAsset({
          name: input.name,
          url: input.url || "",
          kind: input.kind
        });

  await updateStudioState((current) => ({
    ...current,
    assets: [asset, ...current.assets]
  }));

  return asset;
}

export async function savePreferences(input: {
  tonePreference: string;
  lengthPreference: string;
  subjectLinePreference: string;
  favoriteStructures: string;
  phrasesToUse: string;
  phrasesToAvoid: string;
  compliancePreference: string;
  defaultAudience: Audience;
  defaultSendDay: SendDay;
}) {
  const createdAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    preferences: {
      tonePreference: input.tonePreference,
      lengthPreference: input.lengthPreference,
      subjectLinePreference: input.subjectLinePreference,
      favoriteStructures: toList(input.favoriteStructures),
      phrasesToUse: toList(input.phrasesToUse),
      phrasesToAvoid: toList(input.phrasesToAvoid),
      compliancePreference: input.compliancePreference,
      defaultAudience: input.defaultAudience,
      defaultSendDay: input.defaultSendDay
    },
    memorySignals: [
      {
        id: crypto.randomUUID(),
        createdAt,
        type: "manual_preference",
        label: "Preference update",
        content: `Updated tone and structure preferences. Subject style now prefers: ${input.subjectLinePreference}`,
        active: true
      },
      ...current.memorySignals
    ]
  }));
}

export async function addMemoryNote(label: string, content: string) {
  const createdAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    memorySignals: [
      {
        id: crypto.randomUUID(),
        createdAt,
        type: "manual_preference",
        label,
        content,
        active: true
      },
      ...current.memorySignals
    ]
  }));
}

export async function toggleMemorySignal(signalId: string, active: boolean) {
  await updateStudioState((current) => ({
    ...current,
    memorySignals: current.memorySignals.map((signal) =>
      signal.id === signalId
        ? {
            ...signal,
            active
          }
        : signal
    )
  }));
}

export async function createTutorialVideoScript(draftId: string) {
  const state = await readStudioState();
  const draft = pickDraft(state, draftId);

  if (!canUseTutorialVideoFlow(draft)) {
    throw new Error("Tutorial video workflow starts only after draft approval.");
  }

  const updatedAt = nowIso();
  const nextWorkflow = createTutorialVideoState(draft);

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draftId
        ? {
            ...entry,
            tutorialVideo: nextWorkflow,
            updatedAt
          }
        : entry
    )
  }));

  return nextWorkflow;
}

export async function saveTutorialVideoScript(draftId: string, script: string) {
  const updatedAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) => {
      if (entry.id !== draftId || !entry.tutorialVideo) {
        return entry;
      }

      if (entry.tutorialVideo.scriptLocked) {
        throw new Error("Tutorial script is locked once generation begins.");
      }

      return {
        ...entry,
        tutorialVideo: {
          ...entry.tutorialVideo,
          status: "script_draft",
          script,
          scriptApprovedAt: null,
          errorMessage: null,
          rejectionReason: null
        },
        updatedAt
      };
    })
  }));
}

export async function approveTutorialVideoScript(draftId: string, note: string) {
  const createdAt = nowIso();

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) => {
      if (entry.id !== draftId || !entry.tutorialVideo) {
        return entry;
      }

      if (entry.tutorialVideo.scriptLocked) {
        throw new Error("Tutorial script is locked once generation begins.");
      }

      return {
        ...entry,
        tutorialVideo: {
          ...entry.tutorialVideo,
          status: "script_approved",
          scriptApprovedAt: createdAt,
          errorMessage: null,
          rejectionReason: null
        },
        updatedAt: createdAt
      };
    }),
    approvals: [
      {
        id: crypto.randomUUID(),
        draftId,
        action: "video_script_approved",
        note: note || "Tutorial video script approved for render.",
        createdAt
      },
      ...current.approvals
    ]
  }));
}

export async function requestTutorialVideoGeneration(draftId: string) {
  const state = await readStudioState();
  const draft = pickDraft(state, draftId);

  if (!draft.tutorialVideo || draft.tutorialVideo.status !== "script_approved") {
    throw new Error("Tutorial script must be approved before render.");
  }

  const createdAt = nowIso();
  const result = await requestTutorialVideoRender({
    draft,
    script: draft.tutorialVideo.script
  });

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draftId && entry.tutorialVideo
        ? {
            ...entry,
            tutorialVideo: {
              ...entry.tutorialVideo,
              mode: result.mode,
              status: result.status === "processing" ? "rendering" : "failed",
              scriptLocked: true,
              renderId: result.renderId || null,
              renderStatus: result.status,
              requestedAt: createdAt,
              pollCount: 0,
              lastPolledAt: null,
              errorMessage: result.errorMessage || null
            },
            updatedAt: createdAt
          }
        : entry
    ),
    approvals: [
      {
        id: crypto.randomUUID(),
        draftId,
        action: result.status === "processing" ? "video_render_requested" : "video_failed",
        note:
          result.status === "processing"
            ? `Tutorial video render requested in ${result.mode} mode.`
            : result.errorMessage || "Tutorial video render failed.",
        createdAt
      },
      ...current.approvals
    ]
  }));
}

export async function pollTutorialVideoStatus(draftId: string) {
  const state = await readStudioState();
  const draft = pickDraft(state, draftId);

  if (!draft.tutorialVideo || draft.tutorialVideo.status !== "rendering") {
    throw new Error("Tutorial video is not currently rendering.");
  }

  const createdAt = nowIso();
  const result = await pollTutorialVideoRender(draft.tutorialVideo);
  const nextPollCount = draft.tutorialVideo.pollCount + 1;
  const eventAction =
    result.status === "completed"
      ? "video_review_ready"
      : result.status === "failed"
        ? "video_failed"
        : null;

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draftId && entry.tutorialVideo
        ? {
            ...entry,
            tutorialVideo: {
              ...entry.tutorialVideo,
              status:
                result.status === "completed"
                  ? "review"
                  : result.status === "failed"
                    ? "failed"
                    : "rendering",
              renderStatus: result.status,
              pollCount: nextPollCount,
              lastPolledAt: createdAt,
              videoUrl: result.videoUrl || entry.tutorialVideo.videoUrl || null,
              thumbnailUrl: result.thumbnailUrl || entry.tutorialVideo.thumbnailUrl || null,
              durationLabel: result.durationLabel || entry.tutorialVideo.durationLabel || null,
              errorMessage: result.errorMessage || null
            },
            updatedAt: createdAt
          }
        : entry
    ),
    approvals: eventAction
      ? [
          {
            id: crypto.randomUUID(),
            draftId,
            action: eventAction,
            note:
              result.status === "completed"
                ? "Tutorial render completed and is ready for human review."
                : result.errorMessage || "Tutorial render failed.",
            createdAt
          },
          ...current.approvals
        ]
      : current.approvals
  }));
}

export async function approveTutorialVideoAttach(draftId: string) {
  const state = await readStudioState();
  const draft = pickDraft(state, draftId);

  if (!draft.tutorialVideo || draft.tutorialVideo.status !== "review" || !draft.tutorialVideo.videoUrl) {
    throw new Error("Tutorial video must be ready for review before attaching.");
  }

  const createdAt = nowIso();
  const asset = createLinkedAsset({
    name: `Tutorial video: ${draft.title}`,
    url: draft.tutorialVideo.videoUrl,
    kind: "video"
  });

  await updateStudioState((current) => ({
    ...current,
    assets: [asset, ...current.assets],
    drafts: current.drafts.map((entry) =>
      entry.id === draftId && entry.tutorialVideo
        ? {
            ...entry,
            assetIds: entry.assetIds.includes(asset.id) ? entry.assetIds : [asset.id, ...entry.assetIds],
            tutorialVideo: {
              ...entry.tutorialVideo,
              status: "attached",
              attachedAssetId: asset.id,
              rejectionReason: null
            },
            updatedAt: createdAt
          }
        : entry
    ),
    approvals: [
      {
        id: crypto.randomUUID(),
        draftId,
        action: "video_attached",
        note: "Tutorial video approved and attached to the draft.",
        createdAt
      },
      ...current.approvals
    ]
  }));
}

export async function restartTutorialVideoWorkflow(draftId: string, reason: string) {
  const state = await readStudioState();
  const draft = pickDraft(state, draftId);
  const createdAt = nowIso();
  const nextWorkflow = createTutorialVideoState(draft);

  await updateStudioState((current) => ({
    ...current,
    drafts: current.drafts.map((entry) =>
      entry.id === draftId
        ? {
            ...entry,
            tutorialVideo: {
              ...nextWorkflow,
              rejectionReason: reason || "Restart requested after review."
            },
            updatedAt: createdAt
          }
        : entry
    ),
    approvals: [
      {
        id: crypto.randomUUID(),
        draftId,
        action: "video_restarted",
        note: reason || "Tutorial video workflow restarted for a new script or render.",
        createdAt
      },
      ...current.approvals
    ]
  }));
}
