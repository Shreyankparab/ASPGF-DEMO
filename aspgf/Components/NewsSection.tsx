"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Caveat, Nunito, Cabin } from "next/font/google";
import { newsData } from "@/data/newsData";
import NewsModal from "./News/NewsModal";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function NewsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const scrollNode = scrollRef.current;
    if (scrollNode) {
      scrollNode.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();
    }
    return () => scrollNode?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 274 : 314;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
      // Small timeout to check scroll after animation
      setTimeout(checkScroll, 500);
    }
  };



  return (
    <section
      id="news"
      className="w-full bg-[#F8F5EF] py-12 md:py-24 overflow-hidden relative"
    >
      <div className="w-full flex flex-col lg:flex-row items-start justify-between">

        {/* LEFT SIDE CONTENT - Fixed width and clear boundaries */}
        <div className="relative w-full lg:w-[580px] flex-shrink-0 px-6 md:px-20 lg:px-0 lg:pl-[128px] lg:pt-10 z-10 bg-[#F8F5EF]">
          <div className="flex items-center gap-2 mb-4">
            <h3
              className={`${caveat.className} text-[#6f7775] font-bold text-[24px] mt-1`}
            >
              News & Events
            </h3>
          </div>

          <h2
            className={`${nunito.className} text-[#0B4635] text-4xl md:text-5xl font-extrabold leading-[1.15] mb-6`}
          >
            News covered <br />
            by popular <br />
            News Media
          </h2>

          <p
            className={`${cabin.className} text-gray-500 leading-relaxed text-[17px] opacity-90 flex flex-col mb-2 lg:mb-8`}
          >
            Many Maharashtrian and Indian News paper covers{" "}
            <span
              className={`${cabin.className} text-gray-500 leading-relaxed text-[17px] opacity-90`}
            >
              the news of the charity events
            </span>
          </p>

          <div className="hidden lg:block">
            <button
              className={`${cabin.className} mt-10 px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] shadow-lg shadow-[#006e57]/20 hover:scale-105 transition-transform`}
            >
              Discover More
            </button>
          </div>
        </div>

        {/* RIGHT SIDE INFINITE MARQUEE SLIDER - Starts AFTER text, bleeds to edge */}
        <div className="relative flex-1 w-full lg:w-auto overflow-visible mt-0 lg:mt-0">
          <div
            ref={scrollRef}
            className="flex desktop-marquee hover:pause whitespace-nowrap pt-4 md:pt-10 pb-24 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory md-no-snap pl-8 lg:pl-10"
          >
            <div className="flex gap-6 px-3">
              {newsData.map((card, i) => (
                <div key={`news-wrap-${i}`} className="snap-start flex-shrink-0">
                  <NewsCard
                    card={card}
                    onOpen={() => {
                      setModalInitialIndex(i);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Only extra sets for desktop marquee animation */}
            <div className="hidden md:flex gap-6 px-3">
              {newsData.map((card, i) => (
                <div key={`news-wrap-set2-${i}`} className="snap-start flex-shrink-0">
                  <NewsCard
                    card={card}
                    onOpen={() => {
                      setModalInitialIndex(i);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Manual Navigation & Discover More Row */}
          <div className="absolute bottom-4 left-8 right-8 flex items-center justify-between gap-4 z-20">
            {/* Mobile Only: Scaled Discover More Button */}
            <button
              className={`${cabin.className} lg:hidden px-10 py-3.5 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] shadow-lg shadow-[#006e57]/20 active:scale-95 hover:scale-105 transition-all flex-shrink-0`}
            >
              Discover More
            </button>

            {/* Navigation Arrows Group */}
            <div className="flex items-center gap-2 lg:gap-3 ml-auto">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full bg-white shadow-md border border-gray-100 text-[#00715D] transition-all duration-300 group ${!canScrollLeft ? "opacity-30 cursor-not-allowed grayscale" : "hover:bg-[#00715D] hover:text-white active:scale-90"}`}
                aria-label="Scroll Left"
              >
                <ArrowLeft size={18} className={`${canScrollLeft ? "group-hover:-translate-x-1" : ""} transition-transform`} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`p-3 rounded-full bg-white shadow-md border border-gray-100 text-[#00715D] transition-all duration-300 group ${!canScrollRight ? "opacity-30 cursor-not-allowed grayscale" : "hover:bg-[#00715D] hover:text-white active:scale-90"}`}
                aria-label="Scroll Right"
              >
                <ArrowRight size={18} className={`${canScrollRight ? "group-hover:translate-x-1" : ""} transition-transform`} />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* ------------------------------------------------- */}

      <style jsx>{`
        @keyframes news-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .hover\\:pause:hover {
          animation-play-state: paused;
        }

        @media (min-width: 768px) {
          .desktop-marquee {
            animation: news-marquee 40s linear infinite;
            width: fit-content !important;
          }
          .md-no-snap {
            scroll-snap-type: none !important;
            overflow-x: hidden !important;
          }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* News Modal */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={newsData}
        initialIndex={modalInitialIndex}
      />
    </section >
  );
}

function NewsCard({ card, onOpen }: any) {
  return (
    <div
      className="w-[250px] md:w-[290px] group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
      onClick={onOpen}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Persistent Date Tag */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#006e57] px-4 py-1.5 rounded-full text-[11px] font-black shadow-sm z-10 transition-colors group-hover:bg-[#006e57] group-hover:text-white">
          {card.date}
        </div>

        {/* THEMED GRADIENT OVERLAY - ALWAYS SEMI-VISIBLE, FULL ON HOVER */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#006e57] via-[#006e57]/40 to-transparent opacity-60 group-hover:opacity-100 transition-all duration-500" />
      </div>

      {/* CONTENT OVERLAY */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 whitespace-normal">
        <div
          className={`${cabin.className} flex items-center gap-2 text-white/90 text-[12px] font-bold mb-2`}
        >
          <MapPin size={14} className="text-[#3ed0a6]" /> {card.location}
        </div>

        <h3
          className={`${nunito.className} text-white text-[18px] md:text-[21px] font-black leading-tight mb-4 line-clamp-2 whitespace-normal`}
        >
          {card.title}
        </h3>

        <div className="flex items-center gap-2 text-[#3ed0a6] text-[14px] font-black group-hover:text-white transition-colors duration-300">
          <span className="border-b-2 border-[#3ed0a6]/50 group-hover:border-white/70">Read More</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
