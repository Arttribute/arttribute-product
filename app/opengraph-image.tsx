import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Arttribute: AI that keeps you in control";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Private AI · AI literacy · Provenance",
    title: "AI that keeps you in control.",
    footer: "arttribute.io",
  });
}
