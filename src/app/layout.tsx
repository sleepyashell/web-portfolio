import type { Metadata } from "next";
import { fontSans, fontSerif } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Syuraih Umar Khotthob — Product Designer & Front-end Developer",
  description:
    "Informatics student at Universitas Diponegoro. I turn user research into interfaces people enjoy using, and I'm learning to build them end to end.",
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
