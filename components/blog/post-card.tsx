import Link from "next/link";
import { PostCover } from "@/components/blog/post-cover";
import { formatDate } from "@/lib/format";
import type { PostSummary } from "@/lib/posts";
import { topicLabel } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PostMeta({ post, className }: { post: Pick<PostSummary, "publishedAt" | "readingMinutes" | "topic">; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 text-[13px] text-stone-500", className)}>
      <span className="text-stone-700">{topicLabel(post.topic)}</span>
      <span aria-hidden>·</span>
      <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden>·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

/** The large card that leads a set of posts. */
export function LeadPostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid h-full overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 hover:shadow-floating md:grid-cols-[1.15fr_1fr]"
    >
      <PostCover
        image={post.coverImage}
        alt={post.coverAlt}
        topic={post.topic}
        size="lg"
        priority
        className="aspect-[16/9] md:aspect-auto md:min-h-80"
      />
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <PostMeta post={post} />
        <h3 className="mt-3 text-2xl font-medium leading-[1.2] tracking-[-0.03em] text-stone-950 decoration-pink-300 decoration-[1.5px] underline-offset-[5px] group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-stone-600">{post.excerpt}</p>
        <p className="mt-6 text-sm text-stone-500">{post.authorName}</p>
      </div>
    </Link>
  );
}

/** A compact card for the rest of a set. */
export function PostCard({ post, showCover = true }: { post: PostSummary; showCover?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 hover:shadow-floating"
    >
      {showCover ? (
        <PostCover image={post.coverImage} alt={post.coverAlt} topic={post.topic} className="aspect-[16/8]" />
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <PostMeta post={post} />
        <h3 className="mt-2.5 text-[17px] font-medium leading-snug tracking-[-0.02em] text-stone-950 decoration-pink-300 decoration-[1.5px] underline-offset-4 group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{post.excerpt}</p>
      </div>
    </Link>
  );
}

/** A row in the full list of posts. */
export function PostRow({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-4 py-7 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8"
    >
      <PostCover
        image={post.coverImage}
        alt={post.coverAlt}
        topic={post.topic}
        className="aspect-[16/9] rounded-xl border border-border"
      />
      <div className="min-w-0">
        <PostMeta post={post} />
        <h3 className="mt-2 text-xl font-medium leading-snug tracking-[-0.025em] text-stone-950 decoration-pink-300 decoration-[1.5px] underline-offset-4 group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-7 text-stone-600">{post.excerpt}</p>
      </div>
    </Link>
  );
}
