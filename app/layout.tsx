import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SERVINGS } from "@/lib/meals";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Family meal planner",
    template: "%s · Family meal planner",
  },
  description:
    "7-day lunch and dinner plan for a family of 8. Cantonese, Teochew, and Vietnamese cooking with two prep days.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Week table",
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="print:hidden border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
            <Link href="/" className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                Family of {SERVINGS}
              </p>
              <h1 className="text-lg font-semibold">Weeknight rice table</h1>
            </Link>
            <SiteNav />
          </div>
        </header>
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
