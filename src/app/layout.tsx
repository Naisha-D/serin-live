import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Serin — Where Talent Meets Opportunity",
  description:
    "AI-powered hiring that removes subjectivity. Every candidate evaluated fairly, every opportunity matched precisely.",
  openGraph: {
    title: "Serin — Where Talent Meets Opportunity",
    description:
      "AI-powered hiring that removes subjectivity. Every candidate evaluated fairly, every opportunity matched precisely.",
    url: "https://serin-live.vercel.app",
    siteName: "Serin",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serin — Where Talent Meets Opportunity",
    description:
      "AI-powered hiring that removes subjectivity. Every candidate evaluated fairly, every opportunity matched precisely.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}