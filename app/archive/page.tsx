import Link from "next/link";

import { EmailPreview } from "@/components/email-preview";
import { SectionFrame } from "@/components/section-frame";
import { StatusBadge } from "@/components/status-badge";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const { state } = await getStudioSnapshot();
  const archived = state.drafts.filter((draft) => draft.status === "sent" || draft.status === "archived");

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Archive"
        title="Preview sent and archived issues"
        description="This is the sent-log surface. In mock email mode, sent items are recorded without live delivery so Jeremy can still review the full lifecycle."
      >
        <div className="space-y-6">
          {archived.length === 0 ? (
            <div className="notice-card">
              <p className="text-sm font-semibold text-ink">No sent or archived issues are logged yet.</p>
              <p className="mt-2 text-sm leading-6 text-mute">
                Mark a scheduled issue as sent or archive an approved issue from draft detail to
                populate this view.
              </p>
            </div>
          ) : (
            archived.map((draft) => (
              <div key={draft.id} className="grid gap-4 rounded-[28px] border border-line bg-white p-5 xl:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <p className="label">
                    {draft.sendDay} / {draft.sourceLane}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{draft.subject}</h3>
                  <p className="mt-2 text-sm leading-6 text-mute">{draft.previewText}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <StatusBadge status={draft.status} />
                    <Link href={`/drafts/${draft.id}`} className="secondary-btn">
                      Open draft
                    </Link>
                  </div>
                </div>
                <EmailPreview subject={draft.subject} previewText={draft.previewText} body={draft.body} />
              </div>
            ))
          )}
        </div>
      </SectionFrame>
    </div>
  );
}
