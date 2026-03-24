import { batchScheduleAction, markSentAction } from "@/app/actions";
import { SectionFrame } from "@/components/section-frame";
import { StatusBadge } from "@/components/status-badge";
import { formatDateLabel, getCurrentMonthKey } from "@/lib/date-utils";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const { state } = await getStudioSnapshot();
  const approved = state.drafts.filter((draft) => draft.status === "approved");
  const queue = [...state.schedule].sort((left, right) => left.scheduledFor.localeCompare(right.scheduledFor));
  const mondayApproved = approved.filter((draft) => draft.sendDay === "Monday").length;
  const thursdayApproved = approved.filter((draft) => draft.sendDay === "Thursday").length;
  const scheduledCount = queue.filter((item) => item.status === "scheduled").length;
  const sentCount = queue.filter((item) => item.status === "sent").length;
  const archivedCount = queue.filter((item) => item.status === "archived").length;

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Schedule queue"
        title="Assign approved drafts to Monday and Thursday slots"
        description="Single scheduling happens from draft detail. Batch scheduling fills the next open Monday and Thursday dates without double-booking a slot or bypassing approval."
      >
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="soft-stat">
            <p className="label">Scheduled</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{scheduledCount}</p>
          </div>
          <div className="soft-stat">
            <p className="label">Sent log</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{sentCount}</p>
          </div>
          <div className="soft-stat">
            <p className="label">Archived in queue</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{archivedCount}</p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <form action={batchScheduleAction} className="rounded-[28px] border border-line bg-white p-5">
            <p className="label">Batch scheduling</p>
            <h3 className="mt-2 text-xl font-semibold">Queue a full month</h3>
            <p className="mt-2 text-sm leading-6 text-mute">
              This assigns the next approved Monday and Thursday drafts to open dates in the month selected below.
            </p>
            <div className="notice-card mt-4">
              <p className="text-sm leading-6 text-mute">
                Safety rule: if there are fewer approved drafts than open dates, the remaining dates stay empty.
                The batch action never invents content or skips the approval gate.
              </p>
            </div>
            <label className="mt-4 block">
              <span className="label">Month</span>
              <input
                type="month"
                name="monthKey"
                defaultValue={getCurrentMonthKey()}
                className="text-input mt-2"
              />
            </label>
            <button type="submit" className="primary-btn mt-4">
              Batch schedule approved drafts
            </button>
            <p className="mt-4 text-sm text-mute">
              {approved.length} approved drafts are available right now: {mondayApproved} Monday and{" "}
              {thursdayApproved} Thursday.
            </p>
          </form>

          <div className="rounded-[28px] border border-line bg-white p-5">
            <p className="label">Approved inventory</p>
            <div className="mt-4 space-y-3">
              {approved.length === 0 ? (
                <div className="notice-card">
                  <p className="text-sm font-semibold text-ink">No approved drafts are waiting for a date.</p>
                  <p className="mt-2 text-sm leading-6 text-mute">
                    Approve a draft first, then return here for single-date or month-batch scheduling.
                  </p>
                </div>
              ) : (
                approved.map((draft) => (
                  <div key={draft.id} className="rounded-2xl border border-line bg-canvas/70 px-4 py-3">
                    <p className="label">
                      {draft.sendDay} / {draft.sourceLane}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-ink">{draft.subject}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="Live queue"
        title="Scheduled, sent, and archived issues"
        description="Marking an item sent uses the email adapter. In mock mode it records the event cleanly without live delivery."
      >
        <div className="space-y-3">
          {queue.length === 0 ? (
            <div className="notice-card">
              <p className="text-sm font-semibold text-ink">No items are in the schedule queue yet.</p>
              <p className="mt-2 text-sm leading-6 text-mute">
                Use the draft detail page for one-off scheduling or the month queue tool above when
                approved inventory is ready.
              </p>
            </div>
          ) : (
            queue.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-[28px] border border-line bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <p className="label">
                    {item.sendDay} / {formatDateLabel(item.scheduledFor)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-mute">
                    {item.manualOverride ? "Manual override date" : "Standard send-day date"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={item.status} />
                  {item.status === "scheduled" ? (
                    <form action={markSentAction}>
                      <input type="hidden" name="scheduleId" value={item.id} />
                      <button type="submit" className="primary-btn">
                        Mark sent
                      </button>
                    </form>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </SectionFrame>
    </div>
  );
}
