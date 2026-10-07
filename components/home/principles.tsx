import Link from "next/link";
import {
  ArrowUpRight,
  Fingerprint,
  LockKeyhole,
  Unlock,
  UserCheck,
} from "lucide-react";

export const PRINCIPLES = [
  {
    icon: LockKeyhole,
    title: "Control over your data",
    body: "Choose where AI runs and what information you share. Privacy should be a practical choice you can exercise.",
  },
  {
    icon: Unlock,
    title: "Freedom to choose",
    body: "Work with different models and open tools. Your processes should reflect your needs, with room to change.",
  },
  {
    icon: UserCheck,
    title: "People at the centre",
    body: "Skills, verification and human oversight make AI more useful. Good judgement belongs in the workflow.",
  },
  {
    icon: Fingerprint,
    title: "Transparency in the work",
    body: "Make contributions visible. Records of who did what help people understand, credit and assess AI-assisted work.",
  },
];

export function Principles() {
  return (
    <section
      id="approach"
      className="brand-section border-y border-border bg-white"
    >
      <div className="brand-container brand-approach">
        <div>
          <p className="brand-label text-[#813380]">Our approach</p>
          <h2 className="brand-title mt-6">
            Progress means
            <br />
            <span className="brand-serif italic">more agency.</span>
          </h2>
          <p className="brand-copy mt-6 max-w-md">
            AI should expand what people can do while preserving their freedom
            to decide. We bring that belief into the technology we build and the
            way we teach.
          </p>
          <Link href="/about" className="brand-text-link mt-6">
            Get to know Arttribute
            <ArrowUpRight />
          </Link>
        </div>
        <div>
          {PRINCIPLES.map(({ title, body }, i) => (
            <div className="brand-principle" key={title}>
              <span className="pt-1 font-mono text-[11px] text-[#813380]">
                0{i + 1}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
