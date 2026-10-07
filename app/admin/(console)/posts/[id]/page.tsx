import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import { adminGetPost } from "@/lib/posts";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await adminGetPost(id);
  if (!post) notFound();
  return <PostEditor key={post.id} initial={post} />;
}
