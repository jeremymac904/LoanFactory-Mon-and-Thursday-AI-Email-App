import {
  approveTutorialVideoAttachAction,
  approveTutorialVideoScriptAction,
  createTutorialVideoScriptAction,
  pollTutorialVideoStatusAction,
  requestTutorialVideoGenerationAction,
  restartTutorialVideoWorkflowAction,
  saveTutorialVideoScriptAction
} from "@/app/actions";
import { StatusBadge } from "@/components/status-badge";
import type { DraftStatus, TutorialVideoWorkflow } from "@/lib/types";

function getWorkflowBadgeStatus(workflow: TutorialVideoWorkflow) {
  switch (workflow.status) {
    case "script_draft":
      return "draft";
    case "script_approved":
      return "video_script_approved";
    case "rendering":
      return "video_render_requested";
    case "review":
      return "video_review_ready";
    case "attached":
      return "video_attached";
    case "failed":
      return "video_failed";
    default:
      return "draft";
  }
}

export function TutorialVideoWorkflowCard({
  draftId,
  draftStatus,
  tutorialVideo
}: {
  draftId: string;
  draftStatus: DraftStatus;
  tutorialVideo?: TutorialVideoWorkflow | null;
}) {
  const canStart = draftStatus === "approved" || draftStatus === "scheduled";

  if (!canStart) {
    return (
      <div className="rounded-[28px] border border-line bg-white p-5">
        <p className="label">Tutorial video workflow</p>
        <h3 className="mt-2 text-xl font-semibold">Available after draft approval</h3>
        <p className="mt-2 text-sm leading-6 text-mute">
          The HeyGen flow starts only after the email draft is approved. That keeps the script,
          video, and final email aligned under the same human review gate.
        </p>
      </div>
    );
  }

  if (!tutorialVideo) {
    return (
      <form action={createTutorialVideoScriptAction} className="rounded-[28px] border border-line bg-white p-5">
        <input type="hidden" name="draftId" value={draftId} />
        <p className="label">Tutorial video workflow</p>
        <h3 className="mt-2 text-xl font-semibold">Generate a HeyGen-ready tutorial script</h3>
        <p className="mt-2 text-sm leading-6 text-mute">
          This creates the first-pass script from the approved draft, then holds for human script
          approval before any render request is made.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="micro-pill">structured avatar flow only</span>
          <span className="micro-pill">mock-safe render loop</span>
          <span className="micro-pill">script lock starts at render request</span>
        </div>
        <p className="mt-4 text-xs leading-5 text-mute">
          Live avatar_id, voice_id, and exact endpoint details still need factual validation before
          this should be treated as a wired HeyGen integration.
        </p>
        <button type="submit" className="primary-btn mt-4">
          Generate tutorial script
        </button>
      </form>
    );
  }

  const isScriptEditable = !tutorialVideo.scriptLocked;

  return (
    <div className="rounded-[28px] border border-line bg-white p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="label">Tutorial video workflow</p>
          <h3 className="mt-2 text-xl font-semibold">HeyGen tutorial review</h3>
          <p className="mt-2 text-sm leading-6 text-mute">
            Gate 1 approves the script. Gate 2 approves the final render before attach.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={getWorkflowBadgeStatus(tutorialVideo)} />
          <span className="micro-pill">{tutorialVideo.mode} mode</span>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="notice-card">
          <p className="text-sm leading-6 text-mute">
            Script lock status:{" "}
            <strong className="text-ink">
              {tutorialVideo.scriptLocked ? "locked for rendering" : "editable until render begins"}
            </strong>
            .
          </p>
          <p className="mt-2 text-xs leading-5 text-mute">
            V1 uses polling only. Video Agent, multi-scene, translation, LiveAvatar, and webhooks
            stay out of scope.
          </p>
        </div>

        <form action={saveTutorialVideoScriptAction} className="space-y-3">
          <input type="hidden" name="draftId" value={draftId} />
          <label className="block">
            <span className="label">Tutorial script</span>
            <textarea
              name="script"
              defaultValue={tutorialVideo.script}
              className="text-area mt-2 min-h-[220px]"
              readOnly={!isScriptEditable}
            />
          </label>
          <p className="field-help">
            This script is adapted from the approved email draft and should stay exact once the
            render request starts.
          </p>
          {isScriptEditable ? (
            <button type="submit" className="secondary-btn">
              Save script edits
            </button>
          ) : null}
        </form>

        {tutorialVideo.status === "script_draft" ? (
          <form action={approveTutorialVideoScriptAction} className="space-y-3 rounded-[24px] border border-line bg-canvas/60 p-4">
            <input type="hidden" name="draftId" value={draftId} />
            <p className="label">Gate 1</p>
            <p className="text-sm leading-6 text-mute">
              Approve the exact script before any render request. This prevents wasted credits and
              keeps the avatar on approved words only.
            </p>
            <input
              name="note"
              className="text-input"
              placeholder="Optional note for why the script is approved."
            />
            <button type="submit" className="primary-btn">
              Approve script
            </button>
          </form>
        ) : null}

        {tutorialVideo.status === "script_approved" ? (
          <form action={requestTutorialVideoGenerationAction} className="space-y-3 rounded-[24px] border border-line bg-canvas/60 p-4">
            <input type="hidden" name="draftId" value={draftId} />
            <p className="label">Generate video</p>
            <p className="text-sm leading-6 text-mute">
              Starting the render locks the script. In mock mode, this simulates the API request and
              returns a render id for polling.
            </p>
            <button type="submit" className="primary-btn">
              Generate tutorial video
            </button>
          </form>
        ) : null}

        {tutorialVideo.status === "rendering" ? (
          <form action={pollTutorialVideoStatusAction} className="space-y-3 rounded-[24px] border border-line bg-canvas/60 p-4">
            <input type="hidden" name="draftId" value={draftId} />
            <p className="label">Polling</p>
            <p className="text-sm leading-6 text-mute">
              Render id: <span className="font-mono text-xs">{tutorialVideo.renderId || "pending"}</span>
            </p>
            <p className="text-sm leading-6 text-mute">
              Poll count: {tutorialVideo.pollCount}. Mock mode returns processing first, then a
              completed review render.
            </p>
            <button type="submit" className="primary-btn">
              Poll render status
            </button>
          </form>
        ) : null}

        {tutorialVideo.status === "review" || tutorialVideo.status === "attached" ? (
          <div className="space-y-3 rounded-[24px] border border-line bg-canvas/60 p-4">
            <p className="label">Gate 2</p>
            <p className="text-sm leading-6 text-mute">
              Review pronunciation, pacing, and any visual glitches before the tutorial is attached.
            </p>
            {tutorialVideo.videoUrl ? (
              <div className="overflow-hidden rounded-[24px] border border-line bg-black">
                <video
                  controls
                  className="h-full max-h-[280px] w-full"
                  poster={tutorialVideo.thumbnailUrl || undefined}
                  src={tutorialVideo.videoUrl}
                />
              </div>
            ) : null}
            <p className="text-xs leading-5 text-mute">
              {tutorialVideo.durationLabel || "Duration not available yet"}.
            </p>
            {tutorialVideo.status === "review" ? (
              <div className="flex flex-wrap gap-3">
                <form action={approveTutorialVideoAttachAction}>
                  <input type="hidden" name="draftId" value={draftId} />
                  <button type="submit" className="primary-btn">
                    Approve and attach
                  </button>
                </form>
                <form action={restartTutorialVideoWorkflowAction} className="flex flex-wrap gap-3">
                  <input type="hidden" name="draftId" value={draftId} />
                  <input
                    name="reason"
                    className="text-input min-w-[260px]"
                    placeholder="Optional rejection reason"
                  />
                  <button type="submit" className="danger-btn">
                    Reject and restart
                  </button>
                </form>
              </div>
            ) : (
              <p className="text-sm leading-6 text-mute">
                This tutorial video is already attached to the draft and will travel with preview and
                send review.
              </p>
            )}
          </div>
        ) : null}

        {tutorialVideo.status === "failed" ? (
          <form action={restartTutorialVideoWorkflowAction} className="space-y-3 rounded-[24px] border border-line bg-[#f9ecea] p-4">
            <input type="hidden" name="draftId" value={draftId} />
            <p className="label">Failure handling</p>
            <p className="text-sm leading-6 text-mute">
              {tutorialVideo.errorMessage || "The render failed and needs a new script or a clean restart."}
            </p>
            <input
              name="reason"
              className="text-input"
              placeholder="Optional reason for the restart"
            />
            <button type="submit" className="danger-btn">
              Reject and restart
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
