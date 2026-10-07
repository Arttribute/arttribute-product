import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrandArt } from "@/components/home/brand-art";
import { PRIMARY_CTA } from "@/lib/site";

export function Hero() {
  return (
    <section className="brand-hero">
      <div className="brand-container brand-hero-grid">
        <div className="animate-rise">
          <p className="brand-label mb-7 text-[#813380]">
            Technology with people at its heart
          </p>
          <h1>
            Powerful AI.
            <br />
            <span className="brand-serif italic text-[#354773]">
              On your terms.
            </span>
          </h1>
          <p className="brand-copy mt-7 max-w-[480px] text-[17px]">
            Your data. Your decisions. Your work.
            <br />
            We build tools and skills that put you in control of AI, and help
            you use it responsibly.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="brand-button"
            >
              {PRIMARY_CTA.label}
              <ArrowUpRight size={16} />
            </a>
            <Link href="#work" className="brand-text-link">
              Explore our work
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="animate-rise [animation-delay:100ms]">
          <div className="brand-hero-art">
            <BrandArt />
          </div>
          <p className="mt-4 flex justify-between text-[10px] uppercase tracking-[.12em] text-[#626873]">
            <span>Private. Open. Accountable.</span>
            <span>Arttribute / 01</span>
          </p>
        </div>
      </div>
    </section>
  );
}
