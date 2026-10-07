import { ClosingCta } from "@/components/home/closing-cta";
import { FeaturedWriting } from "@/components/home/featured-writing";
import { Hero } from "@/components/home/hero";
import { Literacy } from "@/components/home/literacy";
import { Pillars } from "@/components/home/pillars";
import { Principles } from "@/components/home/principles";
import { PrivateAi } from "@/components/home/private-ai";
import { Provenance } from "@/components/home/provenance";
import { listFeaturedPosts } from "@/lib/posts";

// Posts change from the admin console, which revalidates on save. The timer
// is a backstop for scheduled posts reaching their publish date.
export const revalidate = 300;

export default async function HomePage() {
  const featured = await listFeaturedPosts(3);
  const lead = featured[0];

  return (
    <>
      <Hero announcement={lead ? { href: `/blog/${lead.slug}`, label: lead.title } : null} />
      <Pillars />
      <PrivateAi />
      <Literacy />
      <Provenance />
      <Principles />
      <FeaturedWriting posts={featured} />
      <ClosingCta />
    </>
  );
}
