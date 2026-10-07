import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { BrandArt } from "@/components/home/brand-art";
import { ClosingCta } from "@/components/home/closing-cta";
import { Principles } from "@/components/home/principles";
import { ProductMark } from "@/components/site/product-mark";
import { LINKS, PRODUCTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Meet Arttribute. We build technology and education that give people more agency over how they work with AI.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="brand-section">
        <div className="brand-container">
          <div className="brand-hero-grid">
            <div>
              <p className="brand-label text-[#813380]">Meet Arttribute</p>
              <h1 className="brand-title mt-7 text-[clamp(42px,5.6vw,80px)]">
                A more human
                <br />
                <span className="brand-serif italic">future with AI.</span>
              </h1>
              <p className="brand-copy mt-7 max-w-lg text-lg">
                We are a technology company working at the intersection of
                private AI, practical education and transparent creation. Our
                aim is simple: give people more agency over the technology
                shaping their lives.
              </p>
            </div>
            <div className="brand-hero-art">
              <BrandArt />
            </div>
          </div>
          <div className="brand-work-grid mt-20 border-t border-border pt-12">
            <p className="brand-label text-[#813380]">
              Based in Nairobi. Building for everyone.
            </p>
            <p className="brand-copy">
              We work with individuals, teams, educators and organisations. Our
              products are available globally, and our learning programmes bring
              practical, responsible AI into real work.
            </p>
          </div>
        </div>
      </section>
      <section className="brand-section border-y border-border bg-white">
        <div className="brand-container brand-work-grid items-start">
          <div>
            <p className="brand-label text-[#813380]">Our story</p>
            <h2 className="brand-title mt-6">
              A question of
              <br />
              <span className="brand-serif italic">agency.</span>
            </h2>
          </div>
          <div className="brand-copy space-y-5">
            <p>
              Arttribute began by exploring how creative work could be used
              fairly in generative AI. Questions about attribution and
              authorship led us to a wider concern: how do people retain control
              when AI becomes part of their work?
            </p>
            <p>
              That question reaches beyond the arts. It matters to anyone
              working with sensitive information, building new ideas or making
              decisions with AI.
            </p>
            <p>
              Today, we address it through private AI tools, education that
              builds practical judgement, and provenance that makes
              contributions visible. Data, workflows and intellectual property
              all deserve thoughtful treatment.
            </p>
          </div>
        </div>
      </section>
      <section className="brand-section">
        <div className="brand-container">
          <div className="brand-work-grid mb-12">
            <div>
              <p className="brand-label text-[#813380]">
                The Arttribute ecosystem
              </p>
              <h2 className="brand-title mt-5">
                Distinct products.
                <br />
                <span className="brand-serif italic">Shared purpose.</span>
              </h2>
            </div>
            <p className="brand-copy">
              Each part of our work addresses a different need. Together, they
              help people use AI with greater confidence, control and
              accountability.
            </p>
          </div>
          <div className="border-t border-border">
            {PRODUCTS.map((product) => (
              <a
                key={product.key}
                href={product.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-5 border-b border-border py-8 md:grid-cols-[260px_1fr_24px] md:items-center md:gap-10"
              >
                <div className="flex items-center gap-4">
                  <ProductMark product={product.key} />
                  <span>
                    <span className="block text-lg font-medium tracking-tight">
                      {product.name}
                    </span>
                    <span className="mt-1 block text-xs text-[#666b73]">
                      {product.area}
                    </span>
                  </span>
                </div>
                <p className="brand-copy text-sm">{product.summary}</p>
                <ArrowUpRight size={20} className="text-[#813380]" />
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="brand-copy text-sm">
              Also from Arttribute: Common Arcade, where people and AI agents
              build and play together.
            </p>
            <a
              href={LINKS.commonArcade}
              target="_blank"
              rel="noreferrer"
              className="brand-text-link"
            >
              Explore Common Arcade
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
      <Principles />
      <section className="brand-section">
        <div className="brand-container brand-work-grid items-start">
          <div>
            <p className="brand-label text-[#813380]">Research into practice</p>
            <h2 className="brand-title mt-5">
              Thoughtful foundations.
              <br />
              <span className="brand-serif italic">Useful tools.</span>
            </h2>
          </div>
          <div className="brand-copy space-y-5">
            <p>
              Our provenance work grew from research into the governance of
              human and AI-created works, undertaken in the AI for Sustainable
              Societies master’s programme across Tallinn University, Tampere
              University and Lusófona University.
            </p>
            <p>
              That work connects legal analysis with technical design: recording
              the people, tools and actions behind a creation so questions of
              attribution and accountability can be better understood.
            </p>
            <a
              href={LINKS.provenanceKit}
              target="_blank"
              rel="noreferrer"
              className="brand-text-link text-foreground"
            >
              Explore ProvenanceKit
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
