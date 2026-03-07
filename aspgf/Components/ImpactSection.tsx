"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { Nunito, Cabin, Caveat } from "next/font/google";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { videoStories } from "@/data/impactData";
import gsap from "gsap";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export default function ImpactSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % videoStories.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + videoStories.length) % videoStories.length,
    );
  }, []);

  useEffect(() => {
    const cards = sliderRef.current?.querySelectorAll(".impact-card");
    if (cards) {
      gsap.to(cards, {
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
      });
    }
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart.current - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStart.current = null;
  };

  return (
    <section className="py-24 bg-[#FCFCFC] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[40%] text-left  md:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`${caveat.className} text-[#6f7775] text-2xl font-bold tracking-wide`}
              >
                Impact
              </span>
            </div>

            <div className="relative inline-block mb-8">
              <h2
                className={`${nunito.className} text-[#073D30] text-[36px] md:text-[56px] font-[900] leading-[1.1] tracking-tight`}
              >
                {/* First Line - whitespace-nowrap prevents breaking into two lines on desktop */}
                <span className="block whitespace-nowrap">
                  Why They Believe
                </span>

                {/* Second Line with SVG and Text */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="relative w-10 h-10 md:w-14 md:h-14 flex-shrink-0">
                    <Image
                      src="/images/Quattaion.svg"
                      alt="Quotation icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>In Us</span>
                </div>
              </h2>
            </div>

            <p
              className={`${cabin.className} text-gray-500 text-[17px] leading-relaxed max-w-[400px] opacity-90`}
            >
              Real stories from those who have witnessed meaningful change
              through our initiatives.
            </p>
          </div>

          {/* RIGHT SLIDER WRAPPER */}
          <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-end">
            <div
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full h-[550px] md:h-[600px] lg:h-[480px] relative flex items-center justify-center lg:justify-start lg:pl-10"
            >
              {videoStories.map((story, index) => {
                let diff = index - activeIndex;
                if (diff < 0) diff += videoStories.length;
                if (diff > 2) return null;

                return (
                  <div
                    key={story.id}
                    className="impact-card absolute transition-all duration-700 rounded-[24px] md:rounded-[32px] shadow-2xl overflow-hidden w-[95%] md:w-full max-w-[780px] bg-[#073D30]"
                    style={{
                      zIndex: 30 - diff,
                      transform: `translateX(${diff * 30}px) scale(${1 - diff * 0.06})`,
                      opacity: 1 - diff * 0.4,
                    }}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="flex h-full flex-col md:flex-row min-h-[420px]">
                      {/* IMAGE SIDE */}
                      <div className="w-full md:w-[45%] aspect-video md:aspect-auto relative p-3 md:p-4">
                        <div className="relative w-full h-full rounded-[18px] md:rounded-[24px] overflow-hidden group">
                          <Image
                            src={story.thumbnail}
                            alt={story.name}
                            fill
                            className="object-cover"
                          />
                          <div
                            className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveVideo(story.videoUrl);
                            }}
                          >
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-xl transition-transform duration-300 hover:scale-110">
                              <FaPlay
                                size={14}
                                className="md:text-[18px] translate-x-0.5"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CONTENT SIDE */}
                      <div className="w-full md:w-[55%] p-6 md:p-10 flex flex-col justify-center text-white">
                        <div className="mb-4 md:mb-6">
                          <p
                            className={`${cabin.className} text-[13px] md:text-[15px] lg:text-[16px] leading-[1.5] md:leading-[1.6] opacity-90 font-medium italic`}
                          >
                            "{story.description}"
                          </p>
                        </div>
                        <div className="mt-2">
                          <h4
                            className={`${nunito.className} text-[18px] md:text-[22px] font-extrabold tracking-tight`}
                          >
                            {story.name}
                          </h4>
                          <p
                            className={`${cabin.className} text-gray-400 text-[11px] md:text-[13px] font-medium opacity-80 mt-1 uppercase tracking-widest`}
                          >
                            {story.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NAVIGATION BUTTONS - POSITIONED BELOW RIGHT SECTION */}
            <div className="hidden lg:flex gap-4 mt-8 lg:mr-10">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-2 border-[#073D30] text-[#073D30] flex items-center justify-center hover:bg-[#073D30] hover:text-white transition-all duration-300 group"
              >
                <FaChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-[#073D30] text-white flex items-center justify-center hover:bg-[#0a5241] transition-all duration-300 shadow-md group"
              >
                <FaChevronRight className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO POPUP (Keep existing logic) */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-[900px] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-20 bg-white/90 text-black px-3 py-1 rounded-full text-sm font-bold"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>
            <iframe
              src={
                activeVideo
                  .replace("youtu.be/", "youtube.com/embed/")
                  .split("?")[0]
              }
              title="Impact Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
