import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page width and vertical rhythm for marketing sections. */
export function Section({
  id,
  children,
  className,
  inner,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <div className={cn("mx-auto max-w-6xl px-4 sm:px-6", inner)}>{children}</div>
    </section>
  );
}

/** A quiet label above a heading: a colored dot and plain sentence-case text. */
export function Eyebrow({ children, tone = "pink" }: { children: ReactNode; tone?: "pink" | "indigo" | "plum" }) {
  return (
    <p className="flex items-center gap-2 text-sm text-stone-500">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "pink" && "bg-brand-pink",
          tone === "plum" && "bg-brand-plum",
          tone === "indigo" && "bg-brand-indigo",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  tone,
  title,
  body,
  className,
  align = "left",
}: {
  eyebrow?: ReactNode;
  tone?: "pink" | "indigo" | "plum";
  title: ReactNode;
  body?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center [&_p]:justify-center", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 text-[1.75rem] font-medium leading-[1.15] tracking-[-0.035em] text-stone-950 sm:text-[2.35rem] sm:leading-[1.12]">
        {title}
      </h2>
      {body ? <p className="mt-4 text-base leading-7 text-stone-600 sm:text-[17px] sm:leading-8">{body}</p> : null}
    </div>
  );
}

/** One highlighted phrase inside a heading. Use once per heading; it never splits across lines. */
export function Hl({ children, tone = "pink" }: { children: ReactNode; tone?: "pink" | "indigo" }) {
  return <span className={cn("hl whitespace-nowrap", tone === "pink" ? "hl-pink" : "hl-indigo")}>{children}</span>;
}
