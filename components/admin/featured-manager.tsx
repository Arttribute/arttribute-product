"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Plus, Star, X } from "lucide-react";
import { orderFeaturedAction, setFeaturedAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { EmptyState, IndexChip, List, SectionTitle } from "@/components/ui/surface";
import { formatDate } from "@/lib/format";
import type { PostSummary } from "@/lib/posts";
import { topicLabel } from "@/lib/site";
import { cn } from "@/lib/utils";

export function FeaturedManager({ featured, others }: { featured: PostSummary[]; others: PostSummary[] }) {
  const router = useRouter();
  const [order, setOrder] = useState(featured);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const move = (index: number, delta: -1 | 1) => {
    const next = [...order];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    const previous = order;
    setOrder(next);
    startTransition(async () => {
      const result = await orderFeaturedAction(next.map((p) => p.id));
      if (!result.ok) {
        setOrder(previous);
        setError(result.error);
      }
    });
  };

  const setFeatured = (post: PostSummary, value: boolean) => {
    setError(null);
    startTransition(async () => {
      const result = await setFeaturedAction(post.id, value);
      if (!result.ok) setError(result.error);
      else {
        setOrder((list) => (value ? [...list, post] : list.filter((p) => p.id !== post.id)));
        router.refresh();
      }
    });
  };

  return (
    <div className={cn("space-y-8", pending && "opacity-80")}>
      {error ? <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

      <section>
        <SectionTitle title="In order" info="Use the arrows to change the order. The first three show on the home page." />
        {order.length === 0 ? (
          <EmptyState icon={Star} title="Nothing featured" description="Feature a published post below to pin it to the home page and the blog." />
        ) : (
          <List>
            {order.map((post, index) => (
              <div key={post.id} className="flex items-center gap-3 px-4 py-3">
                <IndexChip value={index + 1} active={index < 3} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{post.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {topicLabel(post.topic)} · {formatDate(post.publishedAt, "short")}
                    {index >= 3 ? " · not shown on the home page" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-stone-500 hover:bg-muted hover:text-stone-950 disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={index === order.length - 1}
                    onClick={() => move(index, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-stone-500 hover:bg-muted hover:text-stone-950 disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove from featured"
                    onClick={() => setFeatured(post, false)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-stone-500 hover:bg-muted hover:text-red-600"
                  >
                    <X className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            ))}
          </List>
        )}
      </section>

      {others.filter((p) => !order.some((o) => o.id === p.id)).length ? (
        <section>
          <SectionTitle title="Other published posts" />
          <List>
            {others
              .filter((p) => !order.some((o) => o.id === p.id))
              .map((post) => (
                <div key={post.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{post.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {topicLabel(post.topic)} · {formatDate(post.publishedAt, "short")}
                    </p>
                  </div>
                  <Button size="sm" icon={Plus} onClick={() => setFeatured(post, true)}>
                    Feature
                  </Button>
                </div>
              ))}
          </List>
        </section>
      ) : null}
    </div>
  );
}
