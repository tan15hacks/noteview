import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noteview.vercel.app"),
  title: "NoteView | Blog Posts, Guides, and Ideas Worth Reading",
  description:
    "NoteView is a modern blog and digital journal featuring thoughtful posts, practical guides, and fresh ideas about productivity, technology, design, lifestyle, writing, and creative work.",
  keywords: [
    "blog posts",
    "online blog",
    "productivity blog",
    "technology blog",
    "design blog",
    "lifestyle blog",
    "writing tips",
    "creative work blog",
    "personal growth articles",
    "digital journal",
    "NoteView",
  ],
  openGraph: {
    title: "NoteView | Blog Posts, Guides, and Ideas Worth Reading",
    description:
      "A modern blog and digital journal featuring thoughtful posts, practical guides, and fresh ideas about productivity, technology, design, lifestyle, writing, and creative work.",
    url: "https://noteview.vercel.app",
    siteName: "NoteView",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "NoteView modern blog and digital journal landing page for thoughtful posts and practical guides",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteView | Blog Posts, Guides, and Ideas Worth Reading",
    description:
      "A premium blog landing page concept for ideas, guides, and stories worth reading.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
