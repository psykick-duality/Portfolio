import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dilip Prasad | psykick | Penetration Tester & Security Analyst",
  description: "OSCP-certified Penetration Tester specializing in web application security, Python automation, and AI-assisted vulnerability analysis. 50+ vulnerabilities reported.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased flex flex-col min-h-screen">
        <ClientBody>
          <Navigation />
          <main className="pt-16 flex-1">{children}</main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}
