"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { NAV, PRIMARY_CTA } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-page/95 backdrop-blur-md">
      <div className="brand-container flex h-20 items-center justify-between gap-6">
        <Logo />
        <nav
          aria-label="Main"
          className="hidden items-center gap-8 min-[900px]:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                !item.href.includes("#") && pathname.startsWith(item.href)
                  ? "page"
                  : undefined
              }
              className="text-[13px] text-[#5d6470] transition-colors hover:text-[#813380] aria-[current=page]:text-[#172438]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noreferrer"
              className="brand-button"
            >
              {PRIMARY_CTA.label}
              <ArrowUpRight size={14} />
            </a>
          </div>
          <button
            onClick={() => setOpen(true)}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center min-[900px]:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        id="mobile-menu"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        aria-label="Navigation menu"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-page p-0 text-foreground backdrop:bg-foreground/30"
      >
        <div className="brand-container">
          <div className="flex h-20 items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center"
            >
              <X size={24} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8 flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-5 text-2xl tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={PRIMARY_CTA.href}
            target="_blank"
            rel="noreferrer"
            className="brand-button mt-8"
          >
            {PRIMARY_CTA.label}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </dialog>
    </header>
  );
}
