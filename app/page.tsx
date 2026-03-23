import Link from "next/link";

import { SectionFrame } from "@/components/section-frame";
import { StatusBadge } from "@/components/status-badge";
import { formatDateLabel } from "@/lib/date-utils";
import { getDashboardData } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { upcoming, approvals, recentDrafts, metrics, providerStatuses } =
    await getDashboardData();

  return (
    <div className="space-y-6">
      <section className="panel overflow-hidden">
        <div className="grid gap-6 border-b border-line/80 bg-[#f7f1e7] px-6 py-8 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
          <div>
            <p className="eyebrow">Operational dashboard</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-ink">
              Two issues a week. Human approved. Ready for Jeremy to tune in real time.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-mute">
              The studio keeps Monday and Thursday training visible from topic bank through approval,
              schedule, preview, and archive. Provider secrets can stay empty and the workflow still runs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/drafts" className="primary-btn">
                Open Draft Studio
              </Link>
              <Link href="/schedule" className="secondary-btn">
                Review schedule queue
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[28px] border border-line bg-white px-5 py-5">
              <p className="label">Drafts in system</p>
              <p className="mt-4 text-4xl font-semibold">{metrics.totalDrafts}</p>
            </div>
            <div className="rounded-[28px] border border-line bg-white px-5 py-5">
              <p className="label">Approval queue</p>
              <p className="mt-4 text-4xl font-semibold">{metrics.approvalQueue}</p>
            </div>
            <div className="rounded-[28px] border border-line bg-white px-5 py-5">
              <p className="label">Scheduled</p>
              <p className="mt-4 text-4xl font-semibold">{metrics.scheduled}</p>
            </div>
            <div className="rounded-[28px] border border-line bg-white px-5 py-5">
              <p className="label">Sent / logged</p>
              <p className="mt-4 text-4xl font-semibold">{metrics.sent}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionFrame
          eyebrow="Upcoming issues"
          title="Monday and Thursday queue"
          description="These are the next scheduled issues. Nothing reaches this panel without explicit approval."
        >
          <div className="space-y-3">
            {upcoming.length === 0 ? (
              <p className="text-sm text-mute">No approved issues are scheduled yet.</p>
            ) : (
              upcoming.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-[26px] border border-line bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <p className="label">{item.sendDay}</p>
                    <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-mute">{formatDateLabel(item.scheduledFor)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={item.status} />
                    <Link href="/schedule" className="secondary-btn">
                      Manage
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="Readiness"
          title="Provider and environment posture"
          description="The product works in local mock mode today and stays ready for later provider wiring."
        >
          <div className="space-y-3">
            {providerStatuses.map((status) => (
              <div
                key={status.name}
                className="rounded-[26px] border border-line bg-white px-5 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="label">{status.name}</p>
                    <p className="mt-2 text-lg font-semibold">{status.mode}</p>
                  </div>
                  <StatusBadge status={status.configured ? "approved" : "draft"} />
                </div>
                <p className="mt-3 text-sm leading-6 text-mute">{status.note}</p>
              </div>
            ))}
          </div>
        </SectionFrame>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionFrame
          eyebrow="Approval focus"
          title="Ready for Jeremy review"
          description="Drafts stay editable until Jeremy approves them."
        >
          <div className="space-y-3">
            {approvals.length === 0 ? (
              <p className="text-sm text-mute">No drafts are waiting for approval.</p>
            ) : (
              approvals.map((draft) => (
                <div
                  key={draft.id}
                  className="rounded-[26px] border border-line bg-white px-5 py-4"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="label">
                        {draft.sendDay} / {draft.audience}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">{draft.subject}</h3>
                      <p className="mt-2 text-sm text-mute">{draft.previewText}</p>
                    </div>
                    <Link href={`/drafts/${draft.id}`} className="primary-btn">
                      Review draft
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </SectionFrame>

        <SectionFrame
          eyebrow="Recent work"
          title="Latest draft activity"
          description="Use the draft detail surface for AI revision, manual editing, and approval notes."
        >
          <div className="space-y-3">
            {recentDrafts.map((draft) => (
              <div
                key={draft.id}
                className="flex flex-col gap-3 rounded-[26px] border border-line bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <p className="label">
                    {draft.sourceLane} / {draft.sendDay}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{draft.title}</h3>
                  <p className="mt-2 text-sm text-mute">{draft.lastInstruction || "No AI revision logged yet."}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={draft.status} />
                  <Link href={`/drafts/${draft.id}`} className="secondary-btn">
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionFrame>
      </div>
    </div>
  );
}
