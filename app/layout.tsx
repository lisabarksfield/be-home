import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Be Home | Community & Wellness Space, Cascais",
  description:
    "A community and wellness space in Cascais. Classes, treatments, and studio rentals in a warm, welcoming environment.",
  openGraph: {
    title: "Be Home | Community & Wellness Space, Cascais",
    description:
      "A community and wellness space in Cascais. Classes, treatments, and studio rentals.",
    locale: "en_PT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
