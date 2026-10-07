import { NextResponse, type NextRequest } from "next/server";
import { MEDIA_MAX_BYTES, saveMedia, sniffImageType } from "@/lib/media";
import { AdminError, requireAdmin } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("origin") !== request.nextUrl.origin) {
      return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
    }
    const admin = await requireAdmin();
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    if (file.size > MEDIA_MAX_BYTES) {
      return NextResponse.json({ error: "Images must be 4 MB or smaller." }, { status: 413 });
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    const contentType = sniffImageType(bytes);
    if (!contentType) {
      return NextResponse.json({ error: "Use a PNG, JPEG, WebP, GIF or AVIF image." }, { status: 415 });
    }
    const url = await saveMedia({ bytes, contentType, filename: file.name, by: admin.sub });
    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof AdminError) return NextResponse.json({ error: error.message }, { status: 401 });
    console.error("[media] upload failed:", error);
    return NextResponse.json({ error: "Upload failed. Try again." }, { status: 500 });
  }
}
