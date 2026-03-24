"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  addMemoryNote,
  approveTutorialVideoAttach,
  approveTutorialVideoScript,
  approveDraft,
  archiveDraft,
  batchScheduleMonth,
  createTutorialVideoScript,
  createDraftFromTopic,
  createGeneratedDraft,
  markScheduleSent,
  pollTutorialVideoStatus,
  rejectDraft,
  requestTutorialVideoGeneration,
  restartTutorialVideoWorkflow,
  reviseExistingDraft,
  saveAsset,
  saveDraftContent,
  savePreferences,
  saveTutorialVideoScript,
  scheduleApprovedDraft,
  toggleMemorySignal
} from "@/lib/studio-service";
import type { AssetKind, Audience, SendDay, SourceLane } from "@/lib/types";

function parseIds(formData: FormData, key: string): string[] {
  return formData.getAll(key).map((value) => String(value));
}

export async function generateDraftAction(formData: FormData) {
  const draft = await createGeneratedDraft({
    sendDay: String(formData.get("sendDay")) as SendDay,
    audience: String(formData.get("audience")) as Audience,
    sourceLane: String(formData.get("sourceLane")) as SourceLane,
    topic: String(formData.get("topic") || ""),
    notes: String(formData.get("notes") || ""),
    complianceMode: String(formData.get("complianceMode") || "safe") as "standard" | "safe",
    assetIds: parseIds(formData, "assetIds")
  });

  revalidatePath("/");
  revalidatePath("/drafts");
  redirect(`/drafts/${draft.id}`);
}

export async function generateFromTopicAction(formData: FormData) {
  const draft = await createDraftFromTopic(String(formData.get("topicId")));
  revalidatePath("/");
  revalidatePath("/topics");
  redirect(`/drafts/${draft.id}`);
}

export async function reviseDraftAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  const instruction = String(formData.get("instruction") || "");

  await reviseExistingDraft(draftId, instruction);
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/");
}

export async function saveDraftAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));

  await saveDraftContent({
    draftId,
    title: String(formData.get("title") || ""),
    subject: String(formData.get("subject") || ""),
    previewText: String(formData.get("previewText") || ""),
    body: String(formData.get("body") || ""),
    topic: String(formData.get("topic") || ""),
    notes: String(formData.get("notes") || ""),
    complianceMode: String(formData.get("complianceMode") || "safe") as "standard" | "safe"
  });

  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/");
}

export async function approveDraftAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await approveDraft(draftId, String(formData.get("note") || ""));
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/approvals");
  revalidatePath("/schedule");
  revalidatePath("/");
}

export async function rejectDraftAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await rejectDraft(draftId, String(formData.get("note") || ""));
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/approvals");
  revalidatePath("/");
}

export async function scheduleDraftAction(formData: FormData) {
  await scheduleApprovedDraft({
    draftId: String(formData.get("draftId")),
    scheduledFor: String(formData.get("scheduledFor") || "") || undefined,
    manualOverride: formData.get("manualOverride") === "on"
  });

  revalidatePath("/schedule");
  revalidatePath("/");
}

export async function batchScheduleAction(formData: FormData) {
  await batchScheduleMonth(String(formData.get("monthKey")));
  revalidatePath("/schedule");
  revalidatePath("/");
}

export async function markSentAction(formData: FormData) {
  await markScheduleSent(String(formData.get("scheduleId")));
  revalidatePath("/schedule");
  revalidatePath("/archive");
  revalidatePath("/");
}

export async function archiveDraftAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await archiveDraft(draftId);
  revalidatePath("/archive");
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/");
}

export async function uploadAssetAction(formData: FormData) {
  const file = formData.get("file");
  await saveAsset({
    name: String(formData.get("name") || (file instanceof File ? file.name : "Linked asset")),
    kind: String(formData.get("kind") || "link") as AssetKind,
    url: String(formData.get("url") || ""),
    file: file instanceof File ? file : undefined
  });
  revalidatePath("/assets");
  revalidatePath("/drafts");
}

export async function savePreferencesAction(formData: FormData) {
  await savePreferences({
    tonePreference: String(formData.get("tonePreference") || ""),
    lengthPreference: String(formData.get("lengthPreference") || ""),
    subjectLinePreference: String(formData.get("subjectLinePreference") || ""),
    favoriteStructures: String(formData.get("favoriteStructures") || ""),
    phrasesToUse: String(formData.get("phrasesToUse") || ""),
    phrasesToAvoid: String(formData.get("phrasesToAvoid") || ""),
    compliancePreference: String(formData.get("compliancePreference") || ""),
    defaultAudience: String(formData.get("defaultAudience") || "Team") as Audience,
    defaultSendDay: String(formData.get("defaultSendDay") || "Monday") as SendDay
  });

  revalidatePath("/settings");
  revalidatePath("/drafts");
}

export async function addMemoryNoteAction(formData: FormData) {
  await addMemoryNote(String(formData.get("label") || "Memory note"), String(formData.get("content") || ""));
  revalidatePath("/settings");
}

export async function toggleMemorySignalAction(formData: FormData) {
  await toggleMemorySignal(String(formData.get("signalId")), String(formData.get("active")) === "true");
  revalidatePath("/settings");
}

export async function createTutorialVideoScriptAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await createTutorialVideoScript(draftId);
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/approvals");
}

export async function saveTutorialVideoScriptAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await saveTutorialVideoScript(draftId, String(formData.get("script") || ""));
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/approvals");
}

export async function approveTutorialVideoScriptAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await approveTutorialVideoScript(draftId, String(formData.get("note") || ""));
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/approvals");
}

export async function requestTutorialVideoGenerationAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await requestTutorialVideoGeneration(draftId);
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/approvals");
  revalidatePath("/providers");
}

export async function pollTutorialVideoStatusAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await pollTutorialVideoStatus(draftId);
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/approvals");
}

export async function approveTutorialVideoAttachAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await approveTutorialVideoAttach(draftId);
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/drafts");
  revalidatePath("/assets");
  revalidatePath("/archive");
}

export async function restartTutorialVideoWorkflowAction(formData: FormData) {
  const draftId = String(formData.get("draftId"));
  await restartTutorialVideoWorkflow(draftId, String(formData.get("reason") || ""));
  revalidatePath(`/drafts/${draftId}`);
  revalidatePath("/approvals");
}
