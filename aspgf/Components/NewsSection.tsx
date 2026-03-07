"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Caveat, Nunito, Cabin } from "next/font/google";
import { newsData } from "@/data/newsData";
import { useRouter } from "next/navigation";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function NewsSection() {
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

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "i" || e.key === "I") setShowInfo((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedIndex]);

  const selectedNews = selectedIndex !== null ? newsData[selectedIndex] : null;

  return (
    <section
      id="news"
      className="w-full bg-[#F8F5EF] py-24 px-6 md:px-20 lg:px-8 lg:pl-[120px] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* LEFT SIDE CONTENT */}
          <div className="max-w-xl flex-shrink-0">
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
              className={`${cabin.className} text-gray-500 leading-relaxed text-[17px] opacity-90 flex flex-col`}
            >
              Many Maharashtrian and Indian News paper covers{" "}
              <span
                className={`${cabin.className} text-gray-500 leading-relaxed text-[17px] opacity-90`}
              >
                the news of the charity events
              </span>
            </p>

            <button
              onClick={() => router.push("/News")}
              className={`${cabin.className} cursor-pointer mt-4 px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] hover:shadow-[0_8px_30px_rgb(0,110,87,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider  `}
            >
            Read More
            </button>
          </div>

          {/* RIGHT SIDE INFINITE MARQUEE SLIDER */}
          <div className="relative flex-grow overflow-hidden w-full lg:w-auto">
            <div className="flex animate-news-marquee hover:pause whitespace-nowrap py-10">
              {[1, 2, 3].map((set) => (
                <div key={`set-${set}`} className="flex gap-6 px-3">
                  {newsData.map((card, i) => (
                    <NewsCard
                      key={`news-${set}-${i}`}
                      card={card}
                      onOpen={() => setSelectedIndex(i)}
                    />
                  ))}
                </div>
              ))}
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
            transform: translateX(-33.333%);
          }
        }

        .animate-news-marquee {
          animation: news-marquee 6s linear infinite;
        }

        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function NewsCard({ card, onOpen }: any) {
  return (
    <div
      className="w-[250px] md:w-[290px] group relative bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-4 left-4 bg-[#006e57] text-white px-4 py-1.5 rounded-full text-[12px] font-bold">
          {card.date}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#006e57]/95 via-[#006e57]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
        <div
          className={`${cabin.className} flex items-center gap-2 text-white text-[13px]`}
        >
          <MapPin size={14} /> {card.location}
        </div>

        <h3
          className={`${nunito.className} text-white text-[20px] font-extrabold`}
        >
          {card.title}
        </h3>

        <button
          className="text-white text-[14px] font-bold border-b border-white/30"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          Read Full Story
        </button>
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
