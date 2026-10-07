import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProvenanceGraph } from "@/components/home/provenance-graph";
import { ProductMark } from "@/components/site/product-mark";
import { Reveal } from "@/components/site/reveal";
import { Hl, Section, SectionHeading } from "@/components/site/section";
import { LINKS } from "@/lib/site";

const POINTS = [
  {
    title: "Entity, Action, Attribution",
    body: "A small open model for who did what, with which tools and models, and who gets credit for the result.",
  },
  {
    title: "Rights and AI disclosure",
    body: "Typed extensions record licences, AI involvement and the conditions under which work may be used.",
  },
  {
    title: "Records anyone can check",
    body: "Provenance can be verified independently, with selective disclosure when details should stay private.",
  },
];

export function Provenance() {
  return (
    <Section id="provenance">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <ProvenanceGraph />
          <Link
            href="/blog/provenance-for-human-ai-work"
            className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border border-border bg-white px-5 py-4 transition-colors hover:bg-page"
          >
            <span className="text-sm leading-6 text-stone-600">
              Grounded in research on the governance of human and AI created work, with legal analysis across EU, US and
              WIPO frameworks.
            </span>
            <ArrowRight
              className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-stone-900"
              strokeWidth={1.75}
            />
          </Link>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <ProductMark product="provenancekit" className="h-7 w-7 rounded-lg text-[10px]" />
              <p className="text-sm text-stone-500">Provenance · ProvenanceKit</p>
            </div>
            <SectionHeading
              className="mt-1"
              title={
                <>
                  Transparency you can <Hl>verify</Hl>.
                </>
              }
              body="As more work is made with AI, questions of authorship, rights and responsibility depend on knowing how it was made. ProvenanceKit records the chain of creation as it happens, so credit and accountability can follow."
            />
          </Reveal>

          <div className="mt-8 space-y-5">
            {POINTS.map((point, index) => (
              <Reveal key={point.title} delay={0.05 * index}>
                <div className="border-l-2 border-pink-200 pl-4">
                  <h3 className="text-[15px] font-medium text-stone-950">{point.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600">{point.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={LINKS.provenanceKit}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-stone-900 px-4 text-sm font-medium text-white transition-colors hover:bg-stone-800"
            >
              Visit ProvenanceKit
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <a
              href={LINKS.provenanceKitDocs}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-medium text-stone-800 shadow-card transition-colors hover:bg-muted"
            >
              Read the docs
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
