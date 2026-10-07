import { ArrowUpRight, Boxes, CloudUpload, Cpu, FileSearch, Library, Network, WifiOff } from "lucide-react";
import { AppPreview } from "@/components/home/app-preview";
import { LocalCloudVisual } from "@/components/home/local-cloud-visual";
import { ProductMark } from "@/components/site/product-mark";
import { Reveal } from "@/components/site/reveal";
import { Hl, Section, SectionHeading } from "@/components/site/section";
import { LINKS, PRIMARY_CTA } from "@/lib/site";

const FEATURES = [
  { icon: Cpu, title: "Local models included", body: "Text, transcription, voice and image generation, ready on first run." },
  { icon: FileSearch, title: "Answers from your files", body: "Built-in retrieval over your documents, with sources cited." },
  { icon: Library, title: "A library for your work", body: "Files and AI outputs organised in one place on your computer." },
  { icon: WifiOff, title: "Works offline", body: "Switch off your Wi-Fi and keep working. That is the test." },
  { icon: Boxes, title: "Any model, little setup", body: "Install and switch between open-weight models, or use frontier ones." },
  { icon: CloudUpload, title: "Cloud continuity", body: "Continue in the cloud with agents, workflows and computers when you need them." },
];

export function PrivateAi() {
  return (
    <Section id="private-ai">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <ProductMark product="agent-commons" className="h-7 w-7 rounded-lg" />
            <p className="text-sm text-stone-500">Private AI · Agent Commons</p>
          </div>
          <SectionHeading
            className="mt-1 max-w-3xl"
            title={
              <>
                Private by default. <Hl>Cloud by choice.</Hl>
              </>
            }
            body="People want AI help with exactly the things they cannot send anywhere: finances, health records, research, client files, strategy. Agent Commons puts a full AI workspace on your own computer, set up for you."
          />
        </Reveal>
        <Reveal delay={0.08} className="flex shrink-0 flex-wrap items-center gap-3">
          <a
            href={PRIMARY_CTA.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-stone-900 px-4 text-sm font-medium text-white transition-colors hover:bg-stone-800"
          >
            Download the desktop app
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
          <a
            href={LINKS.agentCommons}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-medium text-stone-800 shadow-card transition-colors hover:bg-muted"
          >
            agentcommons.io
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </Reveal>
      </div>

      {/* Product image: the desktop app answering offline from local files. */}
      <Reveal delay={0.1} className="mt-12">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-white px-4 pb-14 pt-10 sm:px-10 sm:pb-16 sm:pt-14">
          <div aria-hidden className="dot-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div aria-hidden className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-pink-200/40 blur-[100px]" />
          <div aria-hidden className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-[100px]" />
          <div className="relative mx-auto max-w-4xl">
            <AppPreview />
          </div>
        </div>
      </Reveal>

      <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, body }, index) => (
            <Reveal key={title} delay={0.04 * index}>
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-stone-600 shadow-card">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-[15px] font-medium text-stone-950">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-600">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="space-y-4">
          <Reveal delay={0.1}>
            <LocalCloudVisual />
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href={LINKS.lan}
              className="group flex items-start gap-3 rounded-2xl border border-dashed border-stone-300 bg-page p-4 transition-colors hover:border-stone-400 hover:bg-white sm:p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                <Network className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span>
                <span className="flex items-center gap-2 text-sm font-medium text-stone-950">
                  Exploring: LAN AI for teams
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                    Early
                  </span>
                </span>
                <span className="mt-1 block text-sm leading-6 text-stone-600">
                  AI your whole team can use inside your own network, with data that stays within it. Would it help
                  your organisation?{" "}
                  <span className="text-stone-900 underline decoration-stone-300 underline-offset-4 group-hover:decoration-stone-900">
                    Tell us
                  </span>
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
