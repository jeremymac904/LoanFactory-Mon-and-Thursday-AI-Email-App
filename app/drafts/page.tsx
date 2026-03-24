import Link from "next/link";

import { generateDraftAction } from "@/app/actions";
import { SectionFrame } from "@/components/section-frame";
import { StatusBadge } from "@/components/status-badge";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function DraftStudioPage() {
  const { state } = await getStudioSnapshot();
  const drafts = [...state.drafts].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Draft studio"
        title="Generate a new Monday or Thursday issue"
        description="Use the current knowledge layer, Jeremy's memory settings, and optional assets to create a draft. If no AI secret is present, the flow stays fully usable in mock mode."
      >
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <form action={generateDraftAction} className="grid gap-4 lg:grid-cols-2">
            <label className="block">
              <span className="label">Send day</span>
              <select
                name="sendDay"
                defaultValue={state.preferences.defaultSendDay}
                className="select-input mt-2"
              >
                <option>Monday</option>
                <option>Thursday</option>
              </select>
              <p className="field-help">Monday is best for quick wins. Thursday is best for field workflow or recap moves.</p>
            </label>

            <label className="block">
              <span className="label">Audience</span>
              <select
                name="audience"
                defaultValue={state.preferences.defaultAudience}
                className="select-input mt-2"
              >
                <option>Team</option>
                <option>Company</option>
              </select>
              <p className="field-help">Team can be tighter and more tactical. Company should travel cleanly across functions.</p>
            </label>

            <label className="block">
              <span className="label">Source lane</span>
              <select name="sourceLane" className="select-input mt-2" defaultValue="Weekly Training">
                <option>Google AI</option>
                <option>Sales and Marketing</option>
                <option>Operations</option>
                <option>Weekly Training</option>
              </select>
              <p className="field-help">Pick the lane that owns the lesson so the prompt pulls the right knowledge anchors.</p>
            </label>

            <label className="block">
              <span className="label">Compliance mode</span>
              <select name="complianceMode" className="select-input mt-2" defaultValue="safe">
                <option value="safe">Safe review mode</option>
                <option value="standard">Standard draft mode</option>
              </select>
              <p className="field-help">Safe mode keeps review language more explicit for regulated or uncertain material.</p>
            </label>

            <label className="block lg:col-span-2">
              <span className="label">Topic</span>
              <input
                name="topic"
                className="text-input mt-2"
                placeholder="Example: Gemini inbox triage before the day gets noisy"
                required
              />
              <p className="field-help">Keep this to one lesson only. The studio works better when the topic is narrow.</p>
            </label>

            <label className="block lg:col-span-2">
              <span className="label">Notes or transcript excerpt</span>
              <textarea
                name="notes"
                className="text-area mt-2"
                placeholder="Paste notes, transcript snippets, or the practical angle Jeremy wants."
                required
              />
              <p className="field-help">Best input: one useful angle, one tactical move, and any caution note Jeremy wants preserved.</p>
            </label>

            <div className="lg:col-span-2">
              <span className="label">Attach existing assets</span>
              <p className="field-help">Checked assets appear in preview mode only until the draft is approved and scheduled.</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {state.assets.map((asset) => (
                  <label
                    key={asset.id}
                    className="flex items-start gap-3 rounded-[24px] border border-line bg-white px-4 py-3 text-sm text-ink"
                  >
                    <input type="checkbox" name="assetIds" value={asset.id} className="mt-1" />
                    <span>
                      <strong className="block font-semibold">{asset.name}</strong>
                      <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-mute">
                        {asset.kind} / {asset.source}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-wrap gap-3">
              <button type="submit" className="primary-btn">
                Generate draft
              </button>
              <Link href="/topics" className="secondary-btn">
                Use topic bank instead
              </Link>
            </div>
          </form>

          <div className="space-y-4">
            <div className="notice-card">
              <p className="label">Fast review loop</p>
              <h3 className="mt-2 text-xl font-semibold">How this flow behaves right now</h3>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-mute">
                <li>1. Generate a short issue from notes, memory, and linked knowledge.</li>
                <li>2. Refine the draft on the detail page with AI edit instructions or manual edits.</li>
                <li>3. Approve it before any schedule move. Nothing sends live without later provider wiring.</li>
              </ol>
            </div>
            <div className="notice-card">
              <p className="label">Defaults in play</p>
                <p className="mt-3 text-sm leading-6 text-mute">
                  Current defaults come from Jeremy&apos;s memory profile: {state.preferences.defaultSendDay} /{" "}
                  {state.preferences.defaultAudience}, {state.preferences.favoriteStructures[0]}, and a
                  short tactical voice.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="micro-pill">mock-safe draft generation</span>
                  <span className="micro-pill">human approval required</span>
                  <span className="micro-pill">approved drafts unlock tutorial video</span>
                  <span className="micro-pill">{state.memorySignals.filter((signal) => signal.active).length} active memory signals</span>
                </div>
              </div>
            </div>
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="Recent drafts"
        title="Current draft list"
        description="Open any draft for AI revision, manual edits, preview, approval, and final scheduling."
      >
        <div className="space-y-3">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="flex flex-col gap-4 rounded-[28px] border border-line bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="label">
                  {draft.sendDay} / {draft.audience} / {draft.sourceLane}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{draft.subject}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">{draft.previewText}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="micro-pill">{draft.aiMode} mode</span>
                  <span className="micro-pill">{draft.revisionCount} revisions</span>
                  {draft.tutorialVideo ? (
                    <span className="micro-pill">tutorial video: {draft.tutorialVideo.status}</span>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={draft.status} />
                <Link href={`/drafts/${draft.id}`} className="secondary-btn">
                  Open draft
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>
    </div>
  );
}
