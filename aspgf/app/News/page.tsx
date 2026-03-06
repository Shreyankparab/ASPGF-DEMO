"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { newsData, Category, NewsItem } from "@/Components/newsData";
import Image from "next/image";
import {
  FiCalendar,
  FiMapPin,
  FiX,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { Caveat, Nunito, Cabin, Manrope } from "next/font/google";

const categories: Category[] = ["All", "Health", "Old Age", "Education"];

const caveat = Caveat({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });
const cabin = Cabin({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function NewsEvents() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  const filteredData =
    activeCategory === "All"
      ? newsData
      : newsData.filter((item) => item.category === activeCategory);

  const selectedNews =
    selectedIndex !== null ? filteredData[selectedIndex] : null;

  /* GRID ANIMATION */
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      },
    );
  }, [activeCategory]);

  /* TEXT REVEAL */
  useEffect(() => {
    const animateText = (el: HTMLElement | null) => {
      if (!el) return;

      const words = el.innerText.split(" ");

      el.innerHTML = words
        .map(
          (word) =>
            `<span style="display:inline-block;overflow:hidden">
              <span style="display:inline-block">${word}</span>
            </span>`,
        )
        .join(" ");

      const inner = el.querySelectorAll("span span");

      gsap.from(inner, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    animateText(tagRef.current);
    animateText(headingRef.current);
  }, []);

  /* NAVIGATION */
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === 0 ? filteredData.length - 1 : selectedIndex - 1,
    );
    setZoom(1);
    setPanY(0);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === filteredData.length - 1 ? 0 : selectedIndex + 1,
    );
    setZoom(1);
    setPanY(0);
  };

  const toggleZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoom(zoom === 1 ? 2 : 1);
    setPanY(0);
  };

  const handleMouseDown = () => {
    if (zoom > 1) setIsDragging(true);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanY((prev) => prev + e.movementY);
  };

  return (
    <div className="bg-[#f5f5f5]">
      {/* HEADER */}
      <div className="bg-[#0f766e] py-16 text-white text-center relative">
        <div className="flex justify-center mb-4">
          <span ref={tagRef} className={`${caveat.className} text-2xl`}>
            News & Events
          </span>
        </div>

        <h2
          ref={headingRef}
          className={`${nunito.className} text-4xl font-bold`}
        >
          Community-focused work for a better tomorrow.
        </h2>

        <div className="absolute bottom-0 left-0 w-full h-2 bg-[#A828C6]" />
      </div>

      {/* FILTER */}
      <div className="py-12 text-center">
        <div className="flex justify-center gap-10 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${nunito.className} text-lg transition ${
                activeCategory === cat
                  ? "font-bold text-[#0f766e]"
                  : "text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div
          ref={gridRef}
          className="grid gap-8 max-w-6xl mx-auto px-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          }}
        >
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className="card group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={380}
                className="w-full h-[380px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
                <p
                  className={`${cabin.className} flex items-center justify-center gap-6 text-sm mb-2`}
                >
                  <span className="flex items-center gap-2">
                    <FiCalendar size={14} />
                    {item.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <FiMapPin size={14} />
                    {item.location}
                  </span>
                </p>

                <h3
                  className={`${nunito.className} text-lg font-semibold text-center`}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PREMIUM INTERACTIVE MODAL */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col md:flex-row bg-black/95 backdrop-blur-xl transition-all duration-500"
          onClick={() => setSelectedIndex(null)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Top Controls Bar */}
          <div className="absolute top-0 inset-x-0 h-16 md:h-20 flex items-center justify-between px-4 md:px-12 z-[10005] bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
            <div className="flex items-center gap-4 pointer-events-auto">
              <span
                className={`${manrope.className} text-white/50 text-xs md:text-sm font-medium`}
              >
                {selectedIndex! + 1} / {filteredData.length}
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
                className={`p-2.5 md:p-3 rounded-full transition-all hover:scale-110 active:scale-95 ${showInfo ? "bg-[#00715D] text-black" : "bg-white/10 text-white"}`}
                title="Toggle Information"
              >
                <svg
                  width="18"
                  height="18"
                  className="md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </button>
              <button
                onClick={toggleZoom}
                className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 active:scale-95"
                title="Toggle Zoom"
              >
                <svg
                  width="18"
                  height="18"
                  className="md:w-5 md:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-all hover:scale-110 active:scale-95 group"
                title="Close"
              >
                <FiX className="text-lg md:text-2xl group-rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* MAIN VIEWPORT */}
          <div className="relative flex-grow h-full flex items-center justify-center p-2 md:p-12 overflow-hidden select-none">
            {/* Side Navigation Buttons - Mobile Optimized */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-8 p-3 md:p-4 rounded-full bg-[#] border border-white/10 text-white hover:bg-white/10 transition-all z-[10001] hover:scale-110 group"
            >
              <FiArrowLeft className="text-xl md:text-2xl group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-8 p-3 md:p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-all z-[10001] hover:scale-110 group"
            >
              <FiArrowRight className="text-xl md:text-2xl group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Image Wrapper */}
            <div
              className={`relative w-full h-full transition-all duration-300 ease-out 
                ${zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={toggleZoom}
              onMouseDown={handleMouseDown}
              style={{
                transform: `scale(${zoom}) translateY(${panY}px)`,
                maxWidth:
                  typeof window !== "undefined" &&
                  showInfo &&
                  window.innerWidth > 768
                    ? "calc(100% - 450px)"
                    : "100%",
              }}
            >
              <Image
                src={selectedNews.image}
                alt={selectedNews.title}
                fill
                className="object-contain pointer-events-none  "
                priority
              />
            </div>
          </div>

          {/* SIDEBAR / DRAWER INFO PANEL */}
          <div
            className={`fixed md:relative bottom-0 right-0 h-[60vh] md:h-full bg-black/80 md:bg-white/5 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/10 transition-all duration-500 ease-in-out z-[10004] 
              ${showInfo ? "translate-y-0 md:translate-x-0 w-full md:w-[450px]" : "translate-y-full md:translate-x-full w-full md:w-0 overflow-hidden"}
              ${selectedIndex === null ? "pointer-events-none" : "pointer-events-auto"}
            `}
            onClick={(e) => e.stopPropagation()}
          >
             {/* Small Dismiss Icon */}
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-4 right-4 p-2 text-white/30 hover:text-white transition-colors z-[10005] md:hidden"
              title="Close Panel"
            >
              <FiX size={20} />
            </button>

            <div className="p-6 md:p-12 h-full flex flex-col">
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={`${manrope.className} flex items-center gap-2 text-[#00715D] text-[10px] md:text-xs font-bold uppercase tracking-widest bg-[#3ed0a6]/10 px-3 py-1 rounded-full`}
                  >
                    <FiCalendar size={14} /> {selectedNews.date}
                  </span>
                  <span
                    className={`${manrope.className} flex items-center gap-2 text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest`}
                  >
                    <FiMapPin size={14} /> {selectedNews.location}
                  </span>
                </div>
                <h2
                  className={`${nunito.className} text-white text-2xl md:text-4xl font-black mb-4 md:mb-6 leading-tight`}
                >
                  {selectedNews.title}
                </h2>
                <div className="w-16 md:w-20 h-1 bg-[#00715D] rounded-full mb-6 md:mb-10"></div>

                {/* NEXT NEWS SECTION */}
                <div className="flex flex-col gap-4 md:gap-6">
                  <h3
                    className={`${manrope.className} text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]`}
                  >
                    Next News & Events
                  </h3>

                  <div className="flex flex-col gap-3 md:gap-4 overflow-y-auto max-h-[25vh] md:max-h-[40vh] pr-2 no-scrollbar">
                    {filteredData.map((item, idx) => {
                      if (idx === selectedIndex) return null;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedIndex(idx);
                            setZoom(1);
                            setPanY(0);
                          }}
                          className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group/item cursor-pointer"
                        >
                          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 bg-black/20">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex flex-col gap-0.5 md:gap-1 overflow-hidden">
                            <span className="text-[#3ed0a6] text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                              {item.date}
                            </span>
                            <h4
                              className={`${nunito.className} text-white text-xs md:sm font-bold leading-tight line-clamp-1 md:line-clamp-2 group-hover/item:text-[#3ed0a6] transition-colors`}
                            >
                              {item.title}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 md:mt-auto md:pt-8 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold">
                  clipping {selectedIndex! + 1} of {filteredData.length}
                </p>
                <div className="flex gap-2">
                  <div className="w-1 h-0.5 bg-white/20 rounded-full"></div>
                  <div className="w-3 h-0.5 bg-[#00715D] rounded-full"></div>
                  <div className="w-1 h-0.5 bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
