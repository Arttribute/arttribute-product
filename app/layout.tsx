import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = localFont({
  src: "../fonts/Inter-variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

const newsreader = localFont({
  src: [
    {
      path: "../fonts/Newsreader-variable.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../fonts/Newsreader-Italic-variable.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-newsreader",
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
  themeColor: "#faf9f6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${newsreader.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh bg-page font-sans text-foreground antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
