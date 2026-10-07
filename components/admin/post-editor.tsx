"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowLeft,
  Bold,
  Code,
  ExternalLink,
  Heading2,
  ImagePlus,
  Italic,
  Link2,
  List as ListIcon,
  ListOrdered,
  LoaderCircle,
  Quote,
  Settings2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  deletePostAction,
  saveAndSetStatusAction,
  savePostAction,
  setFeaturedAction,
} from "@/app/admin/actions";
import { PostStatusBadge } from "@/components/admin/post-status";
import { Markdown } from "@/components/blog/markdown";
import { PostCover } from "@/components/blog/post-cover";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Field, Input, Select, SwitchRow } from "@/components/ui/field";
import { Segmented } from "@/components/ui/tabs";
import type { Post, PostInput } from "@/lib/posts";
import { TOPICS, type Topic } from "@/lib/site";
import { cn } from "@/lib/utils";

type Form = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  topic: Topic;
  authorName: string;
  coverImage: string;
  coverAlt: string;
  publishedAt: string; // datetime-local value, in the editor's time zone
};

const pad = (n: number) => String(n).padStart(2, "0");
function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

function fromPost(post: Post): Form {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body,
    topic: post.topic,
    authorName: post.authorName,
    coverImage: post.coverImage ?? "",
    coverAlt: post.coverAlt,
    publishedAt: toLocalInput(post.publishedAt),
  };
}

function toInput(form: Form): PostInput {
  return {
    ...form,
    coverImage: form.coverImage || null,
    publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
  };
}

async function uploadImage(file: File): Promise<string> {
  const data = new FormData();
  data.append("file", file);
  const response = await fetch("/api/admin/media", { method: "POST", body: data });
  const json = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!response.ok || !json.url) throw new Error(json.error ?? "Upload failed. Try again.");
  return json.url;
}

/** Grows a textarea to fit its content so only the writing pane scrolls. */
function useAutosize(ref: React.RefObject<HTMLTextAreaElement | null>, value: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, [ref, value]);
}

