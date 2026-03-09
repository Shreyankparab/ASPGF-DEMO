"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Caveat, Nunito, Cabin } from "next/font/google";
import { allWorkItems } from "@/data/ourWorkData";
import { useRouter } from "next/navigation";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const OurWorkSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isHovered = useRef(false);

  // 1. Clone the data for seamless looping
  const duplicatedItems = [...allWorkItems, ...allWorkItems];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const halfWidth = scrollWidth / 2;

      // 2. Infinite Loop Logic:
      // If we scroll past the first set of items, jump back to the start of the first set
      if (scrollLeft >= halfWidth) {
        scrollRef.current.scrollLeft = scrollLeft - halfWidth;
      } else if (scrollLeft <= 0) {
        // If we scroll backwards past the start, jump to the end of the first set
        scrollRef.current.scrollLeft = halfWidth;
      }

      // Calculate progress based on the original list length
      const progress = (scrollLeft / halfWidth) * 100;
      setScrollProgress(progress % 100);
    }
  };

  const toggleCard = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isHovered.current && container) {
        // 3. Use requestAnimationFrame for buttery smooth 60fps movement
        container.scrollLeft += 1;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section
      id="our-work"
      className="relative w-full bg-white py-16 md:pt-32 md:pb-24 mt-[-1px] overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute top-0 left-0 w-full h-[75%] bg-[#125B49] z-0">
        <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-none z-30">
          <div className="relative w-full h-12 md:h-16 lg:h-20 scale-y-[-1]">
            <Image
              src="/images/shape-2.png"
              alt="Top ripped edge"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-30">
          <div className="relative w-full h-12 md:h-16 lg:h-20">
            <Image
              src="/images/shape-2.png"
              alt="Bottom ripped edge divider"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 lg:pl-[120px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`${caveat.className} text-[#ffffff] text-[20px] md:text-[24px] font-bold tracking-wide mt-1`}
              >
                Our Work
              </span>
            </div>
            <h2
              className={`${nunito.className} text-white text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] max-w-[600px]`}
            >
              Explore Our Successful Camping Work
            </h2>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start mt-4 md:mt-0">
            <button
              onClick={() => router.push("/OurWork")}
              className={`group ${cabin.className} cursor-pointer font-bold text-[14px] md:text-[16px] flex items-center gap-4 md:gap-6 bg-white hover:bg-gray-50 text-[#00715D] py-1 md:py-1.5 pl-6 md:pl-8 pr-1 md:pr-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 min-w-0 md:min-w-[220px] max-w-[240px] border border-white/20`}
            >
              <span className="flex-grow text-left">View our Works</span>
              <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#00715D] text-white transition-transform duration-500 group-hover:rotate-45 flex-shrink-0">
                <svg
                  width="18"
                  height="18"
                  className="md:w-[20px] md:h-[20px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-full relative z-20">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
          className="flex overflow-x-auto pb-6 gap-6 lg:gap-8 no-scrollbar select-none cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: "auto" }} // auto is better for continuous scripts
        >
          {/* Loop over duplicated items */}
          {duplicatedItems.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="flex-shrink-0 w-[85%] sm:w-[50%] md:w-[560px]"
              onClick={() => toggleCard(index)}
            >
              <div
                className="group relative w-full aspect-[3/4] sm:aspect-square md:aspect-[4/3] rounded-[5px] overflow-hidden border border-white/10 bg-white/5"
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  draggable={false}
                  className={`object-cover transition-transform duration-700 group-hover:scale-110 ${activeIndex === index ? "scale-110" : ""}`}
                />

                <div
                  className={`absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-white text-[13px] font-bold z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 ${activeIndex === index ? "opacity-100" : ""}`}
                >
                  {project.date}
                </div>

                <div
                  className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 ${activeIndex === index ? "opacity-100" : ""}`}
                />

                <div
                  className={`absolute inset-x-5 bottom-5 p-5 bg-white/15 backdrop-blur-xl rounded-[15px] border border-white/20 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-30 ${activeIndex === index ? "translate-y-0 opacity-100" : ""} mb-20 md:mb-0`}
                >
                  <h3
                    className={`${nunito.className} text-[22px] font-extrabold text-[#FFDA3D] mb-1`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`${cabin.className} text-white/90 text-[13.5px] leading-tight mb-4 font-medium line-clamp-2`}
                  >
                    {project.description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/OurWork#project-${project.id}`);
                    }}
                    className="flex items-center gap-3 cursor-pointer bg-[#00715D] hover:bg-[#008a73] text-white py-1.5 pl-5 pr-1.5 rounded-full font-bold text-sm min-w-[180px] justify-between border border-white/10 group/btn"
                  >
                    <span>View Our Work</span>
                    <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center text-[#125B49] transition-transform duration-300 group-hover/btn:rotate-45">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-[16px] h-[16px]"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scrollbar Indicator */}
        <div className="flex justify-center mt-6 mb-4 px-8">
          <div className="w-full max-w-[1000px] h-[5px] bg-gray-100 rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 bottom-0 w-[30%] bg-[#125B49] rounded-full transition-all duration-150 ease-out"
              style={{ left: `${scrollProgress * 0.7}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default OurWorkSection;
