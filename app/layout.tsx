import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://surol.az";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Surol.az | Sürücülük Vəsiqəsi İmtahanı Hazırlığı",
    template: "%s | Surol.az",
  },
  description: "Surol.az ilə sürücülük vəsiqəsi imtahanına pulsuz hazırlaşın. 500+ real sual, yol nişanları, marafon rejimi və ətraflı izahlar. Sürücü Olmaq İndi Daha Asandır!",
  keywords: [
    "surol",
    "surol.az",
    "sürücü ol",
    "sürücülük imtahanı",
    "DYP imtahan",
    "sürücülük vəsiqəsi",
    "Azərbaycan sürücülük",
    "yol hərəkəti qaydaları",
    "yol nişanları",
    "DYP test",
    "sürücülük testləri",
    "avtomobil imtahanı",
    "sürücülük hazırlığı",
    "DYP sualları",
    "cərimələr cədvəli",
  ],
  authors: [{ name: "Surol.az" }],
  creator: "Surol.az",
  publisher: "Surol.az",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: siteUrl,
    siteName: "Surol.az",
    title: "Surol.az | Sürücülük Vəsiqəsi İmtahanı Hazırlığı",
    description: "Sürücülük vəsiqəsi imtahanına pulsuz hazırlıq platforması. Real suallar və ətraflı izahlar.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Surol.az - Sürücülük İmtahanı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surol.az | Sürücülük İmtahanı",
    description: "Sürücülük vəsiqəsi imtahanına pulsuz hazırlaşın.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual code
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
};

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/SEO/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1 flex flex-col w-full">
             {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
