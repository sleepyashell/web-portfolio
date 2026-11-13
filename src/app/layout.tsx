import type { Metadata } from "next";
import { profile } from "@/data/content";
import { fontSans, fontSerif } from "@/styles/fonts";
import "./globals.css";

// Absolute base for OG/Twitter image URLs. Vercel provides the production domain at build time;
// set NEXT_PUBLIC_SITE_URL to override (e.g. a custom domain).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = `${profile.name} — Product Designer & Front-end Developer`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.intro,
  openGraph: {
    type: "website",
    title,
    description: profile.intro,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name} portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.intro,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
