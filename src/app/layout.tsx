import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Meridian Development Group — Premium Beachfront Residences",
  description:
    "Since 1998, Meridian Development Group has crafted landmark beachfront residences where architecture meets the coastline. Discover our portfolio of premium homes built to endure.",
  keywords: ["luxury real estate", "beachfront homes", "residential developer", "premium construction"],
  openGraph: {
    title: "Meridian Development Group",
    description: "Where life is built to be lived in.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-charcoal text-ivory overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
