"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const items = [
    { label: "Share on LinkedIn", short: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Share on X", short: "X", href: `https://x.com/intent/post?url=${enc(url)}&text=${enc(title)}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            window.prompt("Copy this link", url);
          }
        }}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-white px-2.5 text-xs text-stone-700 shadow-card transition-colors hover:bg-muted"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2} /> : <Link2 className="h-3.5 w-3.5" strokeWidth={1.75} />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      {items.map((item) => (
        <a
          key={item.short}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          className="inline-flex h-8 items-center rounded-lg border border-border bg-white px-2.5 text-xs text-stone-700 shadow-card transition-colors hover:bg-muted"
        >
          {item.short}
        </a>
      ))}
    </div>
  );
}
