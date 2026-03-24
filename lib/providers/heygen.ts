import type { DraftItem, TutorialVideoMode, TutorialVideoWorkflow } from "@/lib/types";

const MOCK_VIDEO_URL = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
const MOCK_THUMBNAIL_URL =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

function cleanLine(line: string): string {
  return line.replace(/^\d+\.\s*/, "").replace(/^[-*]\s*/, "").trim();
}

function stripStructuralLines(lines: string[]): string[] {
  return lines.filter(
    (line) =>
      line &&
      !line.endsWith(":") &&
      !line.startsWith("Knowledge anchor:") &&
      !line.startsWith("Preview-only attachments:") &&
      !line.startsWith("Team version note:") &&
      !line.startsWith("Company version note:") &&
      !line.startsWith("Operator note:")
  );
}

function toSpokenLines(draft: DraftItem): string[] {
  const fromBody = stripStructuralLines(
    draft.body
      .split("\n")
      .map(cleanLine)
      .filter(Boolean)
  ).slice(0, 4);

  if (fromBody.length > 0) {
    return fromBody;
  }

  return [draft.previewText, draft.notes].map(cleanLine).filter(Boolean);
}

export function getHeyGenProviderMode(): TutorialVideoMode {
  return process.env.HEYGEN_PROVIDER === "heygen" && Boolean(process.env.HEYGEN_API_KEY)
    ? "heygen"
    : "mock";
}

export function sanitizeTutorialScript(script: string): string {
  return script
    .replace(/[`*_>#]/g, "")
    .replace(/\bDSCR\b/g, "D.S.C.R.")
    .replace(/\bFHA\b/g, "F.H.A.")
    .replace(/\bVA\b/g, "V.A.")
    .replace(/\bNMLS\b/g, "N.M.L.S.")
    .replace(/&/g, "and")
    .replace(/\s{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildComplianceFooter(draft: DraftItem): string {
  if (draft.complianceMode === "safe") {
    return "Compliance footer placeholder. Needs compliance review before any live HeyGen render or distribution.";
  }

  return "Compliance footer placeholder retained for review. Needs compliance review before live HeyGen use.";
}

export function buildTutorialScriptFromDraft(draft: DraftItem): string {
  const talkTrack = toSpokenLines(draft);
  const intro =
    draft.sendDay === "Monday"
      ? `Jeremy here with a Monday training quick win on ${draft.topic.toLowerCase()}.`
      : `Jeremy here with a Thursday training move on ${draft.topic.toLowerCase()}.`;
  const close =
    draft.sendDay === "Monday"
      ? "Use this on one live lead, loan file, or inbox block today and keep the review note in place."
      : "Use this on one live workflow this week and keep the review note in place before anything goes out.";

  return sanitizeTutorialScript(
    [
      intro,
      "",
      ...talkTrack,
      "",
      close,
      buildComplianceFooter(draft)
    ].join("\n")
  );
}

export async function requestTutorialVideoRender(input: {
  draft: DraftItem;
  script: string;
}): Promise<{
  mode: TutorialVideoMode;
  renderId?: string;
  status: "processing" | "failed";
  errorMessage?: string;
}> {
  const mode = getHeyGenProviderMode();

  if (mode === "heygen") {
    return {
      mode,
      status: "failed",
      errorMessage:
        "Needs factual validation: exact HeyGen endpoint, avatar_id, and voice_id are not wired in this pass."
    };
  }

  const sanitized = sanitizeTutorialScript(input.script);

  if (!sanitized) {
    return {
      mode,
      status: "failed",
      errorMessage: "Tutorial script is empty after sanitization."
    };
  }

  return {
    mode,
    renderId: `heygen-mock-${crypto.randomUUID()}`,
    status: "processing"
  };
}

export async function pollTutorialVideoRender(workflow: TutorialVideoWorkflow): Promise<{
  status: "processing" | "completed" | "failed";
  videoUrl?: string;
  thumbnailUrl?: string;
  durationLabel?: string;
  errorMessage?: string;
}> {
  if (workflow.mode === "heygen") {
    return {
      status: "failed",
      errorMessage:
        "Needs factual validation: live HeyGen polling is not enabled until the exact status endpoint and IDs are confirmed."
    };
  }

  const nextPollCount = workflow.pollCount + 1;
  const shouldFail =
    workflow.script.toLowerCase().includes("force-fail") ||
    workflow.script.toLowerCase().includes("moderation trigger");

  if (shouldFail && nextPollCount >= 2) {
    return {
      status: "failed",
      errorMessage:
        "Mock failure: render blocked for review. Remove the forced failure marker and restart the workflow."
    };
  }

  if (nextPollCount >= 3) {
    return {
      status: "completed",
      videoUrl: MOCK_VIDEO_URL,
      thumbnailUrl: MOCK_THUMBNAIL_URL,
      durationLabel: "1:18 mock render"
    };
  }

  return {
    status: "processing"
  };
}
