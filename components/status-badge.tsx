import type { DraftStatus } from "@/lib/types";

const classMap: Record<string, string> = {
  draft: "bg-[#efe3d4] text-[#6a4d33]",
  approved: "bg-[#dde8de] text-[#375443]",
  scheduled: "bg-[#e0e7f2] text-[#3c5270]",
  sent: "bg-[#e3eaee] text-[#3f5964]",
  archived: "bg-[#ece8e2] text-[#63594d]",
  rejected: "bg-[#f4dedd] text-[#7c4238]",
  video_script_approved: "bg-[#e7e3f0] text-[#5b4a78]",
  video_render_requested: "bg-[#e0e7f2] text-[#3c5270]",
  video_review_ready: "bg-[#dde8de] text-[#375443]",
  video_attached: "bg-[#dde8de] text-[#375443]",
  video_restarted: "bg-[#efe3d4] text-[#6a4d33]",
  video_failed: "bg-[#f4dedd] text-[#7c4238]"
};

const labelMap: Record<string, string> = {
  draft: "needs review",
  approved: "approved",
  scheduled: "scheduled",
  sent: "sent",
  archived: "archived",
  rejected: "rejected",
  video_script_approved: "script approved",
  video_render_requested: "rendering",
  video_review_ready: "video review",
  video_attached: "video attached",
  video_restarted: "video restarted",
  video_failed: "video failed"
};

export function StatusBadge({
  status
}: {
  status:
    | DraftStatus
    | "rejected"
    | "video_script_approved"
    | "video_render_requested"
    | "video_review_ready"
    | "video_attached"
    | "video_restarted"
    | "video_failed";
}) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${classMap[status]}`}
    >
      {labelMap[status]}
    </span>
  );
}
