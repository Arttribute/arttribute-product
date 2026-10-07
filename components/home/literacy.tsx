import { ArrowUpRight } from "lucide-react";
import { BrandArt } from "@/components/home/brand-art";
import { LINKS } from "@/lib/site";

export function Literacy() {
  return (
    <article id="ai-literacy" className="brand-product-card bg-[#eeecf4]">
      <p className="brand-label text-[#514977]">02 / AI literacy</p>
      <BrandArt variant="learning" className="brand-card-art" />
      <p className="text-sm text-[#66617a]">CommonLab</p>
      <h3 className="mt-3">
        Better skills.
        <br />
        <span className="brand-serif italic">Better judgement.</span>
      </h3>
      <p className="brand-copy mb-7 mt-5">
        Practical AI learning for leaders, teams, educators and students. Build
        useful workflows and the judgement to verify outputs, protect
        information and keep people involved.
      </p>
      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2">
        <a
          className="brand-text-link"
          href={LINKS.commonLab}
          target="_blank"
          rel="noreferrer"
        >
          Explore CommonLab
          <ArrowUpRight />
        </a>
        <a className="brand-text-link text-[#66617a]" href={LINKS.workshop}>
          Book a workshop
          <ArrowUpRight />
        </a>
      </div>
    </article>
  );
}
