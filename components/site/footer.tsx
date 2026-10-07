import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { SocialLinks } from "@/components/site/social-icons";
import { FOOTER_GROUPS, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-stone-600">
              Technology for private, transparent and responsible AI. Built in Nairobi, used anywhere.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 inline-block text-sm text-stone-900 underline decoration-pink-300 decoration-[1.5px] underline-offset-4 transition-colors hover:decoration-brand-pink"
            >
              {SITE.email}
            </a>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-medium text-stone-950">{group.title}</h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noreferrer"
                        className="text-sm text-stone-600 transition-colors hover:text-stone-950"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-stone-600 transition-colors hover:text-stone-950">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-stone-500">© {new Date().getFullYear()} Arttribute. All rights reserved.</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
