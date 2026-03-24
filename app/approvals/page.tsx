import Link from "next/link";

import { SectionFrame } from "@/components/section-frame";
import { StatusBadge } from "@/components/status-badge";
import { formatDateTimeLabel } from "@/lib/date-utils";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function ApprovalsPage() {
  const { state } = await getStudioSnapshot();
  const pending = state.drafts.filter((draft) => draft.status === "draft");
  const history = [...state.approvals].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  const approvedCount = state.drafts.filter((draft) => draft.status === "approved").length;
  const historyWithDrafts = history.map((event) => ({
    ...event,
    draft: state.drafts.find((draft) => draft.id === event.draftId)
  }));

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Approval flow"
        title="Nothing schedules or sends without explicit approval"
        description="Rejected drafts stay editable. Approval events create a visible history and are part of the memory trail Jeremy can inspect."
      >
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <div className="soft-stat">
            <p className="label">Needs review</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{pending.length}</p>
          </div>
          <div className="soft-stat">
            <p className="label">Approved and unscheduled</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{approvedCount}</p>
          </div>
          <div className="soft-stat">
            <p className="label">History events</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{history.length}</p>
          </div>
        </div>
        <div className="space-y-3">
          {pending.length === 0 ? (
            <div className="notice-card">
              <p className="text-sm font-semibold text-ink">There are no drafts waiting for Jeremy review.</p>
              <p className="mt-2 text-sm leading-6 text-mute">
                Generate a new draft or reject an approved draft back into revision if Jeremy wants
                another pass.
              </p>
            </div>
          ) : (
            pending.map((draft) => (
              <div
                key={draft.id}
                className="flex flex-col gap-3 rounded-[28px] border border-line bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <p className="label">
                    {draft.sendDay} / {draft.audience} / {draft.sourceLane}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{draft.subject}</h3>
                  <p className="mt-2 text-sm leading-6 text-mute">{draft.previewText}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={draft.status} />
                  <Link href={`/drafts/${draft.id}`} className="primary-btn">
                    Review now
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="Approval history"
        title="Recent approval events"
        description="This log stays simple on purpose: what moved, how it moved, and the note Jeremy left behind."
      >
        <div className="space-y-3">
          {historyWithDrafts.map((event) => (
            <div key={event.id} className="rounded-[28px] border border-line bg-white px-5 py-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="label">{formatDateTimeLabel(event.createdAt)}</p>
                  <h3 className="mt-2 text-lg font-semibold">
                    {event.draft?.subject || "Draft record unavailable"}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-mute">
                    {event.note || "No note recorded."}
                  </p>
                </div>
                <StatusBadge status={event.action === "rejected" ? "rejected" : event.action} />
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>
    </div>
  );
}
