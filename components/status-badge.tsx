import type { DraftStatus } from "@/lib/types";

const classMap: Record<string, string> = {
  draft: "bg-[#efe3d4] text-[#6a4d33]",
  approved: "bg-[#dde8de] text-[#375443]",
  scheduled: "bg-[#e0e7f2] text-[#3c5270]",
  sent: "bg-[#e3eaee] text-[#3f5964]",
  archived: "bg-[#ece8e2] text-[#63594d]",
  rejected: "bg-[#f4dedd] text-[#7c4238]"
};

export function StatusBadge({
  status
}: {
  status: DraftStatus | "rejected" | "scheduled" | "sent" | "archived";
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${classMap[status]}`}
    >
      {status}
    </span>
  );
}
