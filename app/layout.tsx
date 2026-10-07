import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "../fonts/SpaceGrotesk-variable.ttf",
  weight: "300 700",
  display: "swap",
  variable: "--font-space-grotesk",
});

const geistMono = localFont({
  src: "../fonts/GeistMono-variable.ttf",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "private AI",
    "local AI",
    "sovereign AI",
    "AI literacy",
    "responsible AI",
    "AI provenance",
    "Agent Commons",
    "CommonLab",
    "ProvenanceKit",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@arttribute_io",
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
  },
  alternates: {
    types: { "application/rss+xml": `${SITE.url}/blog/rss.xml` },
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfcfb",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh bg-page font-sans text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
