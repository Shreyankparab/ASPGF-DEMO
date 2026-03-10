"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Nunito, Cabin } from "next/font/google";
import { useRouter } from "next/navigation";

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
          image="/images/sushant-patil.png"
          link="/AboutUs#sushant-patil"
        />
        <AnimatedCard
          name1="Adv. Anuja Sushant"
          name2="Patil"
          role="Founder"
          experience="20+ years of experience in the education industry"
          image="/images/anuja-patil.png"
          link="/AboutUs#anuja-patil"
        />
      </div>
    </section>
  );
}

/* CARD COMPONENT */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AnimatedCard({ name1, name2, role, experience, image, link }: any) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

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

  // detect mobile click
  const handleClick = () => {
    if (window.innerWidth < 768) {
      if (isOpen) {
        router.push(link);
      } else {
        setIsOpen(true);
      }
    } else {
      router.push(link);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
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
          opacity-100
          transition-all duration-700
        "
      />

      {/* DEFAULT TEXT */}
      <div
        className={`
          absolute bottom-0 left-0 w-full
          p-6 text-white text-center
          bg-transparent backdrop-blur-none
          transition-all duration-700
          ${isOpen ? "opacity-0" : "opacity-100 group-hover:opacity-0"}
        `}
      >
        <h3 className={`${nunito.className} text-[24px] font-extrabold`}>
          {name1}
        </h3>

        {name2 && (
          <h3 className={`${nunito.className} text-[24px] font-extrabold`}>
            {name2}
          </h3>
        )}

        <p className={`${manrope.className} text-[16px] font-bold mt-2`}>
          {role}
        </p>
      </div>

      {/* HOVER / CLICK OVERLAY */}
      <div
        className={`
          absolute bottom-0 left-0 w-full
          p-8 text-white text-center
          bg-black/40 backdrop-blur-lg
          transform-gpu transition-all duration-500 ease-out flex flex-col items-center justify-center h-full
          ${isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100"
          }
        `}
      >
        <h3 className={`${nunito.className} text-[26px] font-extrabold`}>
          {name1}
        </h3>

        {name2 && (
          <h3 className={`${nunito.className} text-[26px] font-extrabold`}>
            {name2}
          </h3>
        )}

        <p className={`${manrope.className} text-[20px] font-bold mt-2`}>
          {role}
        </p>

        <p className={`${manrope.className} text-[14px] mt-3 opacity-90`}>
          {experience}
        </p>

        <button
          className="mt-6 px-6 py-2 bg-white text-[#0b6a52] rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            router.push(link);
          }}
        >
          Read Message
        </button>
      </div>
    </div>
  );
}

