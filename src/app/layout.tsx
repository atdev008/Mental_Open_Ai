import type { Metadata } from "next";
import { Kanit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"]
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Neural Memory Interface",
  description: "Prototype dashboard for a brain-signal memory capture device built with Next.js."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}

