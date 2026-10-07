import { formatDate } from "@/lib/format";
import { OG_SIZE, renderOg } from "@/lib/og";
import { getPublishedPost } from "@/lib/posts";
import { topicLabel } from "@/lib/site";

export const alt = "Arttribute blog post";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 300;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) {
    return renderOg({ eyebrow: "Blog", title: "Notes on private, fair and transparent AI." });
  }
  return renderOg({
    eyebrow: `Blog · ${topicLabel(post.topic)}`,
    title: post.title,
    footer: [post.authorName, formatDate(post.publishedAt)].filter(Boolean).join(" · "),
  });
}
