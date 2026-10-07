import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import type { PostSummary } from "@/lib/posts";

export function FeaturedWriting({ posts }: { posts: PostSummary[] }) {
  if (!posts.length) return null;
  return (
    <section className="brand-section">
      <div className="brand-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="brand-label text-[#813380]">The Arttribute journal</p>
            <h2 className="brand-title mt-5">
              Ideas,{" "}
              <span className="brand-serif italic">put into practice.</span>
            </h2>
          </div>
          <Link href="/blog" className="brand-text-link">
            Explore the journal
            <ArrowUpRight />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
