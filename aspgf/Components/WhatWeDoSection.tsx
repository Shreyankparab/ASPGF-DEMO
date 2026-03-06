"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaPlay, FaTrophy } from "react-icons/fa";
import { Caveat, Nunito, Cabin } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const tabContent: Record<string, { description: string; points: string[] }> =
    {
      Charity: {
        description:
          "Over the years, the foundation has undertaken several community-focused initiatives aimed at social welfare and inclusive development.",
        points: [
          "Aashadhi Wari Support Initiative",
          "Blind School Visit (Joy Distribution)",
          "Spreading Christmas Joy at Mauli Krupa Orphanage",
          "Scholarship Distribution Program",
        ],
      },
      "Focus Area": {
        description:
          "Our primary focus area is education, where we support students through scholarships, mentorship, and academic resources. The ASPG Foundation aims to create equal opportunities for deserving students and promote access to quality education for sustainable community development.",
        points: [
          "Eligibility: Applicant must generally be an Indian citizen.",
          "Family's annual income should not exceed the specified scholarship limit.",
          "Student must have obtained the required minimum qualifying marks in the previous examination.",
          "Scholarship support for deserving students to continue higher education.",
        ],
      },
      Goals: {
        description:
          "We are committed to long-term sustainability and systemic change through clearly defined objectives and measurable impact assessments.",
        points: [
          "Quality Education for All",
          "Universal Health Coverage",
          "Sustainable Livelihoods",
          "Inclusive Community Growth",
        ],
      },
    };

  const tabs = ["Charity", "Focus Area", "Goals"] as const;

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Charity");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(rightRef.current, {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      /* CHECKLIST STAGGER ANIMATION */
      gsap.from(listRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 md:px-20 lg:px-8 lg:pl-[120px] py-20 bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <div ref={leftRef}>
          {/* WHAT WE DO TAG */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-7 h-7 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/icon.svg"
                alt="What we do icon"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <p
              className={`${caveat.className} text-[#0b6a52] font-bold text-[24px] mt-1`}
            >
              What We Do
            </p>
          </div>

          {/* HEADING */}
          <h2
            className={`${nunito.className} text-[#0b6a52] text-3xl md:text-5xl font-extrabold leading-[1.15] mb-8 pr-4`}
          >
            Empowering Communities for a Sustainable Tomorrow
          </h2>

          {/* TABS */}
          <div className="flex flex-wrap gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${cabin.className} px-8 py-3 rounded-full font-extrabold text-[15px] tracking-wide transition-all duration-300 shadow-sm ${
                  activeTab === tab
                    ? "bg-[#0b6a52] text-white shadow-md"
                    : "bg-white text-[#1A2E35] border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* DESCRIPTION */}
          <p
            className={`${cabin.className} text-gray-500 leading-relaxed text-[15px] lg:text-[16px] mb-8 min-h-[60px]`}
          >
            {tabContent[activeTab].description}
          </p>

          {/* CHECK LIST */}
          <ul
            ref={listRef}
            className={`${nunito.className} space-y-5 text-[#1A2E35] font-bold text-[16px]`}
          >
            {tabContent[activeTab].points.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-4 animate-fadeUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mt-1 bg-[#0b6a52]/10 p-1 rounded-full">
                  <FaCheckCircle className="text-[#0b6a52] text-[15px]" />
                </div>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE IMAGES */}
        <div ref={rightRef} className="relative">
          {/* DOT PATTERN */}
          <div className="absolute -bottom-16 -left-16 opacity-30 -z-10">
            <Image
              src="/Images/dots-pattern.png"
              alt="dots"
              width={160}
              height={160}
            />
          </div>

          {/* Remaining UI unchanged */}
          <div className="relative flex items-center justify-center lg:justify-start">
            <div className="relative">
              {/* MAIN IMAGE */}
              <div className="relative w-[240px] h-[450px] md:w-[400px] md:h-[550px] overflow-hidden rounded-[40px]">
                <Image
                  src="/Images/WhatWeDo1.webp"
                  alt="Community"
                  fill
                  className="object-cover"
                />
              </div>

              {/* SERVING SINCE */}
              <div className="absolute bottom-[20%] -left-16 md:-left-28 bg-[#0b6a52] text-white p-4 md:p-5 rounded-xl shadow-lg w-[180px] md:w-[220px] z-30 flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaTrophy className="text-white text-lg md:text-xl" />
                </div>
                <div>
                  <p
                    className={`${cabin.className} text-[12px] md:text-[14px] font-bold tracking-wide leading-tight`}
                  >
                    Serving Since 2024
                  </p>
                  <p
                    className={`${cabin.className} text-[10px] md:text-[12px] opacity-80 font-medium`}
                  >
                    Committed to Social Impact.
                  </p>
                </div>
              </div>

              {/* SERVING COMMUNITIES */}
              <div className="absolute top-[12%] -right-24 md:-right-46 bg-[#0b6a52] text-white p-4 md:p-5 rounded-xl shadow-lg w-[160px] md:w-[200px] z-30">
                <p
                  className={`${nunito.className} text-[13px] md:text-[15px] font-extrabold leading-tight tracking-wide`}
                >
                  Serving Communities <br />
                  Through Compassion, <br />
                  Action & Sustainable <br />
                  Impact.
                </p>
              </div>

              {/* SECOND IMAGE */}
              <div className="absolute bottom-[-20px] right-[-20px] md:bottom-[-40px] md:right-[-60px] z-20">
                <div className="relative w-[165px] h-[225px] md:w-[225px] md:h-[300px]">
                  <div className="relative w-full h-full rounded-t-[30px] md:rounded-t-[45px] overflow-hidden border-2 md:border-4 border-white bg-white">
                    <Image
                      src="/Images/WhatWeDo2.webp"
                      alt="Kids"
                      fill
                      className="object-cover"
                    />

                    <div className="absolute bottom-[-2px] -left-5 -right-5 h-[45px] md:h-[70px] z-10">
                      <Image
                        src="/images/shape-3.svg"
                        alt="mask"
                        fill
                        className="object-cover scale-x-125"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT SIDE END */}
        </div>
      </div>
    </section>
  );
}
