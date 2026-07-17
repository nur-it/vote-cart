import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Ignore missing type declarations for global CSS side-effect import
// @ts-ignore
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/poll/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoteCart — Ecommerce Category Voting",
  description:
    "Vote for your favourite ecommerce product categories and watch real-time, YouTube-style percentage results across 100+ options.",
  keywords: [
    "ecommerce voting",
    "category poll",
    "product categories",
    "live results",
    "Next.js",
    "shadcn/ui",
  ],
  authors: [{ name: "VoteCart" }],
  openGraph: {
    title: "VoteCart — Ecommerce Category Voting",
    description:
      "Tick your favourite categories and watch real-time percentage results fill up across 100+ options.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
