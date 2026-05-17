import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A1628",
          position: "relative",
        }}
      >
        {/* Subtle radial dot grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Teal glow accent top-right */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(62,174,125,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Bottom-left glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-60px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(62,174,125,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            GetVidya
          </div>

          {/* Teal divider line */}
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#3EAE7D",
              borderRadius: "2px",
              marginBottom: "28px",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "34px",
              fontWeight: 600,
              color: "#3EAE7D",
              letterSpacing: "-0.5px",
              lineHeight: 1.3,
              maxWidth: "800px",
            }}
          >
            India&apos;s First AI-Powered Govt. Exam Prep
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.55)",
              marginTop: "20px",
              letterSpacing: "0.2px",
            }}
          >
            140,000+ Questions · 1,200+ Mock Tests · Starting ₹149/month
          </div>
        </div>

        {/* URL badge bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "24px",
            padding: "8px 22px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#3EAE7D",
            }}
          />
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.5px",
            }}
          >
            getvidya.in
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
