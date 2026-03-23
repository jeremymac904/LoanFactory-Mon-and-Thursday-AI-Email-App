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

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Draft detail"
        title={draft.subject}
        description="AI revision, manual edit, approval, and scheduling all stay in one surface."
        aside={<StatusBadge status={draft.status} />}
      >
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <form action={saveDraftAction} className="space-y-4 rounded-[28px] border border-line bg-white p-5">
              <input type="hidden" name="draftId" value={draft.id} />

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
              </label>

              <label className="block">
                <span className="label">Body</span>
                <textarea name="body" defaultValue={draft.body} className="text-area mt-2 min-h-[320px]" />
              </label>

              <label className="block">
                <span className="label">Compliance mode</span>
                <select name="complianceMode" defaultValue={draft.complianceMode} className="select-input mt-2">
                  <option value="safe">Safe review mode</option>
                  <option value="standard">Standard draft mode</option>
                </select>
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
                Example instructions: make this more direct, shorten this, sound more like a sharp
                mortgage operator, make this safer for compliance, turn this into a Monday quick
                win.
              </p>
              <textarea
                name="instruction"
                className="text-area mt-4"
                placeholder="Type the revision Jeremy wants."
                required
              />
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="submit" className="primary-btn">
                  Revise with AI
                </button>
                <p className="text-sm text-mute">
                  Last instruction: {draft.lastInstruction || "None yet"}
                </p>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <EmailPreview subject={draft.subject} previewText={draft.previewText} body={draft.body} />

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
              </div>
            </div>

            <form action={approveDraftAction} className="rounded-[28px] border border-line bg-white p-5">
              <input type="hidden" name="draftId" value={draft.id} />
              <p className="label">Approval gate</p>
              <textarea
                name="note"
                className="text-area mt-4 min-h-[100px]"
                placeholder="Optional approval note from Jeremy."
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
                Only approved drafts can enter the schedule queue.
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
              <button type="submit" className="primary-btn mt-4" disabled={draft.status !== "approved"}>
                {draft.status === "approved" ? "Move to schedule queue" : "Approve before scheduling"}
              </button>
            </form>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
