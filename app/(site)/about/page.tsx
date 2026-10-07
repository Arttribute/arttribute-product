import type { Metadata } from "next";
import { ArrowUpRight, Gamepad2, MapPin } from "lucide-react";
import { PRINCIPLES } from "@/components/home/principles";
import { ProductMark } from "@/components/site/product-mark";
import { Reveal } from "@/components/site/reveal";
import { Hl, Section, SectionHeading } from "@/components/site/section";
import { SocialLinks } from "@/components/site/social-icons";
import { LINKS, PRIMARY_CTA, PRODUCTS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arttribute builds technology that keeps people in control of AI: private local AI with Agent Commons, AI literacy with CommonLab, and provenance with ProvenanceKit.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
        <div className="animate-rise">
          <p className="flex items-center gap-2 text-sm text-stone-500">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
            About
          </p>
          <h1 className="mt-5 max-w-4xl text-[2.5rem] font-medium leading-[1.05] tracking-[-0.045em] text-stone-950 sm:text-[3.75rem]">
            People should be <Hl>in charge</Hl> of their AI, not the other way round.
          </h1>
        </div>
        <div className="mt-10 grid gap-8 animate-rise [animation-delay:120ms] lg:grid-cols-2 lg:gap-16">
          <p className="text-lg leading-8 text-stone-700">
            Arttribute builds technology that gives people and organisations control over how they use AI: where it
            runs, what it can see, how well they use it, and how the work it helps make is credited.
          </p>
          <p className="text-lg leading-8 text-stone-600">
            We care about sovereignty over data, models and processes, and about AI that is used fairly and
            responsibly. Those are not trade-offs against usefulness. They are what make AI worth trusting with real
            work.
          </p>
        </div>
      </section>

      <Section className="border-t border-border bg-white">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  From fair use of art to <Hl tone="indigo">fair use of AI</Hl>.
                </>
              }
            />
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-[17px] leading-8 text-stone-600">
            <p>
              Arttribute began with a question from artists: how can creative work be used fairly in generative AI? We
              built tools for attribution and licensing in AI art, and learned a lot about how hard fairness is to
              guarantee once work leaves the person who made it.
            </p>
            <p>
              The question turned out to be bigger than art. Every person and organisation adopting AI now asks it
              about their own data, processes and intellectual property. Can I use AI on this without giving it away?
              Do my people know how to use it well? Can anyone tell how this was made?
            </p>
            <p>
              So we widened our focus from artists to everyone who works with AI, and from licensing to the things
              that make AI trustworthy in practice: privacy, literacy and provenance.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="What we build"
            title={
              <>
                Three products, <Hl>one idea</Hl>.
              </>
            }
            body="Each one answers a different part of the same question: how do people stay in control as AI becomes part of their work?"
          />
        </Reveal>
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.key} delay={0.05 * index}>
              <a
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-4 p-6 transition-colors hover:bg-page sm:grid-cols-[220px_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
              >
                <span className="flex items-center gap-3">
                  <ProductMark product={product.key} />
                  <span>
                    <span className="block text-[15px] font-medium text-stone-950">{product.name}</span>
                    <span className="block text-sm text-stone-500">{product.area}</span>
                  </span>
                </span>
                <span className="text-[15px] leading-7 text-stone-600">{product.summary}</span>
                <ArrowUpRight
                  className="hidden h-5 w-5 text-stone-300 transition-colors group-hover:text-stone-900 sm:block"
                  strokeWidth={1.75}
                />
              </a>
            </Reveal>
          ))}
          <Reveal>
            <a
              href={LINKS.commonArcade}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-4 bg-page/60 p-6 transition-colors hover:bg-page sm:grid-cols-[220px_minmax(0,1fr)_auto] sm:items-center sm:gap-8"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-stone-600">
                  <Gamepad2 className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-stone-950">Common Arcade</span>
                  <span className="block text-sm text-stone-500">Also from us</span>
                </span>
              </span>
              <span className="text-[15px] leading-7 text-stone-600">
                A place where people and AI agents create, publish and play games together.
              </span>
              <ArrowUpRight
                className="hidden h-5 w-5 text-stone-300 transition-colors group-hover:text-stone-900 sm:block"
                strokeWidth={1.75}
              />
            </a>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-border bg-white">
        <Reveal>
          <SectionHeading eyebrow="What we stand for" tone="plum" title="Four commitments." />
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {PRINCIPLES.map(({ icon: Icon, title, body }, index) => (
            <Reveal key={title} delay={0.05 * index} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-page text-stone-600">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-[17px] font-medium tracking-[-0.02em] text-stone-950">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-7 text-stone-600">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Research"
              tone="indigo"
              title="Grounded in research."
              body="Our provenance work grew out of research on the governance of human and AI created works, carried out in the AI for Sustainable Societies master's programme across Tallinn University, Tampere University and Lusófona University. It combines legal analysis across EU, US and WIPO frameworks with the technical design of provenance records."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading
              eyebrow="Where we are"
              title="Nairobi, and anywhere."
              body="We are based in Nairobi and work with people, teams and organisations wherever they are. Workshops run in person and online, and our products work offline by design."
            />
            <p className="mt-5 flex items-center gap-2 text-sm text-stone-500">
              <MapPin className="h-4 w-4" strokeWidth={1.75} />
              Nairobi, Kenya
            </p>
          </Reveal>
        </div>
      </Section>

      <section className="px-4 pb-24 sm:px-6">
        <Reveal className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-border bg-white p-8 shadow-card sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[1.75rem] font-medium leading-tight tracking-[-0.035em] text-stone-950 sm:text-[2.25rem]">
              Work with us.
            </h2>
            <p className="mt-3 max-w-lg text-base leading-7 text-stone-600">
              Workshops for your team, private AI for your organisation, or provenance for your platform. Write to{" "}
              <a
                href={LINKS.contact}
                className="text-stone-900 underline decoration-pink-300 decoration-[1.5px] underline-offset-4 hover:decoration-brand-pink"
              >
                {SITE.email}
              </a>
              .
            </p>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
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
              href={LINKS.workshop}
              className="inline-flex h-11 items-center rounded-lg border border-stone-200 bg-white px-5 text-[15px] font-medium text-stone-800 transition-colors hover:bg-muted"
            >
              Book a workshop
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
