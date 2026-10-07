import { ArrowUpRight } from "lucide-react";
import { BrandArt } from "@/components/home/brand-art";
import { LINKS } from "@/lib/site";

export function Provenance() {
  return (
    <article id="provenance" className="brand-product-card bg-[#f3e9ee]">
      <p className="brand-label text-[#813380]">03 / Provenance</p>
      <BrandArt variant="provenance" className="brand-card-art" />
      <p className="text-sm text-[#796370]">ProvenanceKit</p>
      <h3 className="mt-3">
        Every contribution.
        <br />
        <span className="brand-serif italic">A clearer story.</span>
      </h3>
      <p className="brand-copy mb-7 mt-5">
        Open-source tools to record how human and AI work is made. Connect the
        people, models and steps behind an output, so attribution and
        accountability have a foundation.
      </p>
      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2">
        <a
          className="brand-text-link"
          href={LINKS.provenanceKit}
          target="_blank"
          rel="noreferrer"
        >
          Discover ProvenanceKit
          <ArrowUpRight />
        </a>
        <a
          className="brand-text-link text-[#796370]"
          href={LINKS.provenanceKitDocs}
          target="_blank"
          rel="noreferrer"
        >
          Read the docs
          <ArrowUpRight />
        </a>
      </div>
    </article>
  );
}
