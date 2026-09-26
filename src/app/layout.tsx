import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { JsonLd } from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Remote Poslovi | Kurirana baza za remote rad",
    template: "%s | Remote Poslovi",
  },
  description:
    "Kurirana baza resursa za remote rad, freelance, CV, učenje, poreze, fakture, sigurnost, produktivnost i karijeru sa fokusom na Srbiju.",
  keywords: [
    "remote poslovi",
    "posao od kuce",
    "freelance srbija",
    "remote jobs serbia",
    "remote alati",
    "cv alati",
    "kursevi",
    "frilenseri porez",
  ],
  applicationName: SITE_NAME,
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#17312a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr-Latn"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f6f7f3] font-sans text-[#17312a] selection:bg-[#cbe3cf] selection:text-[#112a23]">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/izvori?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <SiteHeader />
        <div id="sadrzaj" className="flex-1">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
