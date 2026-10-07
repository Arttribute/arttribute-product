import { Fingerprint, LockKeyhole, Unlock, UserCheck } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Hl, Section, SectionHeading } from "@/components/site/section";

export const PRINCIPLES = [
  {
    icon: LockKeyhole,
    title: "Your data stays yours.",
    body: "Local first. Sending work to the cloud is a decision you make, not a default.",
  },
  {
    icon: Unlock,
    title: "No lock-in.",
    body: "Open-weight and frontier models side by side, public code, and work you can take with you.",
  },
  {
    icon: UserCheck,
    title: "People stay in charge.",
    body: "Approvals, verification and human oversight are part of the workflow, not an afterthought.",
  },
  {
    icon: Fingerprint,
    title: "Credit follows contribution.",
    body: "Record who and what made the work, so rights, credit and rewards can follow.",
  },
];

export function Principles() {
  return (
    <Section className="border-t border-border bg-white">
      <Reveal>
        <SectionHeading
          eyebrow="What we stand for"
          tone="plum"
          title={
            <>
              Freedom tech for the <Hl tone="indigo">age of AI</Hl>.
            </>
          }
          body="Sovereignty over your data, your models and your processes, with AI that is used fairly and responsibly. Four commitments shape everything we build."
        />
      </Reveal>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map(({ icon: Icon, title, body }, index) => (
          <Reveal key={title} delay={0.06 * index} className="bg-white p-6">
            <Icon className="h-5 w-5 text-stone-500" strokeWidth={1.75} />
            <h3 className="mt-6 text-[17px] font-medium tracking-[-0.02em] text-stone-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
