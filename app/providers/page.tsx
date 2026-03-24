import { SectionFrame } from "@/components/section-frame";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function ProvidersPage() {
  const { providerStatuses, auth } = await getStudioSnapshot();
  const reviewSafe = providerStatuses.filter((status) =>
    ["mock", "local", "local-admin"].includes(status.mode)
  ).length;

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Provider setup"
        title="Adapters, env placeholders, and deployment posture"
        description="The studio is designed so Jeremy can review drafts immediately in mock mode and wire providers later without rewriting the app."
      >
        <div className="mb-6 grid gap-3 xl:grid-cols-2">
          <div className="notice-card">
            <p className="label">What works now</p>
            <p className="mt-3 text-sm leading-6 text-mute">
              The app can generate, revise, approve, attach assets, schedule, and mark items sent in
              mock mode with no provider secrets.
            </p>
          </div>
          <div className="notice-card">
            <p className="label">What needs secrets later</p>
            <p className="mt-3 text-sm leading-6 text-mute">
              Live Gemini, real email sending, remote storage, external auth, and cron-backed
              scheduling still require env wiring. The adapter boundaries are already in place.
            </p>
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          {providerStatuses.map((status) => (
            <div key={status.name} className="rounded-[28px] border border-line bg-white px-5 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="label">{status.name}</p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    {["mock", "local", "local-admin"].includes(status.mode)
                      ? `${status.mode} review mode`
                      : status.mode}
                  </h3>
                </div>
                <span className="micro-pill">
                  {["mock", "local", "local-admin"].includes(status.mode)
                    ? "works now"
                    : status.configured
                      ? "provider wired"
                      : "secrets needed"}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-mute">{status.note}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-mute">
                {["mock", "local", "local-admin"].includes(status.mode)
                  ? "Optional env keys for later"
                  : "Env keys"}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-mute">
                {status.envKeys.map((key) => (
                  <li key={key} className="font-mono text-xs uppercase tracking-[0.18em]">
                    {key}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        eyebrow="Local admin mode"
        title="Current auth posture"
        description="A simple Jeremy local-admin stub keeps review fast while preserving the hard approval gate."
      >
        <div className="rounded-[28px] border border-line bg-white px-5 py-5">
          <p className="label">Current user</p>
          <h3 className="mt-2 text-2xl font-semibold">{auth.displayName}</h3>
          <p className="mt-2 text-sm text-mute">
            {auth.role} / {auth.mode}
          </p>
          <p className="mt-4 text-sm leading-6 text-mute">
            {reviewSafe} adapters are already review-safe in the current environment. Leave secrets
            empty if Jeremy is only validating flow and visual quality.
          </p>
        </div>
      </SectionFrame>
    </div>
  );
}
