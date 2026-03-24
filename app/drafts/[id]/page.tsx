import { notFound } from "next/navigation";

import {
  approveDraftAction,
  archiveDraftAction,
  rejectDraftAction,
  reviseDraftAction,
  saveDraftAction,
  scheduleDraftAction
} from "@/app/actions";
import { EmailPreview } from "@/components/email-preview";
import { SectionFrame } from "@/components/section-frame";
import { StatusBadge } from "@/components/status-badge";
import { TutorialVideoWorkflowCard } from "@/components/tutorial-video-workflow";
import { getNextSendDate } from "@/lib/date-utils";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function DraftDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { state } = await getStudioSnapshot();
  const draft = state.drafts.find((entry) => entry.id === id);

  if (!draft) {
    notFound();
  }

  const attachments = state.assets.filter((asset) => draft.assetIds.includes(asset.id));
  const canSchedule = draft.status === "approved";
  const scheduleMessage =
    draft.status === "draft"
      ? "Approval is still required before this draft can take a date."
      : draft.status === "approved"
        ? "This approved draft is ready for a send date."
        : draft.status === "scheduled"
          ? "This draft is already in the queue. Change the date only if Jeremy wants to move it."
          : draft.status === "sent"
            ? "This issue has already been sent. Keep it here for reference only."
            : "This issue is archived. Reopen the workflow elsewhere before reusing it.";
  const scheduleButtonLabel =
    draft.status === "approved"
      ? "Move to schedule queue"
      : draft.status === "scheduled"
        ? "Already scheduled"
        : draft.status === "sent"
          ? "Sent issues are locked"
          : draft.status === "archived"
            ? "Archived issues are locked"
            : "Approve before scheduling";

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Draft detail"
        title={draft.subject}
        description="AI revision, manual edit, approval, and scheduling all stay in one surface so Jeremy can review the issue without jumping between pages."
        aside={
          <>
            <StatusBadge status={draft.status} />
            <span className="micro-pill">{draft.aiMode} mode</span>
          </>
        }
      >
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <form action={saveDraftAction} className="space-y-4 rounded-[28px] border border-line bg-white p-5">
              <input type="hidden" name="draftId" value={draft.id} />

              <div className="notice-card">
                <p className="label">Review state</p>
                <h3 className="mt-2 text-lg font-semibold">
                  {draft.status === "draft"
                    ? "This issue still needs Jeremy approval."
                    : draft.status === "approved"
                      ? "This issue is approved and ready for a send date."
                      : draft.status === "scheduled"
                        ? "This issue is already in the schedule queue."
                        : draft.status === "sent"
                          ? "This issue has already been marked sent."
                          : "This issue is archived for reference."}
                </h3>
                <p className="mt-2 text-sm leading-6 text-mute">
                  Edit the draft directly here, then use the approval and schedule controls on the
                  right when the issue is ready to move forward.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block">
                  <span className="label">Internal title</span>
                  <input name="title" defaultValue={draft.title} className="text-input mt-2" />
                </label>
                <label className="block">
                  <span className="label">Topic</span>
                  <input name="topic" defaultValue={draft.topic} className="text-input mt-2" />
                </label>
              </div>

              <label className="block">
                <span className="label">Subject line</span>
                <input name="subject" defaultValue={draft.subject} className="text-input mt-2" />
              </label>

              <label className="block">
                <span className="label">Preview text</span>
                <input
                  name="previewText"
                  defaultValue={draft.previewText}
                  className="text-input mt-2"
                />
              </label>

              <label className="block">
                <span className="label">Source notes</span>
                <textarea name="notes" defaultValue={draft.notes} className="text-area mt-2" />
                <p className="field-help">Keep the source angle, guardrails, and context here. AI revision reads this field again.</p>
              </label>

              <label className="block">
                <span className="label">Body</span>
                <textarea name="body" defaultValue={draft.body} className="text-area mt-2 min-h-[320px]" />
                <p className="field-help">Best structure for this app: The One Thing, one middle section, Review note, The 24 Hour Task.</p>
              </label>

              <label className="block">
                <span className="label">Compliance mode</span>
                <select name="complianceMode" defaultValue={draft.complianceMode} className="select-input mt-2">
                  <option value="safe">Safe review mode</option>
                  <option value="standard">Standard draft mode</option>
                </select>
                <p className="field-help">Safe mode keeps caution language more explicit for regulated or uncertain content.</p>
              </label>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="primary-btn">
                  Save edits
                </button>
              </div>
            </form>

            {draft.status === "sent" || draft.status === "scheduled" || draft.status === "approved" ? (
              <form action={archiveDraftAction} className="rounded-[28px] border border-line bg-white p-5">
                <input type="hidden" name="draftId" value={draft.id} />
                <p className="label">Archive control</p>
                <p className="mt-2 text-sm leading-6 text-mute">
                  Use archive when the issue should move out of the active workflow but stay visible in the sent log.
                </p>
                <button type="submit" className="secondary-btn mt-4">
                  Archive draft
                </button>
              </form>
            ) : null}

            <form action={reviseDraftAction} className="rounded-[28px] border border-line bg-white p-5">
              <input type="hidden" name="draftId" value={draft.id} />
              <p className="label">AI edit</p>
              <h3 className="mt-2 text-xl font-semibold">Revise by instruction</h3>
              <p className="mt-2 text-sm leading-6 text-mute">
                This uses the current draft, source notes, active memory, and linked knowledge. It
                stays in mock mode if no AI secret is present.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="micro-pill">make this more direct</span>
                <span className="micro-pill">shorten this</span>
                <span className="micro-pill">sound more like a sharp mortgage operator</span>
                <span className="micro-pill">make this safer for compliance</span>
                <span className="micro-pill">turn this into a Monday quick win</span>
              </div>
              <textarea
                name="instruction"
                className="text-area mt-4"
                placeholder="Type the exact revision Jeremy wants. Example: tighten the opener and make the 24 hour task more concrete."
                required
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="submit" className="primary-btn">
                  Revise with AI
                </button>
                <p className="text-sm text-mute">
                  Last instruction: {draft.lastInstruction || "No AI revision logged yet."}
                </p>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <EmailPreview
              subject={draft.subject}
              previewText={draft.previewText}
              body={draft.body}
              attachments={attachments}
              tutorialVideo={draft.tutorialVideo}
            />

            <TutorialVideoWorkflowCard
              draftId={draft.id}
              draftStatus={draft.status}
              tutorialVideo={draft.tutorialVideo}
            />

            <div className="rounded-[28px] border border-line bg-white p-5">
              <p className="label">Metadata</p>
              <div className="mt-4 grid gap-3 text-sm text-mute">
                <p>
                  <strong className="text-ink">Send day:</strong> {draft.sendDay}
                </p>
                <p>
                  <strong className="text-ink">Audience:</strong> {draft.audience}
                </p>
                <p>
                  <strong className="text-ink">Source lane:</strong> {draft.sourceLane}
                </p>
                <p>
                  <strong className="text-ink">Revisions:</strong> {draft.revisionCount}
                </p>
                <p>
                  <strong className="text-ink">Attachments:</strong>{" "}
                  {attachments.length > 0 ? attachments.map((asset) => asset.name).join(", ") : "None"}
                </p>
                <p>
                  <strong className="text-ink">Next eligible send date:</strong> {getNextSendDate(draft.sendDay)}
                </p>
                <p>
                  <strong className="text-ink">Approval gate:</strong> Assets stay in preview mode until Jeremy
                  explicitly approves and schedules the draft.
                </p>
                <p>
                  <strong className="text-ink">Tutorial video:</strong>{" "}
                  {draft.tutorialVideo
                    ? `${draft.tutorialVideo.status} / ${draft.tutorialVideo.mode} mode`
                    : "Not started"}
                </p>
              </div>
            </div>

            <form action={approveDraftAction} className="rounded-[28px] border border-line bg-white p-5">
              <input type="hidden" name="draftId" value={draft.id} />
              <p className="label">Approval gate</p>
              <p className="mt-2 text-sm leading-6 text-mute">
                Approval records the decision in history and unlocks scheduling. Rejected drafts stay
                editable.
              </p>
              <textarea
                name="note"
                className="text-area mt-4 min-h-[100px]"
                placeholder="Optional note on why this is approved or what still needs work."
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="submit" className="primary-btn">
                  Approve draft
                </button>
                <button formAction={rejectDraftAction} type="submit" className="danger-btn">
                  Reject for revision
                </button>
              </div>
            </form>

            <form action={scheduleDraftAction} className="rounded-[28px] border border-line bg-white p-5">
              <input type="hidden" name="draftId" value={draft.id} />
              <p className="label">Schedule</p>
              <p className="mt-2 text-sm leading-6 text-mute">
                Only approved drafts can enter the schedule queue. If Jeremy wants a nonstandard
                date, use the manual override option below.
              </p>
              <label className="mt-4 block">
                <span className="label">Send date</span>
                <input
                  type="date"
                  name="scheduledFor"
                  defaultValue={draft.scheduledFor || getNextSendDate(draft.sendDay)}
                  className="text-input mt-2"
                />
              </label>
              <label className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-canvas/60 px-4 py-3 text-sm text-ink">
                <input type="checkbox" name="manualOverride" defaultChecked={Boolean(draft.scheduledFor)} />
                Manual override date
              </label>
              <p className="mt-3 text-sm leading-6 text-mute">{scheduleMessage}</p>
              <button type="submit" className="primary-btn mt-4" disabled={!canSchedule}>
                {scheduleButtonLabel}
              </button>
            </form>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
