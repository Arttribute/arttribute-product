import type { Metadata } from "next";
import { FileText, Plus, Star } from "lucide-react";
import { createPostAction } from "@/app/admin/actions";
import { PostStatusBadge } from "@/components/admin/post-status";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EmptyState, List, ListRow, PageHeader } from "@/components/ui/surface";
import { formatDate } from "@/lib/format";
import { adminListPosts, type PostSummary } from "@/lib/posts";
import { topicLabel } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Posts" };

const TABS = ["all", "published", "drafts"] as const;
type Tab = (typeof TABS)[number];

function isLive(post: PostSummary) {
  return post.status === "published" && post.publishedAt !== null && new Date(post.publishedAt) <= new Date();
}

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab: raw } = await searchParams;
  const tab: Tab = TABS.includes(raw as Tab) ? (raw as Tab) : "all";
  const posts = await adminListPosts();
  const shown = posts.filter((post) =>
    tab === "published" ? post.status === "published" : tab === "drafts" ? post.status === "draft" : true,
  );
  const count = (status: "published" | "draft") => posts.filter((p) => p.status === status).length;

  const newPost = (
    <form action={createPostAction}>
      <Button type="submit" variant="primary" icon={Plus}>
        New post
      </Button>
    </form>
  );

  return (
    <>
      <PageHeader
        title="Posts"
        info="Published posts appear on the blog. Featured posts also appear on the home page, in the order set under Featured."
        actions={newPost}
      />

      <nav aria-label="Post status" className="mb-5 flex items-center gap-1 overflow-x-auto border-b border-border">
        {[
          { value: "all", href: "/admin", label: "All", count: posts.length },
          { value: "published", href: "/admin?tab=published", label: "Published", count: count("published") },
          { value: "drafts", href: "/admin?tab=drafts", label: "Drafts", count: count("draft") },
        ].map((item) => (
          <Link
            key={item.value}
            href={item.href}
            aria-current={tab === item.value ? "page" : undefined}
            className={cn(
              "relative flex h-10 shrink-0 items-center gap-2 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground",
              tab === item.value &&
                "font-medium text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-foreground",
            )}
          >
            {item.label}
            <span className="rounded-full bg-muted px-1.5 text-[11px] font-medium text-muted-foreground">{item.count}</span>
          </Link>
        ))}
      </nav>

      {shown.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={tab === "drafts" ? "No drafts" : tab === "published" ? "Nothing published yet" : "No posts yet"}
          description="Posts are written in Markdown and can be saved as drafts until they are ready."
          action={newPost}
        />
      ) : (
        <List>
          {shown.map((post) => (
            <ListRow
              key={post.id}
              href={`/admin/posts/${post.id}`}
              leading={
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border bg-page text-stone-400">
                  {post.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.coverImage} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <FileText className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </span>
              }
              title={post.title || "Untitled post"}
              meta={[
                topicLabel(post.topic),
                post.status === "published" && post.publishedAt
                  ? `${isLive(post) ? "Published" : "Scheduled for"} ${formatDate(post.publishedAt, "short")}`
                  : `Edited ${formatDate(post.updatedAt, "short")}`,
              ].join(" · ")}
              trailing={
                <>
                  {post.featured ? (
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={1.5} aria-label="Featured" />
                  ) : null}
                  <PostStatusBadge status={post.status} publishedAt={post.publishedAt} />
                </>
              }
            />
          ))}
        </List>
      )}
    </>
  );
}
