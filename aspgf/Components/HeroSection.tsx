"use client";

import Image from "next/image";
import { Caveat, Nunito, Cabin } from "next/font/google";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HeroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(null);
  const handleScroll = () => {
    const element = document.getElementById("our-work");
    if (element) {
      // offset calculation (optional but helpful if you have a fixed header)
      const topOffset = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
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
        delay: 0.3,
      });

      // Subtle parallax or zoom on background image
      gsap.from(".hero-bg", {
        scale: 1.1,
        duration: 3,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[90vh] overflow-hidden flex items-center"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 hero-bg">
        <Image
          src={isMobile ? "/images/mobile-hero-img.svg" : "/images/hero5.svg"}
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        {/* Optional overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1440px] w-full px-6 md:px-10 lg:pl-[120px]">
        <div className="max-w-3xl hero-text">
          {/* SUBTITLE */}
          <p
            className={`${caveat.className} text-[#38b6a1] text-3xl font-bold mb-4`}
          >
            Always Donate for Humanity
          </p>

          {/* TITLE */}
          <h1
            className={`${nunito.className} text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6 md:mb-0`}
          >
            <span className="text-[#a020f0]">Empower change</span>, one act
            <br className="hidden md:block" /> of kindness at a time
          </h1>

          {/* DESCRIPTION */}
          <p
            className={`${cabin.className} text-xl text-white mt-6 font-medium opacity-90 leading-relaxed`}
          >
            Working together to uplift communities and create lasting change.
          </p>

          {/* BUTTON */}
          <div className="mt-10">
            <button
              onClick={handleScroll}
              className={`${cabin.className} cursor-pointer px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] hover:shadow-[0_8px_30px_rgb(0,110,87,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider`}
            >
              DISCOVER MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
