import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

const components: Components = {
  a({ href = "", children, ...props }) {
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...props}>
        {children}
      </a>
    );
  },
  img({ src, alt }) {
    if (!src || typeof src !== "string") return null;
    return (
      <span className="my-8 block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} loading="lazy" className="mx-auto my-0 w-full" />
        {alt ? <span className="mt-2 block text-center text-sm text-stone-500">{alt}</span> : null}
      </span>
    );
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto">
        <table>{children}</table>
      </div>
    );
  },
};

/**
 * Renders post Markdown. Raw HTML in the source is not rendered, so a post
 * can never inject script or markup into the page.
 */
export function Markdown({ source, className }: { source: string; className?: string }) {
  return (
    <div className={cn("prose prose-stone prose-arttribute max-w-none text-[17px] leading-8", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
