import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
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
  title: "Remote Poslovi | Direktorijum poslova na daljinu i freelance rada",
  description: "Kurirana baza proverenih remote poslova, freelance platformi, AI trening zadataka, online predavanja i poreskih vodiča za kandidate iz Srbije i regiona.",
  keywords: ["remote poslovi", "posao od kuce", "freelance srbija", "outlier srbija", "online casovi engleskog", "pausal srbija"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f8f9f5] text-[#142822] selection:bg-[#cbe3cf] selection:text-[#112a23]">
        {children}
      </body>
    </html>
  );
}
