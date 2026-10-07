import "server-only";
import { MongoClient, type Db } from "mongodb";
import { SEED_POSTS } from "@/lib/seed-posts";

/**
 * MongoDB access for the site. One client per server process, reused across
 * requests and hot reloads. The first connection creates indexes and seeds
 * the opening posts once; deleting them later never brings them back.
 */

type Cache = { client?: Promise<MongoClient>; setup?: Promise<void> };
const cache = globalThis as typeof globalThis & { __arttributeMongo?: Cache };
const state: Cache = (cache.__arttributeMongo ??= {});

export function isDatabaseConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set.");
  state.client ??= new MongoClient(uri, {
    appName: "arttribute-site",
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 8000,
  })
    .connect()
    .catch((error) => {
      state.client = undefined;
      throw error;
    });
  return state.client;
}

export async function getDb(): Promise<Db> {
  const client = await connect();
  const db = client.db(process.env.MONGODB_DB ?? "arttribute");
  state.setup ??= setup(db).catch((error) => {
    state.setup = undefined;
    throw error;
  });
  await state.setup;
  return db;
}

async function setup(db: Db) {
  const posts = db.collection("posts");
  await Promise.all([
    posts.createIndex({ slug: 1 }, { unique: true }),
    posts.createIndex({ status: 1, publishedAt: -1 }),
    posts.createIndex({ featured: 1, featuredRank: 1 }),
  ]);

  // The marker is written first so two cold starts cannot both seed.
  const meta = db.collection<{ _id: string; at: Date }>("meta");
  const marker = await meta.updateOne(
    { _id: "seed:v1" },
    { $setOnInsert: { at: new Date() } },
    { upsert: true },
  );
  if (marker.upsertedCount === 1 && (await posts.countDocuments()) === 0) {
    const now = Date.now();
    await posts.insertMany(
      SEED_POSTS.map((post, index) => {
        // Stagger by a minute so the opening posts keep their intended order.
        const at = new Date(now - index * 60_000);
        return { ...post, publishedAt: at, createdAt: at, updatedAt: at, updatedBy: "seed" };
      }),
    );
  }
}
