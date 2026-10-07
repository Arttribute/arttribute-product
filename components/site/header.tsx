"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { NAV, PRIMARY_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-border/80 bg-page/85 backdrop-blur-xl" : "border-transparent bg-page/0",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm text-stone-600 transition-colors hover:bg-muted hover:text-stone-950",
                isActive(item.href) && "text-stone-950",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PRIMARY_CTA.href}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 sm:inline-flex"
          >
            {PRIMARY_CTA.label}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-700 transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] border-t border-border bg-page px-4 pb-8 pt-4 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * index, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-border py-4 text-lg tracking-tight text-stone-900"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex h-11 items-center justify-center gap-1.5 rounded-lg bg-stone-900 text-sm font-medium text-white"
            >
              {PRIMARY_CTA.label}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
