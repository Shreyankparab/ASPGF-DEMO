"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Caveat, Nunito, Cabin } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function AboutHero() {
    const [isMobile, setIsMobile] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Smooth reveal for hero content
            gsap.from(".hero-text > *", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.3
            });

            // Subtle parallax or zoom on background image
            gsap.from(".hero-bg", {
                scale: 1.1,
                duration: 3,
                ease: "power2.out"
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex items-center"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 hero-bg">
                <Image
                    src={isMobile ? "/images/hero-image-about-us.svg" : "/images/about_hero.webp"}
                    alt="Happy children in community"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
                <div className="hero-text max-w-2xl">
                    {/* Main Heading */}
                    <h1 className={`${nunito.className} text-white text-[38px] md:text-[56px] font-extrabold leading-[1.1] mb-6 tracking-tight`}>
                        Committed To Purpose,<br />
                        Guided By Integrity
                    </h1>

                    {/* Decorative White Line (40% style) */}
                    <div className="h-1 w-48 bg-white opacity-90 rounded-full mb-8"></div>

                    {/* About Us Label */}
                    <p className={`${caveat.className} text-white text-3xl md:text-4xl mb-2 font-normal italic`}>
                        About Us
                    </p>

                    {/* Green Accent Line */}
                    <div className="h-[2px] w-full max-w-[400px] bg-[#00735C] opacity-80 mb-6"></div>

                    {/* Description Paragraph */}
                    <p className={`${cabin.className} text-white/90 text-[15px] md:text-[18px] font-medium leading-relaxed max-w-lg`}>
                        Working Towards Inclusive Development Through Education, Outreach, And Community Engagement
                    </p>
                </div>
            </div>
        </section>
    );
}
