import { generateFromTopicAction } from "@/app/actions";
import { SectionFrame } from "@/components/section-frame";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function TopicsPage() {
  const { state } = await getStudioSnapshot();
  const mondayTopics = state.topics.filter((topic) => topic.sendDay === "Monday");
  const thursdayTopics = state.topics.filter((topic) => topic.sendDay === "Thursday");
  const sections = [
    { label: "Monday", topics: mondayTopics },
    { label: "Thursday", topics: thursdayTopics }
  ];

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Topic banks"
        title="Monday and Thursday issue starters"
        description="These seeded topics come from the current knowledge layer and can generate a working draft immediately. The used tag only means the topic has already been spun into a draft once."
      >
        <div className="grid gap-6 xl:grid-cols-2">
          {sections.map((section) => (
            <div key={section.label} className="rounded-[28px] border border-line bg-white px-5 py-5">
              <p className="label">{section.label}</p>
              <h3 className="mt-2 text-2xl font-semibold">{section.label} bank</h3>
              <div className="mt-5 space-y-3">
                {section.topics.map((topic) => (
                  <div key={topic.id} className="rounded-[24px] border border-line bg-canvas/60 px-4 py-4">
                    <p className="label">
                      {topic.sourceLane} / {topic.suggestedAudience}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold">{topic.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-mute">{topic.angle}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="micro-pill">{topic.sendDay} fit</span>
                      <span className="micro-pill">{topic.used ? "already drafted" : "ready to generate"}</span>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-mute">
                      Knowledge links: {topic.linkedKnowledgePaths.join(" · ")}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <form action={generateFromTopicAction}>
                        <input type="hidden" name="topicId" value={topic.id} />
                        <button type="submit" className="primary-btn">
                          Generate draft
                        </button>
                      </form>
                      {topic.used ? (
                        <span className="rounded-full bg-[#dde8de] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#375443]">
                          already used
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
