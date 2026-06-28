import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { getDefaultMetadata } from "@/lib/metadata";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = getDefaultMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
