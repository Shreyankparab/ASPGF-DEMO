import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito, Cabin } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Suspense } from "react";
import LoadingHandler from "@/Components/Common/LoadingHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Anuja Sushant Patil Global Foundation",
  description: "Empowering change through kindness and community support.",
  icons: {
    icon: "/images/simple-peacock.svg",
    shortcut: "/images/simple-peacock.svg",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${cabin.variable} antialiased overflow-x-hidden`}
      >
        <Suspense fallback={null}>
          <LoadingHandler />
        </Suspense>
        {/* Prevent horizontal overflow globally */}
        <div className="relative w-full overflow-x-hidden">

          {/* Fixed Header */}
          <div className="fixed inset-x-0 top-0 z-50">
            <Navbar />
          </div>

          {/* Page Content */}
          <main className="pt-20 xl:pt-28 w-full">
            {children}
          </main>

          <Footer />

        </div>
      </body>
    </html>
  );
}
