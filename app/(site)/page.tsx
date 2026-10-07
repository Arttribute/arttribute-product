import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/closing-cta";
import { FeaturedWriting } from "@/components/home/featured-writing";
import { Hero } from "@/components/home/hero";
import { Literacy } from "@/components/home/literacy";
import { Pillars } from "@/components/home/pillars";
import { Principles } from "@/components/home/principles";
import { PrivateAi } from "@/components/home/private-ai";
import { Provenance } from "@/components/home/provenance";
import { listFeaturedPosts } from "@/lib/posts";

export const revalidate = 300;
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function HomePage() {
  const featured = await listFeaturedPosts(3);
  return (
    <>
      <Hero />
      <Pillars />
      <section id="work" className="brand-section">
        <div className="brand-container">
          <div className="brand-work-grid mb-12">
            <div>
              <p className="brand-label text-[#813380]">Our work</p>
              <h2 className="brand-title mt-5">
                Built for a more
                <br />
                <span className="brand-serif italic">human future.</span>
              </h2>
            </div>
            <p className="brand-copy max-w-lg">
              Useful AI needs more than capable models. It needs tools you
              control, people who know how to use them, and a clear record of
              the work. This is where we focus.
            </p>
          </div>
          <PrivateAi />
          <div className="brand-two-up">
            <Literacy />
            <Provenance />
          </div>
        </div>
      </section>
      <Principles />
      <FeaturedWriting posts={featured} />
      <ClosingCta />
    </>
  );
}
