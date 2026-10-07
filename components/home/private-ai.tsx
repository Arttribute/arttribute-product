import {
  ArrowUpRight,
  FileSearch,
  HardDrive,
  SlidersHorizontal,
} from "lucide-react";
import { BrandArt } from "@/components/home/brand-art";
import { LINKS, PRIMARY_CTA } from "@/lib/site";

export function PrivateAi() {
  return (
    <article id="private-ai" className="brand-private brand-dark">
      <div>
        <p className="brand-label">01 / Private AI</p>
        <p className="mt-7 text-sm text-[#c4c9d2]">Agent Commons</p>
        <h3 className="brand-title mt-3">
          Your workspace.
          <br />
          <span className="brand-serif italic text-[#e8bcd1]">Your rules.</span>
        </h3>
        <p className="brand-copy mt-5">
          Work with AI on your own computer, with local models and retrieval
          over your files. Choose cloud models and services when your work calls
          for them.
        </p>
        <div className="mt-6">
          <p className="brand-feature-line">
            <HardDrive />
            Local AI that works offline
          </p>
          <p className="brand-feature-line">
            <FileSearch />
            Your files, connected to your work
          </p>
          <p className="brand-feature-line">
            <SlidersHorizontal />
            Choice of open-weight and frontier models
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={PRIMARY_CTA.href}
            target="_blank"
            rel="noreferrer"
            className="brand-button brand-button-light"
          >
            Get Agent Commons
            <ArrowUpRight size={16} />
          </a>
          <a
            href={LINKS.agentCommons}
            target="_blank"
            rel="noreferrer"
            className="brand-text-link text-[#e0e4eb]"
          >
            Explore the product
            <ArrowUpRight />
          </a>
        </div>
        <p className="mt-4 text-xs text-[#b2bbc9]">
          Desktop early preview · macOS, Windows & Linux
        </p>
      </div>
      <div>
        <BrandArt variant="private" />
        <p className="mt-4 text-center text-[11px] tracking-wide text-[#b2bbc9]">
          Keep your work close. Choose what goes further.
        </p>
      </div>
    </article>
  );
}
