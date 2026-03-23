import {
  addMemoryNoteAction,
  savePreferencesAction,
  toggleMemorySignalAction
} from "@/app/actions";
import { SectionFrame } from "@/components/section-frame";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { state } = await getStudioSnapshot();

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Settings and memory"
        title="Jeremy's editable preference profile"
        description="Nothing about memory is hidden. Approved patterns and edit instructions are stored as visible, editable signals."
      >
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <form action={savePreferencesAction} className="space-y-4 rounded-[28px] border border-line bg-white p-5">
            <label className="block">
              <span className="label">Tone preference</span>
              <textarea
                name="tonePreference"
                defaultValue={state.preferences.tonePreference}
                className="text-area mt-2"
              />
            </label>
            <label className="block">
              <span className="label">Length preference</span>
              <textarea
                name="lengthPreference"
                defaultValue={state.preferences.lengthPreference}
                className="text-area mt-2"
              />
            </label>
            <label className="block">
              <span className="label">Subject line preference</span>
              <input
                name="subjectLinePreference"
                defaultValue={state.preferences.subjectLinePreference}
                className="text-input mt-2"
              />
            </label>
            <label className="block">
              <span className="label">Favorite structures (one per line)</span>
              <textarea
                name="favoriteStructures"
                defaultValue={state.preferences.favoriteStructures.join("\n")}
                className="text-area mt-2"
              />
            </label>
            <label className="block">
              <span className="label">Phrases to use (one per line)</span>
              <textarea
                name="phrasesToUse"
                defaultValue={state.preferences.phrasesToUse.join("\n")}
                className="text-area mt-2"
              />
            </label>
            <label className="block">
              <span className="label">Phrases to avoid (one per line)</span>
              <textarea
                name="phrasesToAvoid"
                defaultValue={state.preferences.phrasesToAvoid.join("\n")}
                className="text-area mt-2"
              />
            </label>
            <label className="block">
              <span className="label">Compliance preference</span>
              <textarea
                name="compliancePreference"
                defaultValue={state.preferences.compliancePreference}
                className="text-area mt-2"
              />
            </label>
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="block">
                <span className="label">Default audience</span>
                <select
                  name="defaultAudience"
                  defaultValue={state.preferences.defaultAudience}
                  className="select-input mt-2"
                >
                  <option>Team</option>
                  <option>Company</option>
                </select>
              </label>
              <label className="block">
                <span className="label">Default send day</span>
                <select
                  name="defaultSendDay"
                  defaultValue={state.preferences.defaultSendDay}
                  className="select-input mt-2"
                >
                  <option>Monday</option>
                  <option>Thursday</option>
                </select>
              </label>
            </div>
            <button type="submit" className="primary-btn">
              Save preferences
            </button>
          </form>

          <div className="space-y-6">
            <form action={addMemoryNoteAction} className="rounded-[28px] border border-line bg-white p-5">
              <p className="label">Manual memory note</p>
              <label className="mt-4 block">
                <span className="label">Label</span>
                <input name="label" className="text-input mt-2" placeholder="Example: Avoid soft openers" />
              </label>
              <label className="mt-4 block">
                <span className="label">Memory content</span>
                <textarea
                  name="content"
                  className="text-area mt-2"
                  placeholder="Write the preference or pattern Jeremy wants kept."
                />
              </label>
              <button type="submit" className="primary-btn mt-4">
                Add memory note
              </button>
            </form>

            <div className="rounded-[28px] border border-line bg-white p-5">
              <p className="label">Active memory signals</p>
              <div className="mt-4 space-y-3">
                {state.memorySignals.map((signal) => (
                  <div key={signal.id} className="rounded-[24px] border border-line bg-canvas/60 px-4 py-4">
                    <p className="label">
                      {signal.type.replaceAll("_", " ")} / {signal.active ? "active" : "inactive"}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold">{signal.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-mute">{signal.content}</p>
                    <form action={toggleMemorySignalAction} className="mt-4">
                      <input type="hidden" name="signalId" value={signal.id} />
                      <input type="hidden" name="active" value={signal.active ? "false" : "true"} />
                      <button type="submit" className="secondary-btn">
                        {signal.active ? "Deactivate" : "Reactivate"}
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
