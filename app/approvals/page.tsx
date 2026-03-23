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

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Approval flow"
        title="Nothing schedules or sends without explicit approval"
        description="Rejected drafts stay editable. Approval events create a transparent history and feed the memory layer."
      >
        <div className="space-y-3">
          {pending.length === 0 ? (
            <p className="text-sm text-mute">There are no drafts waiting for Jeremy review.</p>
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
        description="This log stays simple on purpose: who approved, what changed, and when the draft moved state."
      >
        <div className="space-y-3">
          {history.map((event) => (
            <div key={event.id} className="rounded-[28px] border border-line bg-white px-5 py-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="label">{formatDateTimeLabel(event.createdAt)}</p>
                  <h3 className="mt-2 text-lg font-semibold">{event.note}</h3>
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
