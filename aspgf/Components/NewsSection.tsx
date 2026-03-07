"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Caveat, Nunito, Cabin } from "next/font/google";
import { newsData } from "@/data/newsData";

import NewsModal from "./News/NewsModal";

import { useRouter } from "next/navigation";


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

  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  // Navigation handlers
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + newsData.length) % newsData.length : null,
    );
    setZoom(1);
    setPanY(0);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % newsData.length : null,
    );
    setZoom(1);
    setPanY(0);
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newZoom = zoom === 1 ? 1.5 : 1;
    setZoom(newZoom);
    if (newZoom === 1) setPanY(0);
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setIsDragging(true);
    setStartY(e.clientY - panY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom === 1) return;
    const newY = e.clientY - startY;
    setPanY(newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

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

              onClick={() => router.push("/News")}
              className={`${cabin.className} cursor-pointer mt-4 px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] hover:shadow-[0_8px_30px_rgb(0,110,87,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider  `}

            >
            Read More
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
}}

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


// PREMIUM INTERACTIVE MODAL

// {selectedNews && (
//   <div
//     className="fixed inset-0 z-[9999] flex flex-col md:flex-row bg-black/95 backdrop-blur-xl transition-all duration-500"
//     onClick={() => setSelectedIndex(null)}
//     onMouseMove={handleMouseMove}
//     onMouseUp={handleMouseUp}
//     onMouseLeave={handleMouseUp}
//   >
//     {/* Top Controls Bar */}
//     {/* <div className="absolute top-0 inset-x-0 h-16 md:h-20 flex items-center justify-between px-4 md:px-12 z-[10005] bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
//       <div className="flex items-center gap-4 pointer-events-auto">
//         <span
//           className={`${cabin.className} text-white/50 text-xs md:text-sm font-medium`}
//         >
//           {selectedIndex! + 1} / {newsData.length}
//         </span>
//       </div>

//       <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setShowInfo(!showInfo);
//           }}
//           className={`p-2.5 md:p-3 rounded-full transition-all hover:scale-110 active:scale-95 ${
//             showInfo
//               ? "bg-[#3ed0a6] text-black"
//               : "bg-white/10 text-white"
//           }`}
//         >
//           i
//         </button>

//         <button
//           onClick={toggleZoom}
//           className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 active:scale-95"
//         >
//           🔍
//         </button>

//         <button
//           onClick={() => setSelectedIndex(null)}
//           className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-all hover:scale-110 active:scale-95"
//         >
//           <X size={22} />
//         </button>
//       </div>
//     </div> */}

//     {/* MAIN VIEWPORT */}
//     <div className="relative flex-grow h-full flex items-center justify-center p-2 md:p-12 overflow-hidden select-none">
//       {/* PREV */}
//       <button
//         onClick={handlePrev}
//         className="absolute left-2 md:left-8 p-3 md:p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-all z-[10001]"
//       >
//         <ArrowLeft />
//       </button>

//       {/* NEXT */}
//       <button
//         onClick={handleNext}
//         className="absolute right-2 md:right-8 p-3 md:p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-all z-[10001]"
//       >
//         <ArrowRight />
//       </button>

//       {/* Image Wrapper */}
//       <div
//         className={`relative w-full h-full transition-all duration-300 ease-out ${
//           zoom > 1
//             ? isDragging
//               ? "cursor-grabbing"
//               : "cursor-grab"
//             : "cursor-zoom-in"
//         }`}
//         onClick={(e) => e.stopPropagation()}
//         onDoubleClick={toggleZoom}
//         onMouseDown={handleMouseDown}
//         style={{
//           transform: `scale(${zoom}) translateY(${panY}px)`,
//         }}
//       >
//         <Image
//           src={selectedNews.image}
//           alt={selectedNews.title}
//           fill
//           className="object-contain pointer-events-none"
//           priority
//         />
//       </div>
//     </div>

//     {/* SIDEBAR INFO */}
//     <div
//       className={`fixed md:relative bottom-0 right-0 h-[60vh] md:h-full bg-black/80 md:bg-white/5 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/10 transition-all duration-500 ease-in-out z-[10004]
// ${
//   showInfo
//     ? "translate-y-0 md:translate-x-0 w-full md:w-[450px]"
//     : "translate-y-full md:translate-x-full w-full md:w-0 overflow-hidden"
// }`}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <div className="p-6 md:p-12 h-full flex flex-col">
//         <div className="flex-grow flex flex-col justify-center">
//           <div className="flex items-center gap-4 mb-4">
//             <span className="flex items-center gap-2 text-[#3ed0a6] text-xs font-bold">
//               <Calendar size={14} /> {selectedNews.date}
//             </span>

//             <span className="flex items-center gap-2 text-white/50 text-xs font-bold">
//               <MapPin size={14} /> {selectedNews.location}
//             </span>
//           </div>

//           <h2
//             className={`${nunito.className} text-white text-2xl md:text-4xl font-black mb-6`}
//           >
//             {selectedNews.title}
//           </h2>

//           {/* NEXT NEWS */}
//           <div className="flex flex-col gap-6">
//             <h3
//               className={`${cabin.className} text-white/40 text-xs font-bold uppercase tracking-[0.2em]`}
//             >
//               Next News & Events
//             </h3>

//             <div className="flex flex-col gap-4 overflow-y-auto max-h-[40vh] pr-2">
//               {newsData.map((item, idx) => {
//                 if (idx === selectedIndex) return null;

//                 return (
//                   <div
//                     key={idx}
//                     onClick={() => {
//                       setSelectedIndex(idx);
//                       setZoom(1);
//                       setPanY(0);
//                     }}
//                     className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer"
//                   >
//                     <div className="relative w-16 h-16 rounded-xl overflow-hidden">
//                       <Image
//                         src={item.image}
//                         alt={item.title}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>

//                     <div className="flex flex-col gap-1">
//                       <span className="text-[#3ed0a6] text-[10px] font-bold uppercase">
//                         {item.date}
//                       </span>

//                       <h4
//                         className={`${nunito.className} text-white text-sm font-bold`}
//                       >
//                         {item.title}
//                       </h4>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

