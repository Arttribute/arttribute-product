import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Arttribute: Powerful AI. On your terms.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Private AI · AI literacy · Provenance",
    title: "Powerful AI. On your terms.",
    footer: "arttribute.io",
  });
}
