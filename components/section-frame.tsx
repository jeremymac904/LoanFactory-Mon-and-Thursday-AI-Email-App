import { ReactNode } from "react";

export function SectionFrame({
  title,
  eyebrow,
  description,
  children,
  aside
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="panel p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-line/70 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{title}</h2>
          {description ? <p className="mt-2 text-sm leading-6 text-mute">{description}</p> : null}
        </div>
        {aside ? <div className="flex flex-wrap gap-3">{aside}</div> : null}
      </div>
      {children}
    </section>
  );
}
