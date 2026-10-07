import Link from "next/link";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { CubeMark } from "@/components/site/logo";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        className="brand-container brand-section flex min-h-[60vh] flex-col items-start justify-center"
      >
        <CubeMark className="h-10" />
        <p className="brand-label mt-8 text-[#813380]">404 / Page not found</p>
        <h1 className="brand-title mt-5">
          A different <span className="brand-serif italic">direction.</span>
        </h1>
        <p className="brand-copy mt-5 max-w-md">
          This page may have moved. Explore our work or find the latest stories
          in the journal.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="brand-button">
            Go home
          </Link>
          <Link href="/blog" className="brand-button brand-button-outline">
            Explore the journal
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
