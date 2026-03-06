"use client";

import { JSX, useEffect, useRef } from "react";
import { LineChart, Lightbulb, ThumbsUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: ["200", "500", "700"] });

export default function StatsSection(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const statRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade + Slide Animation (trigger on scroll)
      gsap.from(statRefs.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // when section reaches 80% of viewport
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
      });

      // Counter Animation (trigger on scroll)
      statRefs.current.forEach((el) => {
        const numberEl = el.querySelector<HTMLHeadingElement>(".counter");
        if (!numberEl) return;

        const finalValue = numberEl.dataset.value;
        if (!finalValue) return;

        const numericValue = parseInt(finalValue.replace(/\D/g, ""), 10);
        const suffix = finalValue.replace(/[0-9]/g, "");

        gsap.fromTo(
          numberEl,
          { innerText: 0 },
          {
            innerText: numericValue,
            duration: 2,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            onUpdate: function () {
              const value = Math.floor(
                Number((this.targets()[0] as HTMLElement).innerText),
              );
              numberEl.innerText = value + suffix;
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-12 md:pt-16 md:pb-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 text-center gap-12 md:gap-16 px-6">
        {/* Stat 1 */}
        <div
          ref={(el) => {
            if (el) statRefs.current[0] = el;
          }}
          className="flex flex-col items-center group"
        >
          <div className="w-20 h-20 rounded-full border-[3px] border-[#00735C] flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 shadow-sm">
            <LineChart className="text-[#00735C] text-2xl" />
          </div>
          <h2
            className={`${lexend.className} counter text-[64px] font-black text-[#1A2E35] leading-none mb-3`}
            data-value="98%"
          >
            0
          </h2>
          <p className={`${lexend.className} text-gray-500 font-bold uppercase tracking-[0.2em] text-[13px]`}>
            Company Success
          </p>
        </div>

        {/* Stat 2 */}
        <div
          ref={(el) => {
            if (el) statRefs.current[1] = el;
          }}
          className="flex flex-col items-center group"
        >
          <div className="w-20 h-20 rounded-full border-[3px] border-[#00735C] flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 shadow-sm">
            <Lightbulb className="text-[#00735C] text-2xl" />
          </div>
          <h2
            className={`${lexend.className} counter text-[64px] font-black text-[#1A2E35] leading-none mb-3`}
            data-value="565+"
          >
            0
          </h2>
          <p className={`${lexend.className} text-gray-500 font-bold uppercase tracking-[0.2em] text-[13px]`}>
            Company Strategies
          </p>
        </div>

        {/* Stat 3 */}
        <div
          ref={(el) => {
            if (el) statRefs.current[2] = el;
          }}
          className="flex flex-col items-center group"
        >
          <div className="w-20 h-20 rounded-full border-[3px] border-[#00735C] flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 shadow-sm">
            <ThumbsUp className="text-[#00735C] text-2xl" />
          </div>
          <h2
            className={`${lexend.className} counter text-[64px] font-black text-[#1A2E35] leading-none mb-3`}
            data-value="36k"
          >
            0
          </h2>
          <p className={`${lexend.className} text-gray-500 font-bold uppercase tracking-[0.2em] text-[13px]`}>
            Complete Projects
          </p>
        </div>
      </div>
    </section>
  );
}
