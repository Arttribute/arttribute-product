import type { Metadata } from "next";
import { FeaturedManager } from "@/components/admin/featured-manager";
import { PageHeader } from "@/components/ui/surface";
import { adminListPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Featured" };

export default async function FeaturedPage() {
  const posts = (await adminListPosts()).filter((post) => post.status === "published");
  const featured = posts
    .filter((post) => post.featured)
    .sort((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999));
  const others = posts
    .filter((post) => !post.featured)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

  return (
    <>
      <PageHeader
        title="Featured"
        info="The first featured post leads the home page and the blog, and the next two sit beside it. If fewer than three are featured, the newest posts fill the gaps on the home page."
      />
      <FeaturedManager featured={featured} others={others} />
    </>
  );
}
