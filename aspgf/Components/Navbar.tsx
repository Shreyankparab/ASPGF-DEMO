"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { FiMenu, FiX } from "react-icons/fi";
import { Nunito, Manrope } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/AboutUs" },
    { name: "Our Work", href: "/OurWork" },
    { name: "News", href: "/News" },
    { name: "Impact", href: "/Impact" },
  ];

  return (
    <header
      className={`${manrope.className} w-full bg-white border-b border-gray-100`}
    >
      {/* ================= TOP BAR ================= */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 h-16 items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center mt-14 ">
          <div className="relative w-72 h-20 ">
            <Image
              src="/Images/ASPGF_logo.webp"
              alt="Anuja Sushant Patil Global Foundation"
              fill
              className="object-contain "
              priority
            />
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="hidden lg:flex items-center gap-6 ml-auto text-[12px]">
          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-[#00715D]" />
            <div>
              <p className="text-gray-400 font-medium">Helpline</p>
              <p
                className={`${nunito.className} font-extrabold text-[#1A2E35]`}
              >
                +91 45545 4545
              </p>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200" />

          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-[#00715D]" />
            <div>
              <p className="text-gray-400 font-medium">Send email</p>
              <p
                className={`${nunito.className} font-extrabold text-[#1A2E35] uppercase`}
              >
                needhelp@company.com
              </p>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200" />

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#00715D]" />
            <div>
              <p className="text-gray-400 font-medium">Baner</p>
              <p
                className={`${nunito.className} font-extrabold text-[#1A2E35]`}
              >
                Pune, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= NAV BAR ================= */}
      <div className="hidden md:flex w-full items-stretch">
        {/* LEFT SPACER (aligns curve visually) */}
        <div className="hidden md:block w-[15%] ml-60" />

        <nav className="bg-[#00735C] flex-1 flex items-center px-10 rounded-tl-[45px] h-16">
          <ul className="flex items-center gap-28 text-white font-bold text-[15px] tracking-wide">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} className="transition-colors group">
                  <Link
                    href={link.href}
                    className={`cursor-pointer whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "text-white font-extrabold"
                        : "text-white/70 hover:text-white font-bold"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* DONATE BUTTON (CONTACT) */}
        <Link
          href="/contactUs"
          className="h-16 px-10 bg-[#C56BE3] hover:bg-purple-500 transition-all flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest cursor-pointer whitespace-nowrap"
        >
          <Phone size={18} fill="white" />
          <span>Contact</span>
        </Link>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden flex items-center justify-between px-6 h-20 bg-white relative z-[110]">
        <Link href="/" className="relative w-48 h-12">
          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-[#00735C] hover:bg-gray-100 rounded-lg transition-all"
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 bg-[#00000080] backdrop-blur-sm transition-all duration-300 z-[105] ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[75%] bg-white shadow-2xl transition-transform duration-500 ease-in-out z-[106] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 pt-24 flex flex-col h-full">
          <ul className="flex flex-col gap-8 mb-12">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`${nunito.className} text-xl font-extrabold transition-colors flex items-center justify-between group ${
                      isActive
                        ? "text-[#00735C]"
                        : "text-[#1A2E35] hover:text-[#00735C]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                    <div
                      className={`w-2 h-2 rounded-full bg-[#00735C] transition-opacity ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto space-y-6">
            <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Phone size={16} className="text-[#00735C]" />
                <span className="font-bold">+91 45545 4545</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 uppercase tracking-tighter">
                <Mail size={16} className="text-[#00735C]" />
                <span className="font-bold">needhelp@company.com</span>
              </div>
            </div>

            <Link
              href="/contactUs"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-4 bg-[#C56BE3] text-white rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-[0.1em] shadow-lg shadow-purple-200"
            >
              <Phone size={18} fill="white" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
