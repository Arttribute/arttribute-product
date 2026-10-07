import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const cube = (
  <svg width="44" height="50" viewBox="4 2.5 24 27" fill="none">
    <path d="M16.1191 3.20123L27.1486 9.66137L16.5918 16.5942L4.85327 9.66137L16.1191 3.20123Z" fill="#F74581" />
    <path d="M4.85327 9.66138L16.5918 16.5942V28.6479L5.01084 22.1877L4.85327 9.66138Z" fill="#813380" />
    <path d="M16.5918 16.5942L27.1486 9.66138V22.109L16.5918 28.5691V16.5942Z" fill="#1A237E" />
  </svg>
);

/** The shared social card: warm canvas, soft brand washes, one statement. */
export async function renderOg({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer?: string;
}) {
  const font = await readFile(join(process.cwd(), "fonts/SpaceGrotesk-Medium.ttf"));
  const size = title.length > 70 ? 58 : title.length > 40 ? 68 : 84;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fcfcfb",
          backgroundImage:
            "radial-gradient(circle at 92% 8%, rgba(249,168,212,0.55), rgba(252,252,251,0) 42%), radial-gradient(circle at 4% 100%, rgba(165,180,252,0.45), rgba(252,252,251,0) 40%)",
          fontFamily: "Space Grotesk",
          color: "#1c1917",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#78716c" }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#f74581" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: size, lineHeight: 1.05, letterSpacing: "-0.04em", maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, letterSpacing: "-0.03em" }}>
            {cube}
            Arttribute
          </div>
          {footer ? <div style={{ display: "flex", color: "#78716c" }}>{footer}</div> : null}
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Space Grotesk", data: font, style: "normal", weight: 500 }] },
  );
}
