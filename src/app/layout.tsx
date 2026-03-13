import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shredmillground.com"),
  title: "Shredmill Ground | Coming March 25, 2026",
  description:
    "The Shredmill Ground is the next evolution in speed and agility training equipment. Sign up to be the first to know when it launches.",
  keywords: [
    "Shredmill",
    "Shredmill Ground",
    "speed training",
    "agility training",
    "athletic performance",
    "training equipment",
    "Tony Villani",
    "XPE",
  ],
  openGraph: {
    title: "Shredmill Ground | Coming March 25, 2026",
    description:
      "The next evolution in speed and agility training equipment. Get on the list.",
    url: "https://shredmillground.com",
    siteName: "Shredmill Ground",
    images: [
      {
        url: "/shredmill-product.jpg",
        width: 1200,
        height: 630,
        alt: "Shredmill Ground Training Equipment",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shredmill Ground | Coming March 25, 2026",
    description:
      "The next evolution in speed and agility training equipment. Get on the list.",
    images: ["/shredmill-product.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
