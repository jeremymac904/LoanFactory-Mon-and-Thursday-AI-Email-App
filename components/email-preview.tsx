export function EmailPreview({
  subject,
  previewText,
  body
}: {
  subject: string;
  previewText: string;
  body: string;
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
    </div>
  );
}
