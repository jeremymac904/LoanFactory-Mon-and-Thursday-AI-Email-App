import { IBM_Plex_Mono, Manrope } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";

import { SidebarNav } from "@/components/sidebar-nav";
import { getAuthContext } from "@/lib/providers/auth";
import { getProviderStatuses } from "@/lib/providers/status";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export function AppShell({ children }: { children: ReactNode }) {
  const auth = getAuthContext();
  const providerStatuses = getProviderStatuses();
  const readyProviders = providerStatuses.filter((status) => status.configured).length;

  return (
    <div className={`${manrope.variable} ${plexMono.variable} font-[var(--font-manrope)] text-ink`}>
      <div className="mx-auto min-h-screen max-w-[1600px] px-4 py-4 lg:px-6 lg:py-6">
        <div className="grid min-h-[calc(100vh-2rem)] gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="panel soft-grid p-5 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <div className="mb-8 border-b border-line/80 pb-6">
              <p className="eyebrow">Internal Studio</p>
              <Link href="/" className="mt-3 block text-[28px] font-semibold leading-[1.05] tracking-tight">
                Loan Factory
                <span className="block text-moss">AI Training Email Studio</span>
              </Link>
              <p className="mt-3 text-sm leading-6 text-mute">
                Monday and Thursday internal training, human-approved before any schedule or send step.
              </p>
            </div>

            <SidebarNav />

            <div className="mt-8 rounded-[26px] border border-line bg-white/80 p-4">
              <p className="label">Current session</p>
              <p className="mt-3 text-sm font-semibold text-ink">{auth.displayName}</p>
              <p className="mt-1 text-sm text-mute">{auth.role}</p>
              <p className="mt-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-mute">
                {readyProviders}/{providerStatuses.length} adapters ready
              </p>
            </div>
          </aside>

          <main className="panel overflow-hidden">
            <header className="border-b border-line/80 bg-paper/80 px-6 py-5 lg:px-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="eyebrow">Working surface</p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                    Train better. Ship cleaner Monday and Thursday issues.
                  </h1>
                </div>
                <div className="flex flex-wrap gap-2">
                  {providerStatuses.map((status) => (
                    <span
                      key={status.name}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
                        status.configured
                          ? "bg-[#dde8de] text-[#375443]"
                          : "bg-[#efe3d4] text-[#6a4d33]"
                      }`}
                    >
                      {status.name}: {status.mode}
                    </span>
                  ))}
                </div>
              </div>
            </header>
            <div className="px-4 py-4 lg:px-6 lg:py-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
