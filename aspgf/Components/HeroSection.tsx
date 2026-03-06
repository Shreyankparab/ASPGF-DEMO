"use client";

import Image from "next/image";
import { Caveat, Nunito, Cabin } from "next/font/google";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HeroSection: React.FC = () => {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);




  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });


    tl.from(subtitleRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        titleRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        descRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        buttonRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      );
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex items-center">
      {/* BACKGROUND IMAGE */}
      <Image
        src="/Images/Hero.webp"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1440px] w-full px-6 md:px-10 lg:pl-[120px]">
        <div className="max-w-3xl">
          {/* SUBTITLE */}
          <p
            ref={subtitleRef}
            className={`${caveat.className} text-[#38b6a1] text-3xl font-bold mb-4`}
          >
            Always Donate for Humanity
          </p>

          {/* TITLE */}
          <h1
            ref={titleRef}
            className={`${nunito.className} text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6 md:mb-0`}
          >
            <span className="text-[#a020f0]">Empower change</span>, one act
            <br className="hidden md:block" /> of kindness at a time
          </h1>

          {/* DESCRIPTION */}
          <p
            ref={descRef}
            className={`${cabin.className} text-xl text-white mt-6 font-medium opacity-90 leading-relaxed`}
          >
            Working together to uplift communities and create lasting change.
          </p>

          {/* BUTTON */}
          <div ref={buttonRef} className="mt-10">
            <button
              className={`${cabin.className} px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] hover:shadow-[0_8px_30px_rgb(0,110,87,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider`}
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
