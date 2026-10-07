import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hl } from "@/components/site/section";
import { PRIMARY_CTA } from "@/lib/site";

/**
 * A quiet front door: one statement, one line of support, two actions.
 * Product imagery waits for the sections below.
 */
export function Hero({ announcement }: { announcement?: { href: string; label: string } | null }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36">
        {announcement ? (
          <div className="animate-rise">
            <Link
              href={announcement.href}
              className="group inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-stone-950"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
              {announcement.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
            </Link>
          </div>
        ) : null}

        <div className="animate-rise [animation-delay:60ms]">
          <h1 className="mt-7 max-w-4xl text-[2.75rem] font-medium leading-[1.03] tracking-[-0.05em] text-stone-950 sm:text-[4.25rem] lg:text-[5.25rem] lg:leading-[1]">
            AI that keeps you <Hl>in control</Hl>.
          </h1>
        </div>

        <div className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="animate-rise [animation-delay:140ms]">
            <p className="max-w-xl text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">
              Private, transparent and responsible AI for people, teams and organisations.
            </p>
          </div>
          <div className="flex shrink-0 animate-rise flex-wrap items-center gap-3 [animation-delay:220ms]">
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-stone-900 px-5 text-[15px] font-medium text-white transition-colors hover:bg-stone-800"
            >
              {PRIMARY_CTA.label}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <Link
              href="#work"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-stone-200 bg-white px-5 text-[15px] font-medium text-stone-800 transition-colors hover:bg-muted"
            >
              Explore our work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
