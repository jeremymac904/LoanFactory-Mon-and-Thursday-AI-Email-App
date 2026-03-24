import type { AssetItem } from "@/lib/types";

export function EmailPreview({
  subject,
  previewText,
  body,
  attachments = []
}: {
  subject: string;
  previewText: string;
  body: string;
  attachments?: AssetItem[];
}) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-line bg-white">
      <div className="border-b border-line bg-canvas/80 px-5 py-4">
        <p className="label">Preview</p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{subject}</h3>
        <p className="mt-2 text-sm text-mute">{previewText}</p>
      </div>
      <div className="space-y-3 px-5 py-5 text-sm leading-7 text-ink">
        {body.split("\n").map((line, index) =>
          line.trim() ? (
            <p key={`${line}-${index}`} className="whitespace-pre-wrap">
              {line}
            </p>
          ) : (
            <div key={`spacer-${index}`} className="h-3" />
          )
        )}
      </div>
      {attachments.length > 0 ? (
        <div className="border-t border-line bg-canvas/50 px-5 py-4">
          <p className="label">Attached support (preview only)</p>
          <div className="mt-3 space-y-2 text-sm text-ink">
            {attachments.map((asset) => (
              <div key={asset.id} className="rounded-2xl border border-line bg-white px-4 py-3">
                <p className="font-semibold">{asset.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mute">
                  {asset.kind} / {asset.source}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-mute">
            Attachments stay in linked or adapter-backed preview mode until Jeremy approves the draft.
          </p>
        </div>
      ) : null}
    </div>
  );
}
