"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  PostError,
  adminCreatePost,
  adminDeletePost,
  adminOrderFeatured,
  adminSavePost,
  adminSetFeatured,
  adminSetStatus,
  type Post,
  type PostInput,
  type PostStatus,
} from "@/lib/posts";
import { AdminError, requireAdmin } from "@/lib/session";

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

/** Runs an admin mutation: checks the session, reports errors plainly, refreshes the public site. */
async function run<T>(work: (admin: Awaited<ReturnType<typeof requireAdmin>>) => Promise<T>): Promise<ActionResult<T>> {
  try {
    const admin = await requireAdmin();
    const data = await work(admin);
    revalidatePath("/", "layout");
    return { ok: true, data };
  } catch (error) {
    if (error instanceof AdminError || error instanceof PostError) return { ok: false, error: error.message };
    console.error("[admin] action failed:", error);
    return { ok: false, error: "Something went wrong. Your changes are still here; try again." };
  }
}

export async function createPostAction() {
  const admin = await requireAdmin();
  const id = await adminCreatePost(admin.sub, admin.name);
  redirect(`/admin/posts/${id}`);
}

export async function savePostAction(id: string, input: PostInput): Promise<ActionResult<Post>> {
  return run((admin) => adminSavePost(id, input, admin.sub));
}

/** Saves the latest edits, then changes the status, so publishing never ships a stale draft. */
export async function saveAndSetStatusAction(
  id: string,
  input: PostInput,
  status: PostStatus,
): Promise<ActionResult<Post>> {
  return run(async (admin) => {
    await adminSavePost(id, input, admin.sub);
    return adminSetStatus(id, status, admin.sub);
  });
}

export async function setFeaturedAction(id: string, featured: boolean): Promise<ActionResult> {
  return run(async (admin) => {
    await adminSetFeatured(id, featured, admin.sub);
    return undefined;
  });
}

export async function orderFeaturedAction(ids: string[]): Promise<ActionResult> {
  return run(async (admin) => {
    await adminOrderFeatured(ids, admin.sub);
    return undefined;
  });
}

export async function deletePostAction(id: string): Promise<ActionResult> {
  const result = await run(async () => {
    await adminDeletePost(id);
    return undefined;
  });
  if (result.ok) redirect("/admin");
  return result;
}
