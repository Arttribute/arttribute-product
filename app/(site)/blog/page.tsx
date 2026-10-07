import type { Metadata } from "next";
import { Suspense } from "react";
import { Rss } from "lucide-react";
import { BlogIndex } from "@/components/blog/blog-index";
import { LeadPostCard, PostCard, PostRow } from "@/components/blog/post-card";
import { Reveal } from "@/components/site/reveal";
import { Hl } from "@/components/site/section";
import { listFeaturedPosts, listPublishedPosts } from "@/lib/posts";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from Arttribute on private AI, AI literacy, provenance and responsible use of AI.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const [featured, posts] = await Promise.all([
    listFeaturedPosts(3).then((list) => list.filter((post) => post.featured)),
    listPublishedPosts(),
  ]);
  const [lead, ...side] = featured;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="animate-rise">
          <h1 className="text-[2.5rem] font-medium leading-[1.05] tracking-[-0.045em] text-stone-950 sm:text-[3.5rem]">
            The <Hl>blog</Hl>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-stone-600">
            Notes on private AI, AI literacy, provenance and using AI responsibly.
          </p>
        </div>
        <a
          href="/blog/rss.xml"
          className="inline-flex h-9 items-center gap-2 self-start rounded-lg border border-border bg-white px-3 text-sm text-stone-700 shadow-card transition-colors hover:bg-muted sm:self-auto"
        >
          <Rss className="h-4 w-4" strokeWidth={1.75} />
          RSS
        </a>
      </header>

      {lead ? (
        <section aria-labelledby="featured" className="mt-14">
          <h2 id="featured" className="text-sm font-medium text-stone-900">
            Featured
          </h2>
          <Reveal className="mt-4">
            <LeadPostCard post={lead} />
          </Reveal>
          {side.length ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {side.map((post, index) => (
                <Reveal key={post.id} delay={0.06 * (index + 1)} className="h-full">
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <section aria-labelledby="all-posts" className="mt-16">
        <h2 id="all-posts" className="mb-4 text-sm font-medium text-stone-900">
          All posts
        </h2>
        {posts.length ? (
          // The filters read the URL in the browser; the static page ships the full list.
          <Suspense
            fallback={
              <div className="mt-12 divide-y divide-border border-t border-border">
                {posts.map((post) => (
                  <PostRow key={post.id} post={post} />
                ))}
              </div>
            }
          >
            <BlogIndex posts={posts} />
          </Suspense>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-white px-6 py-14 text-center text-sm text-stone-500">
            The first posts are on their way.
          </p>
        )}
      </section>
    </div>
  );
}
