import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../../public/fonts/Thunder-BlackLC.woff",
  // variable: "--font-myFont",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Ho Tai",
  description: "Tai's Portfolio",
  authors: [{ name: "Ho Tan Tai" }],
  keywords: ["hotai1806", "Tai Ho", "Ho Tai", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ lineHeight: "0.888em" }}
      >
        {children}
      </body>
    </html>
  );
}
