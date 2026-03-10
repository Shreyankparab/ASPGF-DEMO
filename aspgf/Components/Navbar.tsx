"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Phone, Mail, MapPin, Menu, X, HandHeart } from "lucide-react";
import { Nunito, Cabin } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about-us" },
        { name: "Our Work", href: "/our-work" },
        { name: "News", href: "/news" },
        { name: "Gallery", href: "/gallery" },
        { name: "Impact", href: "/impact" },
        { name: "Contact Us", href: "/contact-us" },
    ];

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined") {
                const currentScrollY = window.scrollY;

                // Threshold to prevent flickering (e.g., 50px)
                if (Math.abs(currentScrollY - lastScrollY) < 10) return;

                if (window.innerWidth >= 1025) {
                    if (currentScrollY > lastScrollY && currentScrollY > 150) {
                        setIsVisible(false); // Scrolling down
                    } else {
                        setIsVisible(true); // Scrolling up
                    }
                    setLastScrollY(currentScrollY);
                } else {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden"; // Also lock html tag
            document.body.style.touchAction = "none"; // Disable touch scroll
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.touchAction = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.touchAction = "";
        };
    }, [isMenuOpen]);

    return (
        <>
            <header
                className={`${cabin.className} w-full bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-[10020] transition-transform duration-500 ease-in-out ${isVisible ? "translate-y-0" : "xl:-translate-y-full"}`}
            >
                {/* ================= TOP BAR ================= */}
                <div className="hidden xl:flex w-full px-6 lg:px-10 h-16 items-center justify-between relative">
                    {/* LOGO - Hanging over Top and Nav Bar */}
                    <div className="absolute left-6 lg:left-10 top-0 z-[10025]">
                        <div className="relative w-72 h-28 lg:w-80 lg:h-32">
                            <Link href="/">
                                <Image
                                    src="/Images/aspgf-logo.png"
                                    alt="ASPGF Logo"
                                    fill
                                    className="object-contain cursor-pointer"
                                    priority
                                />
                            </Link>
                        </div>
                    </div>

                    <div>{/* Empty space for logo */}</div>

                    {/* CONTACT INFO */}
                    <div className="hidden lg:flex items-center gap-6 ml-auto text-[12px]">
                        {/* CIN Number */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#00715D]/10 flex items-center justify-center">
                                <span className={`${nunito.className} text-[#00715D] font-black text-[10px]`}>CIN</span>
                            </div>
                            <div>
                                <p className={`${nunito.className} text-gray-400 font-bold uppercase tracking-tighter`}>Corporate ID</p>
                                <p className={`${cabin.className} font-extrabold text-[#1A2E35]`}>U85499PN2025NPL237590</p>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-200" />

                        {/* Phone */}
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-[#00715D]" />
                            <div>
                                <p className={`${nunito.className} text-gray-400 font-bold uppercase tracking-tighter`}>Helpline</p>
                                <a
                                    href="tel:+919684001643"
                                    className="hover:underline"
                                >
                                    <p
                                        className={`${cabin.className} font-extrabold text-[#1A2E35]`}
                                    >
                                        9684001643
                                    </p>
                                </a>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-200" />

                        {/* Email */}
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="text-[#00715D]" />
                            <div>
                                <p className={`${nunito.className} text-gray-400 font-bold uppercase tracking-tighter`}>Send email</p>
                                <a
                                    href="mailto:project.director@aspgf.org"
                                    className="hover:underline"
                                >
                                    <p
                                        className={`${cabin.className} font-extrabold text-[#1A2E35] lowercase`}
                                    >
                                        project.director@aspgf.org
                                    </p>
                                </a>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-200" />

                        {/* Location */}
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-[#00715D]" />
                            <div>
                                <p className={`${nunito.className} text-gray-400 font-bold uppercase tracking-tighter`}>Baner</p>
                                <p
                                    className={`${cabin.className} font-extrabold text-[#1A2E35]`}
                                >
                                    Pune, India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= NAV BAR ================= */}
                <div className="hidden xl:flex w-full items-stretch">
                    {/* LEFT SPACER (aligns curve visually) */}
                    <div className="hidden xl:block w-[15%] ml-60" />

                    <nav className="bg-[#00735C] flex-1 flex items-center px-10 rounded-tl-[45px] h-16">
                        <ul className="flex items-center gap-16 text-white font-bold text-[15px] tracking-wide">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li
                                        key={link.name}
                                        className="transition-colors hover:scale-110 hover:duration-100 group"
                                    >
                                        <Link
                                            href={link.href}
                                            className={`cursor-pointer whitespace-nowrap transition-all duration-300 ${isActive
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

                    {/* DONATE BUTTON */}
                    <Link
                        href="/donate-us"
                        className="h-16 px-10 bg-[#A828C6] hover:bg-[#9122AB] transition-all flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest cursor-pointer whitespace-nowrap"
                    >
                        <HandHeart size={22} strokeWidth={2.5} />
                        <span>Donate</span>
                    </Link>

                </div>

                {/* ================= MOBILE HEADER ================= */}
                <div className="xl:hidden flex items-center justify-between px-6 md:px-10 h-20 bg-white shadow-sm">
                    <Link href="/" className="relative w-56 h-14 md:w-64 md:h-16">
                        <Image
                            src="/Images/aspgf-logo.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-[#00735C] hover:bg-gray-100 rounded-lg transition-all"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

            </header>

            {/* MOBILE MENU OVERLAY */}
            <div
                className={`xl:hidden fixed inset-0 bg-[#00000080] backdrop-blur-sm transition-all duration-300 z-[10010] ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />            <div
                className={`xl:hidden fixed top-0 right-0 h-full w-[85%] md:w-[400px] bg-white shadow-2xl transition-transform duration-500 ease-in-out z-[10015] ${isMenuOpen ? "translate-x-0" : "translate-x-full"
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
                                        className={`${nunito.className} text-xl font-extrabold transition-colors flex items-center justify-between group ${isActive ? "text-[#00735C]" : "text-[#1A2E35] xl:hover:text-[#00735C]"
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                        <div
                                            className={`w-2 h-2 rounded-full bg-[#00735C] transition-opacity ${isActive ? "opacity-100" : "opacity-0 xl:group-hover:opacity-100"
                                                }`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="space-y-6 mt-4">
                        <Link
                            href="/donate-us"
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full py-4 bg-[#A828C6] text-white rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-[0.1em] shadow-lg shadow-purple-500/20"
                        >
                            <HandHeart size={22} strokeWidth={2.5} />
                            <span>Donate Us</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
