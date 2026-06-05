import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Acme, a digital product studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

let logoSrc: string | null = null;
try {
  const buf = readFileSync(join(process.cwd(), "src/app/icon.png"));
  logoSrc = `data:image/png;base64,${buf.toString("base64")}`;
} catch {
  logoSrc = null;
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "90px",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e40af 58%, #2563eb 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} width={104} height={104} alt="" />
        ) : null}
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-3px",
            marginTop: 34,
          }}
        >
          Acme
        </div>
        <div style={{ fontSize: 38, color: "#bfdbfe", marginTop: 14 }}>
          We design and build products people love
        </div>
        <div style={{ fontSize: 26, color: "#93c5fd", marginTop: 46 }}>
          Built with notion-to-site
        </div>
      </div>
    ),
    { ...size },
  );
}
