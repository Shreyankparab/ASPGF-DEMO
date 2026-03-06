import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {/* Prevent horizontal overflow globally */}
        <div className="relative w-full overflow-x-hidden">
          {/* Fixed Header */}
          <div className="fixed inset-x-0 top-0 z-50">
            <Navbar />
          </div>

          {/* Page Content */}
          <main className="pt-20 md:pt-28 w-full">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
