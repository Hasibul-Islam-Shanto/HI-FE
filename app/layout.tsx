import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Frontend",
  description:
    "176 curated frontend interview questions across HTML, CSS, JavaScript, TypeScript, React, React Native, Vue, Next.js, and Coding — with progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} dark antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
