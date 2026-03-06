"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";
import { Nunito, Manrope } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Footer() {
  return (
    <footer
      className={`${manrope.className} w-full bg-[#0a7061] text-white pt-8 pb-0`}
    >
      {/* TOP SECTION */}
      <div className="px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 pb-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left pl-10 md:pl-16 lg:pl-20">
          {/* LOGO */}
          <div className="relative w-full max-w-[440px] h-[100px] md:h-[120px] mb-6">
            <Image
              src="/Images/ASPGF_Logo.webp"
              alt="Logo"
              fill
              className="object-contain object-left"
            />
          </div>

          {/* DESCRIPTION */}
          <p className="max-w-xl text-[18px] leading-relaxed mb-6 opacity-90 font-medium">
            Committed to education, community outreach, and inclusive social
            impact through structured initiatives
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4">
            {[FaTwitter, FaFacebookF, FaPinterestP, FaInstagram].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-black/15 flex justify-center items-center cursor-pointer hover:bg-white hover:text-[#0a7061] transition-all duration-300"
                >
                  <Icon size={20} />
                </div>
              ),
            )}
          </div>
        </div>

        {/* RIGHT SIDE - LINKS + CONTACT */}
        <div className="flex flex-col gap-6 md:pl-12 md:border-l md:border-white/100">
          <div>
            <h3
              className={`${nunito.className} text-[24px] font-extrabold mb-6 tracking-wide`}
            >
              Quick Links
            </h3>

            <div className="flex flex-wrap gap-4 text-[17px] font-bold">
              <Link
                href="/AboutUS"
                className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all inline-flex items-center"
              >
                About us
              </Link>
              <Link
                href="/contactUs"
                className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all inline-flex items-center"
              >
                Contact
              </Link>
              <Link
                href="/#news"
                className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all inline-flex items-center"
              >
                Latest News
              </Link>
              <a
                href="#"
                className="opacity-80 hover:opacity-100 hover:translate-x-1 transition-all inline-flex items-center"
              >
                Recent Events
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-white/100">
            <h3
              className={`${nunito.className} text-[24px] font-extrabold mb-6 tracking-wide`}
            >
              Contact Us
            </h3>

            <p className="text-[15px] leading-relaxed opacity-90 font-medium max-w-full">
              Dr. Sushant Patil Corporate, Office No. 615, 6th Floor, Solitaire
              Business Hub, Balewadi High Street, Baner, Pune 411045
            </p>

            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-3 text-[16px] font-bold">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-2">
                  <Image src="/mail.svg" width={20} height={20} alt="mail" />
                </div>
                <span>project.director@aspgf.org</span>
              </div>

              <div className="flex items-center gap-3 text-[16px] font-bold">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-2">
                  <Image src="/call.svg" width={20} height={20} alt="phone" />
                </div>
                <span>96840 01643</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="w-full bg-black/10 py-4 px-8 md:px-20 text-[14px] flex justify-between items-center flex-wrap text-white gap-4">
        <p className="opacity-70 font-medium">
          Developed by{" "}
          <span className="font-extrabold text-white uppercase tracking-widest text-[12px]">
            seamedu
          </span>
        </p>

        <p className="opacity-70 text-center flex-1 font-medium">
          © 2026 Anuja Sushant Patil Global Foundation. All Rights Reserved.
        </p>

        <div className="flex items-center gap-10 font-bold">
          <a
            href="#"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
