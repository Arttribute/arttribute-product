"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ExternalLink, FileText, LogOut, Menu, Star, X } from "lucide-react";
import { CubeMark } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const NAV = [
  {
    href: "/admin",
    label: "Posts",
    icon: FileText,
    match: (p: string) => p === "/admin" || p.startsWith("/admin/posts"),
  },
  {
    href: "/admin/featured",
    label: "Featured",
    icon: Star,
    match: (p: string) => p.startsWith("/admin/featured"),
  },
];

/**
 * The console frame: one sidebar for navigation with the account pinned to
 * the bottom, and a content area that owns the scrolling.
 */
export function AdminShell({
  user,
  children,
}: {
  user: { name: string; email: string; picture: string | null };
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const editing = pathname.startsWith("/admin/posts/");

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link
        href="/admin"
        className="flex items-center gap-2 px-3 py-4 text-[15px] font-medium tracking-tight text-stone-950"
      >
        <CubeMark className="h-5" />
        Arttribute
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-stone-500">
          Admin
        </span>
      </Link>
      <nav aria-label="Admin" className="mt-2 flex flex-col gap-0.5 px-2">
        {NAV.map(({ href, label, icon: Icon, match }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            aria-current={match(pathname) ? "page" : undefined}
            className={cn(
              "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm transition-colors",
              match(pathname)
                ? "bg-[#eeecf4] font-medium text-[#25326c]"
                : "text-stone-600 hover:bg-muted hover:text-stone-950",
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={1.75} />
            {label}
          </Link>
        ))}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm text-stone-600 transition-colors hover:bg-muted hover:text-stone-950"
        >
          <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
          View site
        </a>
      </nav>

      <div className="mt-auto border-t border-border p-2">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          {user.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.picture}
              alt=""
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-100 text-xs font-medium text-pink-900">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-stone-900">
              {user.name}
            </span>
            <span className="block truncate text-xs text-stone-500">
              {user.email}
            </span>
          </span>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              aria-label="Sign out"
              title="Sign out"
              className="flex h-8 w-8 items-center justify-center rounded-md text-stone-500 transition-colors hover:bg-muted hover:text-stone-950"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-dvh overflow-hidden bg-page">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-white lg:block">
        {sidebar}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="ui-fade-in absolute inset-0 bg-stone-950/20"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="ui-slide-in relative h-full w-64 border-r border-border bg-white shadow-floating">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-2 top-3 flex h-8 w-8 items-center justify-center rounded-md text-stone-500 hover:bg-muted"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-white px-3 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-600 hover:bg-muted"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <span className="flex items-center gap-2 text-sm font-medium">
            <CubeMark className="h-4" />
            Admin
          </span>
        </div>
        {editing ? (
          <div className="min-h-0 flex-1">{children}</div>
        ) : (
          <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
              {children}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
