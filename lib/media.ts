import "server-only";
import { Binary, ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

/**
 * Images for posts live next to the posts. Each upload is immutable and
 * served from /media/<id> with a year-long cache, so the database is read
 * once per image per edge location.
 */

export const MEDIA_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"] as const;
/** Vercel caps request bodies at 4.5 MB; stay under it with room for headers. */
export const MEDIA_MAX_BYTES = 4 * 1024 * 1024;

type MediaDoc = {
  _id: ObjectId;
  filename: string;
  contentType: string;
  size: number;
  data: Binary;
  createdAt: Date;
  createdBy: string;
};

const collection = async () => (await getDb()).collection<MediaDoc>("media");

export async function saveMedia(input: { bytes: Uint8Array; contentType: string; filename: string; by: string }) {
  const result = await (await collection()).insertOne({
    _id: new ObjectId(),
    filename: input.filename.slice(0, 200),
    contentType: input.contentType,
    size: input.bytes.byteLength,
    data: new Binary(input.bytes),
    createdAt: new Date(),
    createdBy: input.by,
  });
  return `/media/${result.insertedId.toHexString()}`;
}

export async function getMedia(id: string) {
  if (!/^[a-f0-9]{24}$/.test(id)) return null;
  const doc = await (await collection()).findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return { contentType: doc.contentType, bytes: doc.data.buffer, size: doc.size };
}

/** Checks the file's leading bytes so a renamed file cannot pose as an image. */
export function sniffImageType(bytes: Uint8Array): (typeof MEDIA_TYPES)[number] | null {
  const starts = (...sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (starts(0x89, 0x50, 0x4e, 0x47)) return "image/png";
  if (starts(0xff, 0xd8, 0xff)) return "image/jpeg";
  if (starts(0x47, 0x49, 0x46, 0x38)) return "image/gif";
  if (starts(0x52, 0x49, 0x46, 0x46) && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return "image/webp";
  }
  const brand = String.fromCharCode(...bytes.slice(4, 12));
  if (brand.startsWith("ftypavif") || brand.startsWith("ftypavis")) return "image/avif";
  return null;
}
