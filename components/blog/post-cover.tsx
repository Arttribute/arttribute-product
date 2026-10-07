import { CubeMark } from "@/components/site/logo";
import { topicLabel, type Topic } from "@/lib/site";
import { cn } from "@/lib/utils";

const WASH: Record<Topic, { bg: string; glow: string }> = {
  "private-ai": { bg: "bg-pink-50", glow: "bg-pink-200/70" },
  "ai-literacy": { bg: "bg-indigo-50", glow: "bg-indigo-200/70" },
  provenance: { bg: "bg-fuchsia-50", glow: "bg-fuchsia-200/60" },
  company: { bg: "bg-stone-100", glow: "bg-stone-300/60" },
};

/**
 * A post's cover image, or a quiet generated cover in its topic's color when
 * there is none, so lists never show an empty box.
 */
export function PostCover({
  image,
  alt,
  topic,
  className,
  priority,
  size = "md",
}: {
  image: string | null;
  alt?: string;
  topic: Topic;
  className?: string;
  priority?: boolean;
  size?: "md" | "lg";
}) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-stone-100", className)}>
        {/* Covers come from /media or any https host, so a plain img keeps them unrestricted. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt ?? ""}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
  const wash = WASH[topic] ?? WASH.company;
  return (
    <div aria-hidden className={cn("relative overflow-hidden", wash.bg, className)}>
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div className={cn("absolute left-1/2 top-1/2 h-2/3 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl", wash.glow)} />
      {/* Concentric rings around the cube, sized to the cover's height. */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1.7, 1.25, 0.82].map((scale) => (
          <span
            key={scale}
            className="absolute aspect-square rounded-full border border-white/80 bg-white/10"
            style={{ height: `${scale * 50}%` }}
          />
        ))}
        <CubeMark className={cn("relative drop-shadow-sm", size === "lg" ? "h-16" : "h-10")} />
      </div>
      <span
        className={cn(
          "absolute left-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-xs text-stone-700 backdrop-blur",
          size === "lg" && "left-6 top-6",
        )}
      >
        {topicLabel(topic)}
      </span>
    </div>
  );
}
