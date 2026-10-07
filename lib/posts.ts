import "server-only";
import { ObjectId, type Filter } from "mongodb";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { TOPICS, type Topic } from "@/lib/site";

export type PostStatus = "draft" | "published";

type PostDoc = {
  _id: ObjectId;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  topic: Topic;
  authorName: string;
  coverImage: string | null;
  coverAlt: string;
  status: PostStatus;
  featured: boolean;
  featuredRank: number | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: string;
};

/** A post as pages and client components see it: plain, serialisable data. */
export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  topic: Topic;
  authorName: string;
  coverImage: string | null;
  coverAlt: string;
  status: PostStatus;
  featured: boolean;
  featuredRank: number | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  readingMinutes: number;
};

export type PostSummary = Omit<Post, "body">;

export type PostInput = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  topic: Topic;
  authorName: string;
  coverImage: string | null;
  coverAlt: string;
  publishedAt: string | null;
};

const collection = async () => (await getDb()).collection<PostDoc>("posts");

function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function toPost(doc: PostDoc): Post {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    body: doc.body,
    topic: doc.topic,
    authorName: doc.authorName,
    coverImage: doc.coverImage ?? null,
    coverAlt: doc.coverAlt ?? "",
    status: doc.status,
    featured: Boolean(doc.featured),
    featuredRank: doc.featuredRank ?? null,
    publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : null,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
    readingMinutes: readingMinutes(doc.body),
  };
}

function toSummary(doc: PostDoc): PostSummary {
  const { body: _body, ...rest } = toPost(doc);
  void _body;
  return rest;
}

/** Published and not scheduled for later. */
const live = (): Filter<PostDoc> => ({
  status: "published",
  publishedAt: { $ne: null, $lte: new Date() },
});

/**
 * Public reads never take the site down: if the database is missing or
 * unreachable they log and return nothing, and the page renders without
 * the blog sections until the next revalidation.
 */
async function safely<T>(fallback: T, read: () => Promise<T>): Promise<T> {
  if (!isDatabaseConfigured()) return fallback;
  try {
    return await read();
  } catch (error) {
    console.error("[posts] read failed:", error instanceof Error ? error.message : error);
    return fallback;
  }
}

export function listPublishedPosts(topic?: Topic) {
  return safely<PostSummary[]>([], async () => {
    const filter = { ...live(), ...(topic ? { topic } : {}) };
    const docs = await (await collection()).find(filter).sort({ publishedAt: -1 }).toArray();
    return docs.map(toSummary);
  });
}

/** Featured posts in their chosen order, topped up with the latest posts. */
export function listFeaturedPosts(limit = 3) {
  return safely<Post[]>([], async () => {
    const posts = await collection();
    const featured = await posts
      .find({ ...live(), featured: true })
      .sort({ featuredRank: 1, publishedAt: -1 })
      .limit(limit)
      .toArray();
    if (featured.length >= limit) return featured.map(toPost);
    const rest = await posts
      .find({ ...live(), _id: { $nin: featured.map((doc) => doc._id) } })
      .sort({ publishedAt: -1 })
      .limit(limit - featured.length)
      .toArray();
    return [...featured, ...rest].map(toPost);
  });
}

export function getPublishedPost(slug: string) {
  return safely<Post | null>(null, async () => {
    const doc = await (await collection()).findOne({ ...live(), slug });
    return doc ? toPost(doc) : null;
  });
}

export function listPublishedSlugs() {
  return safely<Array<{ slug: string; updatedAt: string }>>([], async () => {
    const docs = await (await collection())
      .find(live(), { projection: { slug: 1, updatedAt: 1 } })
      .toArray();
    return docs.map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt.toISOString() }));
  });
}

export function listRelatedPosts(post: Post, limit = 2) {
  return safely<PostSummary[]>([], async () => {
    const posts = await collection();
    const docs = await posts
      .find({ ...live(), slug: { $ne: post.slug } })
      .sort({ publishedAt: -1 })
      .limit(12)
      .toArray();
    const sameTopic = docs.filter((doc) => doc.topic === post.topic);
    const others = docs.filter((doc) => doc.topic !== post.topic);
    return [...sameTopic, ...others]
      .slice(0, limit)
      .map(toSummary);
  });
}

/* ---------------------------------------------------------------- admin -- */

function objectId(id: string) {
  if (!ObjectId.isValid(id)) throw new Error("Post not found.");
  return new ObjectId(id);
}

export async function adminListPosts() {
  const docs = await (await collection()).find({}).sort({ updatedAt: -1 }).toArray();
  return docs.map(toSummary);
}

