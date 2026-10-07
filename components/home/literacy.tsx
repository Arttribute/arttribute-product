import { ArrowUpRight, Briefcase, GraduationCap, Presentation, Users } from "lucide-react";
import { SessionModel } from "@/components/home/session-model";
import { ProductMark } from "@/components/site/product-mark";
import { Reveal } from "@/components/site/reveal";
import { Hl, Section, SectionHeading } from "@/components/site/section";
import { LINKS } from "@/lib/site";

const AUDIENCES = [
  {
    icon: Briefcase,
    title: "Leaders and executives",
    body: "Where AI fits in the organisation, what it should not touch, and how to adopt it with care.",
  },
  {
    icon: Users,
    title: "Teams and professionals",
    body: "Everyday workflows, sharper thinking and real time saved, whatever your technical background.",
  },
  {
    icon: Presentation,
    title: "Educators",
    body: "Courses, live sessions and safe sandboxes on CommonLab, with a copilot that helps you build them.",
  },
  {
    icon: GraduationCap,
    title: "Students and young people",
    body: "Understand how AI works, experiment safely, and build a first AI-powered project.",
  },
];

const COVERS = [
  "Privacy and sensitive information",
  "Verifying what AI produces",
  "Human oversight",
  "Knowing when not to use AI",
  "Agents, tools, memory and workflows",
];

export function Literacy() {
  return (
    <Section id="ai-literacy" className="border-t border-border bg-white">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <Reveal>
            <div className="flex items-center gap-2.5">
              <ProductMark product="commonlab" className="h-7 w-7 rounded-lg" />
              <p className="text-sm text-stone-500">AI literacy · CommonLab</p>
            </div>
            <SectionHeading
              className="mt-1"
              title={
                <>
                  AI literacy for <Hl tone="indigo">every level</Hl>.
                </>
              }
              body="From boardrooms to classrooms, we help people get real value from AI and use it responsibly. Literacy is more than prompting: it is knowing how AI should fit into the work."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 rounded-2xl border border-border bg-page p-5">
              <p className="text-sm font-medium text-stone-900">Every programme covers</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {COVERS.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[13px] text-stone-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={LINKS.workshop}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-stone-900 px-4 text-sm font-medium text-white transition-colors hover:bg-stone-800"
            >
              Bring a workshop to your team
            </a>
            <a
              href={LINKS.commonLab}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-medium text-stone-800 shadow-card transition-colors hover:bg-muted"
            >
              Explore CommonLab
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </Reveal>
        </div>

        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {AUDIENCES.map(({ icon: Icon, title, body }, index) => (
              <Reveal key={title} delay={0.05 * index} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-floating">
                  <Icon className="h-5 w-5 text-stone-500" strokeWidth={1.75} />
                  <h3 className="mt-4 text-[15px] font-medium text-stone-950">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-stone-600">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <SessionModel />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
