"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Nunito, Cabin } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const manrope = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function FoundersSection() {
  return (
    <section className="w-full flex flex-col items-center py-16 bg-white">
      {/* HEADING */}
      <h2
        className={`${nunito.className} text-4xl md:text-5xl font-extrabold text-[#0b6a52] mb-12 text-center`}
      >
        Meet Our Founders
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <AnimatedCard
          name1="Dr. Sushant Patil"
          role="Founder"
          experience="20+ years of leadership in social development"
          image="/Images/SushantPatil.webp"
        />
        <AnimatedCard
          name1="Adv. Anuja Sushant"
          name2="Patil"
          role="Founder"
          experience="20+ years of experience in the education industry"
          image="/Images/AnujaPatil.webp"
        />
      </div>
    </section>
  );
}

/* CARD COMPONENT */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AnimatedCard({ name1, name2, role, experience, image }: any) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Entry on scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeUp");
        }
      },
      { threshold: 0.4 },
    );

    if (cardRef.current) observer.observe(cardRef.current);
  }, []);

  return (
    <div
      ref={cardRef}
      className="
        opacity-100
        relative group w-[330px] md:w-[380px] rounded-3xl overflow-hidden shadow-xl cursor-pointer
        transition-all duration-700
      "
    >
      {/* IMAGE */}
      <Image
        src={image}
        alt={name1}
        width={500}
        height={650}
        className="object-cover transition-all duration-700 group-hover:scale-110"
      />

      {/* DARK FADE LAYER */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t from-black/70 via-black/20 to-transparent
          opacity-100 group-hover:opacity-100
          transition-all duration-700
        "
      />

      {/* DEFAULT TEXT OVERLAY — NAME & ROLE (ALWAYS VISIBLE) */}
      <div
        className="
          absolute bottom-0 left-0 w-full
          p-6 text-white text-center
          bg-transparent backdrop-blur-none
          opacity-100 group-hover:opacity-0
          transition-all duration-700
        "
      >
        <h3
          className={`${nunito.className} text-[24px] font-extrabold leading-tight tracking-wide`}
        >
          {name1}
        </h3>

        {name2 && (
          <h3
            className={`${nunito.className} text-[24px] font-extrabold leading-tight tracking-wide`}
          >
            {name2}
          </h3>
        )}

        <p
          className={`${manrope.className} text-[16px] font-bold tracking-wide mt-2`}
        >
          {role}
        </p>
      </div>

      {/* HOVER TEXT OVERLAY — FULL DETAILS */}
      <div
        className="
          absolute bottom-0 left-0 w-full
          p-6 text-white text-center
          bg-white/20 backdrop-blur-xl
          opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100
          transform-gpu transition-all duration-500 ease-out
        "
      >
        <h3
          className={`${nunito.className} text-[26px] font-extrabold leading-tight tracking-wide`}
        >
          {name1}
        </h3>

        {name2 && (
          <h3
            className={`${nunito.className} text-[26px] font-extrabold leading-tight tracking-wide`}
          >
            {name2}
          </h3>
        )}

        <p
          className={`${manrope.className} text-[20px] font-bold tracking-wide mt-2`}
        >
          {role}
        </p>

        <p
          className={`${manrope.className} text-[14px] font-medium mt-3 opacity-90 leading-relaxed`}
        >
          {experience}
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex items-center justify-center gap-6 mt-5">
          <div className="bg-white rounded-full p-3 hover:scale-110 transition">
            <FaInstagram size={22} className="text-green-700" />
          </div>
          <div className="bg-white rounded-full p-3 hover:scale-110 transition">
            <FaLinkedin size={22} className="text-green-700" />
          </div>
          <div className="bg-white rounded-full p-3 hover:scale-110 transition">
            <FaXTwitter size={22} className="text-green-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
