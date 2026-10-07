import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostCover } from "@/components/blog/post-cover";
import { formatDate } from "@/lib/format";
import type { PostSummary } from "@/lib/posts";
import { topicLabel } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PostMeta({
  post,
  className,
}: {
  post: Pick<PostSummary, "publishedAt" | "readingMinutes" | "topic">;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#666b73]",
        className,
      )}
    >
      <span className="font-medium text-[#813380]">
        {topicLabel(post.topic)}
      </span>
      <span aria-hidden="true">/</span>
      <time dateTime={post.publishedAt ?? undefined}>
        {formatDate(post.publishedAt)}
      </time>
      <span aria-hidden="true">/</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}
export function LeadPostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="journal-card journal-lead group"
    >
      <PostCover
        image={post.coverImage}
        alt={post.coverAlt}
        topic={post.topic}
        priority
        className="aspect-[4/3] rounded-sm"
      />
      <div className="py-4 md:pr-6">
        <PostMeta post={post} />
        <h3 className="mt-5">{post.title}</h3>
        <p className="brand-copy mt-5 line-clamp-3">{post.excerpt}</p>
        <span className="brand-text-link mt-6">
          Read the story
          <ArrowUpRight />
        </span>
      </div>
    </Link>
  );
}
export function PostCard({
  post,
  showCover = true,
}: {
  post: PostSummary;
  showCover?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="journal-card group flex">
      {showCover ? (
        <PostCover
          image={post.coverImage}
          alt={post.coverAlt}
          topic={post.topic}
          className="mb-5 aspect-[16/10] rounded-sm"
        />
      ) : null}
      <PostMeta post={post} />
      <h3 className="mt-3">{post.title}</h3>
      <p className="brand-copy mt-3 line-clamp-2 text-sm">{post.excerpt}</p>
      <span className="brand-text-link mt-4">
        Read story
        <ArrowUpRight />
      </span>
    </Link>
  );
}
export function PostRow({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="journal-card group grid gap-5 py-8 sm:grid-cols-[220px_1fr] sm:gap-8"
    >
      <PostCover
        image={post.coverImage}
        alt={post.coverAlt}
        topic={post.topic}
        className="aspect-[16/10] rounded-sm"
      />
      <div>
        <PostMeta post={post} />
        <h3 className="mt-3">{post.title}</h3>
        <p className="brand-copy mt-3 line-clamp-2 text-sm">{post.excerpt}</p>
      </div>
    </Link>
  );
}
