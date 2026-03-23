import { SectionFrame } from "@/components/section-frame";
import { getStudioSnapshot } from "@/lib/studio-service";
import type { KnowledgeDocSummary } from "@/lib/types";

export const dynamic = "force-dynamic";

function formatLaneLabel(lane: string): string {
  return lane
    .replaceAll("_", " ")
    .replace(/^\d+\s*/, "")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function KnowledgePage() {
  const { docs } = await getStudioSnapshot();
  const grouped = docs.reduce<Record<string, KnowledgeDocSummary[]>>((accumulator, doc) => {
    accumulator[doc.lane] = accumulator[doc.lane] || [];
    accumulator[doc.lane].push(doc);
    return accumulator;
  }, {});

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Knowledge sources"
        title="The product's grounded source layer"
        description="This view exposes the current markdown system that feeds prompts, training structure, topic banks, and future portal work."
      >
        <div className="grid gap-6">
          {Object.entries(grouped).map(([lane, laneDocs]) => (
            <div key={lane} className="rounded-[28px] border border-line bg-white px-5 py-5">
              <div className="mb-4 flex flex-col gap-2 border-b border-line pb-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="label">Lane</p>
                  <h3 className="mt-2 text-xl font-semibold">{formatLaneLabel(lane)}</h3>
                </div>
                <p className="text-sm text-mute">{laneDocs?.length || 0} markdown sources</p>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                  {laneDocs?.map((doc) => (
                  <div key={doc.id} className="rounded-[24px] border border-line bg-canvas/60 px-4 py-4">
                    <p className="label">{doc.relativePath}</p>
                    <h4 className="mt-2 text-lg font-semibold">{doc.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-mute">{doc.preview}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {doc.hasFactualFlag ? (
                        <span className="rounded-full bg-[#efe3d4] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6a4d33]">
                          factual review
                        </span>
                      ) : null}
                      {doc.hasComplianceFlag ? (
                        <span className="rounded-full bg-[#f0ddd9] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c4238]">
                          compliance review
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>
    </div>
  );
}
