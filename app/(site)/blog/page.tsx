import type { Metadata } from "next";
import { Suspense } from "react";
import { Rss } from "lucide-react";
import { BlogIndex } from "@/components/blog/blog-index";
import { LeadPostCard, PostCard, PostRow } from "@/components/blog/post-card";
import { listFeaturedPosts, listPublishedPosts } from "@/lib/posts";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Journal",
  description:
    "Ideas and field notes from Arttribute on private AI, practical learning and transparent creation.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [featured, posts] = await Promise.all([
    listFeaturedPosts(3).then((list) => list.filter((post) => post.featured)),
    listPublishedPosts(),
  ]);
  const [lead, ...side] = featured;
  return (
    <div className="brand-container brand-section">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-12">
        <div>
          <p className="brand-label text-[#813380]">The Arttribute journal</p>
          <h1 className="brand-title mt-6 text-[clamp(44px,6vw,80px)]">
            Ideas,{" "}
            <span className="brand-serif italic">put into practice.</span>
          </h1>
          <p className="brand-copy mt-6 max-w-xl">
            What we are building, what we are learning, and how AI can serve
            people better.
          </p>
        </div>
        <a href="/blog/rss.xml" className="brand-text-link">
          <Rss size={16} />
          Subscribe via RSS
        </a>
      </header>
      {lead ? (
        <section aria-labelledby="featured" className="mt-12">
          <h2 id="featured" className="brand-label mb-6 text-[#666b73]">
            Featured stories
          </h2>
          <LeadPostCard post={lead} />
          {side.length ? (
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {side.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
      <section aria-labelledby="all-posts" className="mt-16">
        <h2 id="all-posts" className="brand-label mb-6 text-[#666b73]">
          All stories
        </h2>
        {posts.length ? (
          <Suspense
            fallback={
              <div className="divide-y divide-border border-t border-border">
                {posts.map((post) => (
                  <PostRow key={post.id} post={post} />
                ))}
              </div>
            }
          >
            <BlogIndex posts={posts} />
          </Suspense>
        ) : (
          <p className="brand-copy border-y border-border py-12">
            Our first stories are on their way. Come back for notes from our
            work in private AI, education and provenance.
          </p>
        )}
      </section>
    </div>
  );
}
