"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { Nunito, Cabin, Caveat } from "next/font/google";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { videoStories, type ImpactVideoStory } from "@/data/impactData";
import { Play, X, Info, MapPin } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export default function ImpactSection() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<ImpactVideoStory | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % videoStories.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + videoStories.length) % videoStories.length,
    );
  }, []);

  /* AUTO SLIDE LOGIC with Manual Reset */
  useEffect(() => {
    if (activeVideo) return; // Pause auto-slide when modal is open

    const interval = setInterval(() => {
      nextSlide();
    }, 8000); // 8 seconds delay

    // Reset timer whenever index changes (manual or auto)
    // This prevents sudden jumps right after a manual click
    return () => clearInterval(interval);
  }, [nextSlide, activeVideo, activeIndex]);

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

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : null;
  };

  /* PREVENT BODY SCROLL WHEN MODAL IS OPEN */
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeVideo]);

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
                      src="/images/quotation.svg"
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
            {/* BUTTON - Desktop Only */}
            <div className="mt-10 hidden lg:block">
              <button
                onClick={() => router.push("/impact")}
                className={`${cabin.className} cursor-pointer px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] hover:shadow-[0_8px_30px_rgb(0,110,87,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider  `}
              >
                Explore More
              </button>
            </div>
          </div>

          {/* RIGHT SLIDER WRAPPER */}
          <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-end">
            <div
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="w-full h-[470px] md:h-[600px] lg:h-[480px] relative flex items-center justify-center lg:justify-start lg:pl-10"
            >
              {videoStories.map((story, index) => {
                let diff = index - activeIndex;
                if (diff < 0) diff += videoStories.length;
                if (diff > 2) return null;

                return (
                  <div
                    key={story.id}
                    className={`impact-card absolute transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[24px] md:rounded-[32px] shadow-2xl overflow-hidden w-[95%] md:w-full max-w-[780px] bg-[#073D30] ${diff === 0 ? "cursor-default" : "cursor-pointer"}`}
                    style={{
                      zIndex: 30 - diff,
                      transform: `
                        translateX(${diff * (isMobile ? 15 : 40)}px) 
                        translateY(${diff * (isMobile ? -10 : 0)}px)
                        scale(${1 - diff * 0.08})
                      `,
                      opacity: 1 - diff * 0.35,
                      filter: `blur(${diff * 0.5}px)`,
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
                              setActiveVideo(story);
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
            <div className="flex flex-col lg:flex-row items-center gap-6 mt-4 md:mt-8 lg:mr-10">
              {/* BUTTON - Mobile Only */}
              <div className="lg:hidden">
                <button
                  onClick={() => router.push("/impact")}
                  className={`${cabin.className} cursor-pointer px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] hover:shadow-[0_8px_30px_rgb(0,110,87,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider  `}
                >
                  Explore More
                </button>
              </div>

              <div className="hidden lg:flex gap-4">
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
      </div>

      {/* VIDEO POPUP MODAL (Enhanced with Sidebar) */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 animate-in fade-in duration-300 backdrop-blur-md overflow-hidden"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full h-full max-w-[1600px] flex flex-col p-4 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 gap-4">
              <div className="flex flex-col min-w-0 flex-1">
                <span
                  className={`${caveat.className} text-[#00735C] text-xl font-bold italic`}
                >
                  Impact Stories
                </span>
                <h2
                  className={`${nunito.className} text-white text-xl md:text-3xl font-extrabold leading-tight`}
                >
                  {activeVideo.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className={`p-3 rounded-full transition-all hover:scale-110 active:scale-95 ${showSidebar ? "bg-[#00735C] text-black" : "bg-white/10 text-white"}`}
                  title="Toggle Stories"
                >
                  <Info size={16} className="md:w-6 md:h-6" />
                </button>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="text-white/60 hover:text-white transition-colors p-3 bg-white/10 rounded-full hover:bg-red-500/80 group"
                  title="Close View"
                >
                  <X
                    size={24}
                    className="md:w-8 md:h-8 group-rotate-90 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden items-stretch justify-center">
              {/* Left: Player Section - Wrapped in a container to maintain centering if needed */}
              <div
                className={`transition-all duration-500 ease-in-out flex flex-col justify-center gap-4 ${showSidebar ? "lg:w-3/4" : "lg:w-full"}`}
              >
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                  <iframe
                    src={getYoutubeEmbedUrl(activeVideo.videoUrl) || ""}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="hidden lg:flex items-center gap-6 p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 font-bold">
                    <MapPin size={18} className="text-[#00735C]" />
                    <span>{activeVideo.location}</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="text-gray-400 font-bold">
                    {activeVideo.year} | {activeVideo.duration}
                  </div>
                </div>
              </div>

              {/* Right: Sidebar Section */}
              <div
                className={`transition-all duration-500 ease-in-out flex flex-col bg-white/5 rounded-2xl border border-white/10 overflow-hidden ${showSidebar ? "lg:w-1/4 opacity-100" : "w-0 opacity-0 pointer-events-none border-none ml-[-2rem]"}`}
              >
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#00735C]">
                    <Play size={20} fill="currentColor" />
                    <h3
                      className={`${nunito.className} text-white font-bold text-lg`}
                    >
                      More Stories
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <X
                      size={16}
                      className="text-white/30 cursor-pointer hover:text-red-500 transition-colors"
                      onClick={() => setShowSidebar(false)}
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar min-h-0">
                  <div className="flex flex-col gap-4">
                    {videoStories.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => setActiveVideo(video)}
                        className={`group flex items-start gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${activeVideo.id === video.id
                          ? "bg-[#00735C]/20 ring-1 ring-[#00735C]"
                          : "hover:bg-white/10"
                          }`}
                      >
                        <div className="relative w-28 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play
                              size={16}
                              fill="currentColor"
                              className="text-white"
                            />
                          </div>
                          {activeVideo.id === video.id && (
                            <div className="absolute inset-0 bg-[#00735C]/60 flex items-center justify-center">
                              <div className="flex gap-1">
                                <span className="w-1 h-3 bg-white animate-bounce-slow"></span>
                                <span className="w-1 h-4 bg-white animate-bounce"></span>
                                <span className="w-1 h-2 bg-white animate-bounce-slow"></span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`${nunito.className} text-white font-bold text-sm line-clamp-2 leading-tight mb-1`}
                          >
                            {video.title}
                          </h4>
                          <span className="text-gray-500 text-[10px] uppercase font-black tracking-wider">
                            {video.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
