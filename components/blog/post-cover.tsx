import { BrandArt } from "@/components/home/brand-art";
import type { Topic } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PostCover({
  image,
  alt,
  topic,
  className,
  priority,
}: {
  image: string | null;
  alt?: string;
  topic: Topic;
  className?: string;
  priority?: boolean;
  size?: "md" | "lg";
}) {
  if (image)
    return (
      <div
        className={cn(
          "journal-cover relative overflow-hidden bg-[#efedf0]",
          className,
        )}
      >
        {/* CMS covers can use any HTTPS host. */}
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
  return (
    <div
      aria-hidden="true"
      className={cn(
        "journal-cover relative overflow-hidden",
        topic === "private-ai"
          ? "bg-[#172438]"
          : topic === "ai-literacy"
            ? "bg-[#eeecf4]"
            : topic === "provenance"
              ? "bg-[#f3e9ee]"
              : "bg-[#efedf0]",
        className,
      )}
    >
      <div className="absolute inset-0">
        <BrandArt
          variant={
            topic === "private-ai"
              ? "private"
              : topic === "ai-literacy"
                ? "learning"
                : topic === "provenance"
                  ? "provenance"
                  : "hero"
          }
        />
      </div>
    </div>
  );
}
