import { SectionFrame } from "@/components/section-frame";
import { StatusBadge } from "@/components/status-badge";
import { getStudioSnapshot } from "@/lib/studio-service";

export const dynamic = "force-dynamic";

export default async function ProvidersPage() {
  const { providerStatuses, auth } = await getStudioSnapshot();

  return (
    <div className="space-y-6">
      <SectionFrame
        eyebrow="Provider setup"
        title="Adapters, env placeholders, and deployment posture"
        description="The studio is designed so Jeremy can review drafts immediately in local mode and wire providers later without rewriting the app."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {providerStatuses.map((status) => (
            <div key={status.name} className="rounded-[28px] border border-line bg-white px-5 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="label">{status.name}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{status.mode}</h3>
                </div>
                <StatusBadge status={status.configured ? "approved" : "draft"} />
              </div>
              <p className="mt-4 text-sm leading-6 text-mute">{status.note}</p>
              <ul className="mt-4 space-y-2 text-sm text-mute">
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
        description="A simple Jeremy local-admin stub keeps the first pass fast while preserving the human approval gate."
      >
        <div className="rounded-[28px] border border-line bg-white px-5 py-5">
          <p className="label">Current user</p>
          <h3 className="mt-2 text-2xl font-semibold">{auth.displayName}</h3>
          <p className="mt-2 text-sm text-mute">
            {auth.role} / {auth.mode}
          </p>
        </div>
      </SectionFrame>
    </div>
  );
}
