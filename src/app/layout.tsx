import type { Metadata } from "next";
import { Nunito, Montserrat, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const displayFont = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bodyFont = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const monoFont = Montserrat({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CafeHira — Brewed for Comfort, Crafted for Moments",
  description:
    "A premium specialty coffee sanctuary. Slow mornings, meaningful conversations, and every cup poured with intention.",
  keywords: ["cafe", "coffee", "specialty coffee", "CafeHira", "reservations"],
  openGraph: {
    title: "CafeHira",
    description: "Brewed for Comfort, Crafted for Moments.",
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
      className={`${displayFont.variable} ${monoFont.variable} ${bodyFont.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
