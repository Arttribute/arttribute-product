import Link from "next/link";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { CubeMark } from "@/components/site/logo";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center px-4 py-24 sm:px-6">
        <CubeMark className="h-10" />
        <h1 className="mt-6 text-[2.25rem] font-medium tracking-[-0.04em] text-stone-950 sm:text-[3rem]">
          This page is not here.
        </h1>
        <p className="mt-3 max-w-md text-lg leading-8 text-stone-600">
          It may have moved, or it belonged to the earlier Arttribute site.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-lg bg-stone-900 px-4 text-sm font-medium text-white hover:bg-stone-800"
          >
            Go home
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-10 items-center rounded-lg border border-border bg-white px-4 text-sm font-medium text-stone-800 shadow-card hover:bg-muted"
          >
            Read the blog
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
