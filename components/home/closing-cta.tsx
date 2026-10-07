import { ArrowUpRight } from "lucide-react";
import { CubeMark } from "@/components/site/logo";
import { Reveal } from "@/components/site/reveal";
import { Hl } from "@/components/site/section";
import { LINKS, PRIMARY_CTA } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
      <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-white px-6 py-16 text-center shadow-card sm:px-12 sm:py-20">
        <div aria-hidden className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div aria-hidden className="absolute -left-20 -top-28 h-72 w-72 rounded-full bg-pink-200/45 blur-[90px]" />
        <div aria-hidden className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-indigo-200/45 blur-[90px]" />
        <div className="relative">
          <CubeMark className="mx-auto h-9" />
          <h2 className="mx-auto mt-6 max-w-2xl text-[2rem] font-medium leading-[1.1] tracking-[-0.04em] text-stone-950 sm:text-[2.75rem]">
            Try private AI <Hl>today</Hl>.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-stone-600 sm:text-[17px]">
            Download the Agent Commons desktop preview, switch off your Wi-Fi, and keep working.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-stone-900 px-5 text-[15px] font-medium text-white transition-colors hover:bg-stone-800"
            >
              {PRIMARY_CTA.label}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href={LINKS.contact}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 text-[15px] font-medium text-stone-800 transition-colors hover:bg-muted"
            >
              Talk to us
            </a>
          </div>
          <p className="mt-4 text-[13px] text-stone-500">macOS, Windows and Linux. Free early preview.</p>
        </div>
      </Reveal>
    </section>
  );
}
