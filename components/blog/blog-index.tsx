"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { PostRow } from "@/components/blog/post-card";
import type { PostSummary } from "@/lib/posts";
import { TOPICS } from "@/lib/site";
import { cn } from "@/lib/utils";

type Filter = "all" | (typeof TOPICS)[number]["value"];

/**
 * The full list of posts with topic filters. Filtering happens in the page so
 * the list stays statically rendered; the chosen topic lives in the URL.
 */
export function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const param = useSearchParams().get("topic");
  const topic: Filter = TOPICS.some((t) => t.value === param)
    ? (param as Filter)
    : "all";

  const choose = (value: Filter) => {
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("topic");
    else url.searchParams.set("topic", value);
    window.history.replaceState(null, "", url);
  };

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((post) =>
      map.set(post.topic, (map.get(post.topic) ?? 0) + 1),
    );
    return map;
  }, [posts]);

  const visible =
    topic === "all" ? posts : posts.filter((post) => post.topic === topic);
  const filters = [
    { value: "all" as Filter, label: "All", count: posts.length },
    ...TOPICS.filter((t) => counts.get(t.value)).map((t) => ({
      value: t.value as Filter,
      label: t.label,
      count: counts.get(t.value) ?? 0,
    })),
  ];

  return (
    <div>
      <div role="tablist" aria-label="Topics" className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            role="tab"
            aria-selected={topic === filter.value}
            onClick={() => choose(filter.value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-sm border px-3 text-sm transition-colors",
              topic === filter.value
                ? "border-foreground bg-foreground text-white"
                : "border-border bg-white text-stone-600 hover:border-stone-300 hover:text-stone-950",
            )}
          >
            {filter.label}
            <span
              className={cn(
                "text-xs",
                topic === filter.value ? "text-stone-300" : "text-stone-400",
              )}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 divide-y divide-border border-t border-border">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <PostRow post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
        {visible.length === 0 ? (
          <p className="py-10 text-sm text-stone-500">
            No posts on this topic yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
