import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { SocialLinks } from "@/components/site/social-icons";
import { FOOTER_GROUPS, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="brand-footer">
      <div className="brand-container">
        <div className="brand-footer-grid">
          <div>
            <Logo />
            <p className="brand-copy mt-5 max-w-[280px] text-sm">
              Technology and education for a more human future with AI.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-5 inline-block text-sm"
            >
              {SITE.email}
            </a>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="brand-label text-[#666b73]">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target={
                          link.href.startsWith("mailto:") ? undefined : "_blank"
                        }
                        rel="noreferrer"
                        className="text-[12px] text-[#5d6470]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[12px] text-[#5d6470]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-[11px] text-[#666b73]">
            © {new Date().getFullYear()} Arttribute. Built in Nairobi. Open to
            the world.
          </p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
