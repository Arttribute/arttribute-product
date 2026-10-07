const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Nairobi",
});

const SHORT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Africa/Nairobi",
});

export function formatDate(value: string | Date | null | undefined, style: "long" | "short" = "long") {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  return (style === "long" ? DATE : SHORT).format(date);
}

/** Plain text from Markdown, for excerpts and feeds. */
export function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
