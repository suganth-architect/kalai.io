import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Noto_Sans_Tamil } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

/* ── Font: Space Grotesk (Primary — variable) ── */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
});

/* ── Font: Noto Sans Tamil (for கலை — lazy loaded via variable) ── */
const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["500"],
  display: "swap",
  variable: "--font-tamil",
});

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: "kalai.io — Your Marketing Runs Itself",
  description:
    "The first autonomous AI marketing agent for Indian SMBs. Describe your business once. Everything after that is handled.",
  keywords: [
    "AI marketing",
    "autonomous marketing",
    "Indian SMB",
    "social media automation",
    "marketing agent",
    "kalai",
  ],
  openGraph: {
    title: "kalai.io — Your Marketing Runs Itself",
    description:
      "The first autonomous AI marketing agent for Indian SMBs.",
    type: "website",
    locale: "en_IN",
    siteName: "kalai.io",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e1014",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${notoSansTamil.variable}`}
    >
      <body className="font-[family-name:var(--font-primary)]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
