import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Markdown } from "@/components/blog/markdown";
import { PostCard, PostMeta } from "@/components/blog/post-card";
import { PostCover } from "@/components/blog/post-cover";
import { ShareLinks } from "@/components/blog/share-links";
import { ProductMark } from "@/components/site/product-mark";
import { getPublishedPost, listPublishedSlugs, listRelatedPosts } from "@/lib/posts";
import { LINKS, SITE, type Topic } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listPublishedSlugs()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Post not found" };
  const images = post.coverImage ? [{ url: post.coverImage, alt: post.coverAlt || post.title }] : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.authorName }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      ...(images ? { images } : {}),
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

const NEXT_STEP: Record<Topic, { product: "agent-commons" | "commonlab" | "provenancekit"; title: string; body: string; label: string; href: string }> = {
  "private-ai": {
    product: "agent-commons",
    title: "Try private AI on your own computer",
    body: "Download the Agent Commons desktop preview, switch off your Wi-Fi, and keep working.",
    label: "Get Agent Commons",
    href: LINKS.download,
  },
  "ai-literacy": {
    product: "commonlab",
    title: "Bring practical AI skills to your team",
    body: "Workshops and courses for leaders, teams, educators and students.",
    label: "Explore CommonLab",
    href: LINKS.commonLab,
  },
  provenance: {
    product: "provenancekit",
    title: "Record how work is made",
    body: "Open-source provenance for human and AI created work.",
    label: "Visit ProvenanceKit",
    href: LINKS.provenanceKit,
  },
  company: {
    product: "agent-commons",
    title: "Try private AI on your own computer",
    body: "Download the Agent Commons desktop preview, switch off your Wi-Fi, and keep working.",
    label: "Get Agent Commons",
    href: LINKS.download,
  },
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const related = await listRelatedPosts(post, 2);
  const url = `${SITE.url}/blog/${post.slug}`;
  const next = NEXT_STEP[post.topic] ?? NEXT_STEP.company;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": post.authorName === "Arttribute" ? "Organization" : "Person", name: post.authorName },
    publisher: { "@type": "Organization", name: "Arttribute", url: SITE.url },
    mainEntityOfPage: url,
    ...(post.coverImage ? { image: post.coverImage.startsWith("/") ? `${SITE.url}${post.coverImage}` : post.coverImage } : {}),
  };

  return (
    <article className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-stone-950"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          Blog
        </Link>
        <div className="animate-rise">
          <PostMeta post={post} className="mt-10" />
          <h1 className="mt-4 text-[2.25rem] font-medium leading-[1.08] tracking-[-0.04em] text-stone-950 sm:text-[3rem]">
            {post.title}
          </h1>
          {post.excerpt ? <p className="mt-5 text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">{post.excerpt}</p> : null}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-sm font-medium text-pink-900">
                {post.authorName.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-medium text-stone-900">{post.authorName}</p>
                <p className="text-xs text-stone-500">Arttribute</p>
              </div>
            </div>
            <ShareLinks url={url} title={post.title} />
          </div>
        </div>
      </header>

      {post.coverImage ? (
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
          <PostCover
            image={post.coverImage}
            alt={post.coverAlt}
            topic={post.topic}
            priority
            className="aspect-[16/9] rounded-2xl border border-border"
          />
        </div>
      ) : null}

      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
        <Markdown source={post.body} />

        <aside className="mt-14 flex flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <ProductMark product={next.product} />
            <div>
              <p className="text-[15px] font-medium text-stone-950">{next.title}</p>
              <p className="mt-0.5 text-sm text-stone-600">{next.body}</p>
            </div>
          </div>
          <a
            href={next.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 shrink-0 items-center gap-1.5 self-start rounded-lg bg-stone-900 px-3.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 sm:self-auto"
          >
            {next.label}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </aside>
      </div>

      {related.length ? (
        <section aria-labelledby="keep-reading" className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
          <h2 id="keep-reading" className="text-sm font-medium text-stone-900">
            Keep reading
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