export function PostEditor({ initial }: { initial: Post }) {
  const [post, setPost] = useState(initial);
  const [form, setForm] = useState<Form>(() => fromPost(initial));
  const [saved, setSaved] = useState<Form>(() => fromPost(initial));
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState<null | "save" | "publish" | "unpublish" | "delete" | "upload" | "cover">(null);
  const [, startTransition] = useTransition();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const excerptRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  // The slug follows the title until someone edits it by hand.
  const slugFollowsTitle = useRef(!initial.title || initial.slug === slugify(initial.title) || initial.slug.startsWith("untitled-"));

  useAutosize(titleRef, form.title);
  useAutosize(excerptRef, form.excerpt);
  useAutosize(bodyRef, mode === "write" ? form.body : "");

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);
  const update = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  const flash = useCallback((tone: "ok" | "error", text: string) => {
    setNotice({ tone, text });
    if (tone === "ok") setTimeout(() => setNotice((n) => (n?.text === text ? null : n)), 2400);
  }, []);

  const save = useCallback(async () => {
    setBusy("save");
    const result = await savePostAction(post.id, toInput(form));
    setBusy(null);
    if (!result.ok) return flash("error", result.error);
    setPost(result.data);
    const next = fromPost(result.data);
    setForm(next);
    setSaved(next);
    flash("ok", "Saved");
  }, [form, post.id, flash]);

  const setStatus = async (status: "published" | "draft") => {
    setBusy(status === "published" ? "publish" : "unpublish");
    const result = await saveAndSetStatusAction(post.id, toInput(form), status);
    setBusy(null);
    if (!result.ok) return flash("error", result.error);
    setPost(result.data);
    const next = fromPost(result.data);
    setForm(next);
    setSaved(next);
    flash("ok", status === "published" ? "Published" : "Moved to drafts");
  };

  const toggleFeatured = (value: boolean) => {
    setPost((p) => ({ ...p, featured: value }));
    startTransition(async () => {
      const result = await setFeaturedAction(post.id, value);
      if (!result.ok) {
        setPost((p) => ({ ...p, featured: !value }));
        flash("error", result.error);
      } else flash("ok", value ? "Added to featured" : "Removed from featured");
    });
  };

  const remove = async () => {
    if (!window.confirm(`Delete "${form.title || "Untitled post"}"? This cannot be undone.`)) return;
    setBusy("delete");
    const result = await deletePostAction(post.id);
    setBusy(null);
    if (result && !result.ok) flash("error", result.error);
  };

  // Cmd/Ctrl+S saves; leaving with unsaved edits asks first.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (dirty && !busy) void save();
      }
    };
    const onLeave = (event: BeforeUnloadEvent) => {
      if (dirty) event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [dirty, busy, save]);

  /* ------------------------------------------------------------ writing -- */

  const replaceSelection = (make: (selected: string) => { text: string; select?: [number, number] }) => {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end, value } = el;
    const { text, select } = make(value.slice(start, end));
    update("body", value.slice(0, start) + text + value.slice(end));
    // `select` is relative to the inserted text; by default the caret lands after it.
    const [a, b] = select ?? [text.length, text.length];
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + a, start + b);
    });
  };

  const wrap = (before: string, after = before, placeholder = "text") =>
    replaceSelection((sel) => {
      const inner = sel || placeholder;
      return { text: `${before}${inner}${after}`, select: [before.length, before.length + inner.length] };
    });

  const prefixLines = (prefix: (i: number) => string) =>
    replaceSelection((sel) => {
      const lines = (sel || "List item").split("\n");
      const text = lines.map((line, i) => `${prefix(i)}${line}`).join("\n");
      return { text, select: [0, text.length] };
    });

  const insertBlock = (markdown: string) =>
    replaceSelection(() => ({ text: `\n\n${markdown}\n\n` }));

  const insertImages = async (files: File[]) => {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return;
    setBusy("upload");
    try {
      for (const file of images) {
        const url = await uploadImage(file);
        const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
        insertBlock(`![${alt}](${url})`);
      }
      flash("ok", images.length > 1 ? "Images added" : "Image added");
    } catch (error) {
      flash("error", error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  };

  const setCover = async (file: File | undefined) => {
    if (!file) return;
    setBusy("cover");
    try {
      update("coverImage", await uploadImage(file));
      if (!form.coverAlt) update("coverAlt", file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
    } catch (error) {
      flash("error", error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(null);
    }
  };

  const TOOLS = [
    { key: "heading", label: "Heading", icon: Heading2 },
    { key: "bold", label: "Bold", icon: Bold },
    { key: "italic", label: "Italic", icon: Italic },
    { key: "link", label: "Link", icon: Link2 },
    { key: "quote", label: "Quote", icon: Quote },
    { key: "bullets", label: "Bulleted list", icon: ListIcon },
    { key: "numbers", label: "Numbered list", icon: ListOrdered },
    { key: "code", label: "Code", icon: Code },
    { key: "image", label: "Image", icon: ImagePlus },
  ] as const;

  const runTool = (key: (typeof TOOLS)[number]["key"]) => {
    switch (key) {
      case "heading":
        return prefixLines(() => "## ");
      case "bold":
        return wrap("**");
      case "italic":
        return wrap("*");
      case "link":
        return replaceSelection((sel) => {
          const label = sel || "link text";
          return { text: `[${label}](https://)`, select: [1, 1 + label.length] };
        });
      case "quote":
        return prefixLines(() => "> ");
      case "bullets":
        return prefixLines(() => "- ");
      case "numbers":
        return prefixLines((i) => `${i + 1}. `);
      case "code":
        return wrap("`");
      case "image":
        return fileRef.current?.click();
    }
  };

  const live = post.status === "published" && post.publishedAt && new Date(post.publishedAt) <= new Date();
  const words = form.body.trim() ? form.body.trim().split(/\s+/).length : 0;

  /* ----------------------------------------------------------- settings -- */

  const settings = (
    <div className="space-y-6">
      <div className="space-y-4">
        <Field label="URL" info="The address of this post. Changing it after publishing breaks links people already shared.">
          <div className="flex items-center rounded-lg border border-border bg-white focus-within:border-stone-400 focus-within:ring-[3px] focus-within:ring-stone-500/10">
            <span className="pl-3 text-sm text-stone-400">/blog/</span>
            <input
              value={form.slug}
              onChange={(e) => {
                slugFollowsTitle.current = false;
                update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
              }}
              onBlur={() => update("slug", slugify(form.slug))}
              className="min-w-0 flex-1 bg-transparent py-2 pr-3 text-sm outline-none"
              aria-label="URL slug"
            />
          </div>
        </Field>
        <Field label="Topic">
          <Select value={form.topic} onChange={(e) => update("topic", e.target.value as Topic)}>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Author">
          <Input value={form.authorName} onChange={(e) => update("authorName", e.target.value)} />
        </Field>
        <Field
          label="Publish date"
          optional
          info="Leave empty to use the moment you publish. A future date schedules the post: it goes live at that time."
        >
          <Input type="datetime-local" value={form.publishedAt} onChange={(e) => update("publishedAt", e.target.value)} />
        </Field>
      </div>

      <div className="border-t border-border pt-5">
        <p className="mb-2 text-sm font-medium text-foreground">Cover image</p>
        <PostCover
          image={form.coverImage || null}
          alt={form.coverAlt}
          topic={form.topic}
          className="aspect-[16/9] rounded-lg border border-border"
        />
        <div className="mt-2 flex gap-2">
          <Button size="sm" icon={Upload} loading={busy === "cover"} onClick={() => coverRef.current?.click()}>
            {form.coverImage ? "Replace" : "Upload"}
          </Button>
          {form.coverImage ? (
            <Button size="sm" variant="ghost" icon={X} onClick={() => update("coverImage", "")}>
              Remove
            </Button>
          ) : null}
        </div>
        {!form.coverImage ? (
          <p className="mt-2 text-xs text-muted-foreground">Without an image, the post uses a cover in its topic color.</p>
        ) : (
          <Field label="Alt text" className="mt-3" info="Describes the image for people using screen readers.">
            <Input value={form.coverAlt} onChange={(e) => update("coverAlt", e.target.value)} />
          </Field>
        )}
        <input
          ref={coverRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => {
            void setCover(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>

      <div className="border-t border-border pt-2">
        <SwitchRow
          label="Featured"
          info="Featured posts appear on the home page and at the top of the blog. Set their order under Featured."
          checked={post.featured}
          onChange={toggleFeatured}
        />
      </div>

      <div className="border-t border-border pt-5">
        <Button variant="danger" size="sm" icon={Trash2} loading={busy === "delete"} onClick={remove}>
          Delete post
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-white px-3 sm:px-4">
        <Link
          href="/admin"
          className="flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm text-stone-600 transition-colors hover:bg-muted hover:text-stone-950"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          <span className="hidden sm:inline">Posts</span>
        </Link>
        <PostStatusBadge status={post.status} publishedAt={post.publishedAt} />
        <span
          aria-live="polite"
          className={cn(
            "hidden truncate text-xs sm:block",
            notice?.tone === "error" ? "text-red-600" : "text-muted-foreground",
          )}
        >
          {notice?.text ?? (dirty ? "Unsaved changes" : "All changes saved")}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={Settings2}
            onClick={() => setSettingsOpen(true)}
            className="lg:hidden"
            aria-label="Post settings"
          >
            <span className="hidden sm:inline">Settings</span>
          </Button>
          {live ? (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noreferrer"
              className="hidden h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
              View
            </a>
          ) : null}
          <Button size="sm" onClick={save} loading={busy === "save"} disabled={!dirty || Boolean(busy)}>
            Save
          </Button>
          {post.status === "published" ? (
            <Button size="sm" variant="secondary" onClick={() => setStatus("draft")} loading={busy === "unpublish"} disabled={Boolean(busy)}>
              Unpublish
            </Button>
          ) : (
            <Button size="sm" variant="primary" onClick={() => setStatus("published")} loading={busy === "publish"} disabled={Boolean(busy)}>
              Publish
            </Button>
          )}
        </div>
      </header>

      {notice?.tone === "error" ? (
        <div className="shrink-0 border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 sm:hidden">{notice.text}</div>
      ) : null}

      <div className="flex min-h-0 flex-1">
        <main
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          onDragOver={(e) => {
            if (mode === "write" && e.dataTransfer.types.includes("Files")) e.preventDefault();
          }}
          onDrop={(e) => {
            if (mode !== "write" || !e.dataTransfer.files.length) return;
            e.preventDefault();
            void insertImages(Array.from(e.dataTransfer.files));
          }}
        >
          <div className="mx-auto max-w-3xl px-5 pb-32 pt-10 sm:px-8">
            <textarea
              ref={titleRef}
              value={form.title}
              rows={1}
              placeholder="Post title"
              aria-label="Title"
              onChange={(e) => {
                const title = e.target.value.replace(/\n/g, " ");
                setForm((f) => ({ ...f, title, slug: slugFollowsTitle.current ? slugify(title) || f.slug : f.slug }));
              }}
              className="w-full resize-none overflow-hidden bg-transparent text-[2.1rem] font-medium leading-[1.15] tracking-[-0.035em] text-stone-950 outline-none placeholder:text-stone-300"
            />
            <textarea
              ref={excerptRef}
              value={form.excerpt}
              rows={1}
              placeholder="A one or two sentence summary, shown in lists and when the post is shared"
              aria-label="Summary"
              onChange={(e) => update("excerpt", e.target.value.replace(/\n/g, " "))}
              className="mt-3 w-full resize-none overflow-hidden bg-transparent text-lg leading-8 text-stone-600 outline-none placeholder:text-stone-300"
            />

            <div className="sticky top-0 z-10 -mx-2 mt-6 flex flex-wrap items-center gap-2 border-b border-border bg-page/95 px-2 py-2 backdrop-blur">
              <Segmented
                size="sm"
                value={mode}
                onChange={setMode}
                items={[
                  { value: "write", label: "Write" },
                  { value: "preview", label: "Preview" },
                ]}
              />
              {mode === "write" ? (
                <div className="flex flex-wrap items-center gap-0.5">
                  {TOOLS.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => runTool(key)}
                      title={label}
                      aria-label={label}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-stone-500 transition-colors hover:bg-muted hover:text-stone-950"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                  ))}
                  {busy === "upload" ? <LoaderCircle className="ml-1 h-4 w-4 animate-spin text-stone-400" /> : null}
                </div>
              ) : null}
              <span className="ml-auto text-xs text-muted-foreground">{words} words</span>
            </div>

            {mode === "write" ? (
              <textarea
                ref={bodyRef}
                value={form.body}
                onChange={(e) => update("body", e.target.value)}
                onPaste={(e) => {
                  const files = Array.from(e.clipboardData.files);
                  if (files.some((f) => f.type.startsWith("image/"))) {
                    e.preventDefault();
                    void insertImages(files);
                  }
                }}
                placeholder={"Write in Markdown.\n\n## A heading\n\nParagraphs, **bold**, *italic*, [links](https://), lists and images. Paste or drop images to upload them."}
                aria-label="Post body"
                className="mt-6 min-h-[50vh] w-full resize-none overflow-hidden bg-transparent text-[16px] leading-8 text-stone-800 outline-none placeholder:text-stone-300"
              />
            ) : (
              <div className="mt-8">
                {form.body.trim() ? (
                  <Markdown source={form.body} />
                ) : (
                  <p className="text-sm text-muted-foreground">Nothing to preview yet.</p>
                )}
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
              className="hidden"
              onChange={(e) => {
                void insertImages(Array.from(e.target.files ?? []));
                e.target.value = "";
              }}
            />
          </div>
        </main>

        <aside className="hidden w-80 shrink-0 overflow-y-auto overscroll-contain border-l border-border bg-white px-5 py-6 lg:block">
          {settings}
        </aside>
      </div>

      <Drawer open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Post settings">
        {settings}
      </Drawer>
    </div>
  );
}
