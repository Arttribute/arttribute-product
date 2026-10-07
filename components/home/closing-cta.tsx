import { ArrowUpRight } from "lucide-react";
import { LINKS, PRIMARY_CTA } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="brand-cta">
      <div className="brand-container brand-cta-inner">
        <div>
          <p className="brand-label text-[#813380]">Take the next step</p>
          <h2 className="brand-title mt-5">
            Make AI <span className="brand-serif italic">work for you.</span>
          </h2>
          <p className="brand-copy mt-4">
            Start with a private workspace. Build from there.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-4">
          <a
            href={PRIMARY_CTA.href}
            target="_blank"
            rel="noreferrer"
            className="brand-button"
          >
            {PRIMARY_CTA.label}
            <ArrowUpRight size={16} />
          </a>
          <a href={LINKS.contact} className="brand-text-link">
            Let’s talk about your team
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
