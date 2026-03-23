"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/drafts", label: "Draft Studio" },
  { href: "/schedule", label: "Schedule Queue" },
  { href: "/approvals", label: "Approvals" },
  { href: "/assets", label: "Assets Library" },
  { href: "/knowledge", label: "Knowledge Sources" },
  { href: "/topics", label: "Topic Banks" },
  { href: "/settings", label: "Settings & Memory" },
  { href: "/providers", label: "Provider Setup" },
  { href: "/archive", label: "Sent Archive" }
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
              active
                ? "bg-ink text-white"
                : "text-ink/72 hover:bg-white hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
