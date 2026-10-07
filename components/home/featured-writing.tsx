import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/site/reveal";
import { Hl, Section, SectionHeading } from "@/components/site/section";
import type { PostSummary } from "@/lib/posts";

export function FeaturedWriting({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <SectionHeading
            eyebrow="From the blog"
            title={
              <>
                Notes on <Hl>sovereign AI</Hl>.
              </>
            }
          />
        </Reveal>
        <Reveal delay={0.05}>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-stone-900"
          >
            All posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
          </Link>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.id} delay={0.06 * index} className="h-full">
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