export async function adminGetPost(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const doc = await (await collection()).findOne({ _id: new ObjectId(id) });
  return doc ? toPost(doc) : null;
}

export async function adminCreatePost(by: string, authorName: string) {
  const now = new Date();
  const doc: Omit<PostDoc, "_id"> = {
    slug: `untitled-${now.getTime().toString(36)}`,
    title: "",
    excerpt: "",
    body: "",
    topic: "company",
    authorName,
    coverImage: null,
    coverAlt: "",
    status: "draft",
    featured: false,
    featuredRank: null,
    publishedAt: null,
    createdAt: now,
    updatedAt: now,
    updatedBy: by,
  };
  const result = await (await collection()).insertOne(doc as PostDoc);
  return result.insertedId.toHexString();
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

export class PostError extends Error {}

function clean(input: PostInput) {
  const title = input.title.trim().slice(0, 200);
  const slug = slugify(input.slug || title);
  if (!slug) throw new PostError("Add a title or a URL slug.");
  const topic = TOPICS.some((t) => t.value === input.topic) ? input.topic : "company";
  const cover = input.coverImage?.trim() || null;
  if (cover && !/^(\/media\/[a-f0-9]{24}|https:\/\/[^\s]+)$/.test(cover)) {
    throw new PostError("Cover image must be an uploaded image or an https link.");
  }
  let publishedAt: Date | null = null;
  if (input.publishedAt) {
    const date = new Date(input.publishedAt);
    if (Number.isNaN(date.getTime())) throw new PostError("Publish date is not a valid date.");
    publishedAt = date;
  }
  return {
    title,
    slug,
    excerpt: input.excerpt.trim().slice(0, 400),
    body: input.body.slice(0, 200_000),
    topic,
    authorName: input.authorName.trim().slice(0, 80) || "Arttribute",
    coverImage: cover,
    coverAlt: input.coverAlt.trim().slice(0, 200),
    publishedAt,
  };
}

async function assertSlugFree(slug: string, id: ObjectId) {
  const taken = await (await collection()).findOne({ slug, _id: { $ne: id } }, { projection: { _id: 1 } });
  if (taken) throw new PostError(`Another post already uses /blog/${slug}.`);
}

export async function adminSavePost(id: string, input: PostInput, by: string) {
  const _id = objectId(id);
  const data = clean(input);
  await assertSlugFree(data.slug, _id);
  const posts = await collection();
  const existing = await posts.findOne({ _id });
  if (!existing) throw new PostError("Post not found.");
  // A published post always has a date; keep the original if none is given.
  const publishedAt =
    existing.status === "published" ? (data.publishedAt ?? existing.publishedAt ?? new Date()) : data.publishedAt;
  await posts.updateOne({ _id }, { $set: { ...data, publishedAt, updatedAt: new Date(), updatedBy: by } });
  return toPost((await posts.findOne({ _id }))!);
}

export async function adminSetStatus(id: string, status: PostStatus, by: string) {
  const _id = objectId(id);
  const posts = await collection();
  const existing = await posts.findOne({ _id });
  if (!existing) throw new PostError("Post not found.");
  if (status === "published" && !existing.title.trim()) {
    throw new PostError("Give the post a title before publishing.");
  }
  if (status === "published" && !existing.body.trim()) {
    throw new PostError("Write something before publishing.");
  }
  await posts.updateOne(
    { _id },
    {
      $set: {
        status,
        publishedAt: status === "published" ? (existing.publishedAt ?? new Date()) : existing.publishedAt,
        updatedAt: new Date(),
        updatedBy: by,
      },
    },
  );
  return toPost((await posts.findOne({ _id }))!);
}

export async function adminSetFeatured(id: string, featured: boolean, by: string) {
  const _id = objectId(id);
  const posts = await collection();
  let featuredRank: number | null = null;
  if (featured) {
    const last = await posts.find({ featured: true }).sort({ featuredRank: -1 }).limit(1).toArray();
    featuredRank = (last[0]?.featuredRank ?? 0) + 1;
  }
  await posts.updateOne({ _id }, { $set: { featured, featuredRank, updatedAt: new Date(), updatedBy: by } });
}

/** Rewrites featured ranks in the order given. Ids not listed lose their place. */
export async function adminOrderFeatured(ids: string[], by: string) {
  const posts = await collection();
  const order = ids.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
  await posts.bulkWrite(
    order.map((_id, index) => ({
      updateOne: { filter: { _id, featured: true }, update: { $set: { featuredRank: index + 1, updatedBy: by } } },
    })),
  );
}

export async function adminDeletePost(id: string) {
  await (await collection()).deleteOne({ _id: objectId(id) });
}
