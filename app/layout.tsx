import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const chakra_petch = Chakra_Petch({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Arttribute",
  description:
    "Arttribute enables fair and transparent use of art in the realm of genereative AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={chakra_petch.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
