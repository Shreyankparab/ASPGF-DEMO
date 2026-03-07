"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { newsData, Category, NewsItem } from "@/data/newsData";
import Image from "next/image";
import {
    FiCalendar,
    FiMapPin,
    FiX,
    FiArrowLeft,
    FiArrowRight,
} from "react-icons/fi";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Caveat, Nunito, Cabin, Manrope } from "next/font/google";

const categories: Category[] = ["All", "Health", "Old Age", "Education"];

const caveat = Caveat({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });
const cabin = Cabin({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function NewsComponent() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [zoom, setZoom] = useState(1);
    const [panY, setPanY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [showInfo, setShowInfo] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [direction, setDirection] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);

    const gridRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const tagRef = useRef<HTMLSpanElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

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

    /* PREVENT BODY SCROLL WHEN MODAL IS OPEN */
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup function to ensure scroll is restored if component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedIndex]);

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
        setDirection(1);
        setSelectedIndex(
            selectedIndex === 0 ? filteredData.length - 1 : selectedIndex - 1,
        );
        setZoom(1);
        setPanY(0);
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex === null) return;
        setDirection(-1);
        setSelectedIndex(
            selectedIndex === filteredData.length - 1 ? 0 : selectedIndex + 1,
        );
        setZoom(1);
        setPanY(0);
    };

    /* ANIMATE IMAGE TRANSITION */
    useEffect(() => {
        if (selectedIndex !== null && imageContainerRef.current) {
            gsap.fromTo(
                imageContainerRef.current,
                { opacity: 1, x: direction * 100 },
                { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [selectedIndex, direction]);

    /* SWIPE HANDLERS */
    const onTouchStart = (e: React.TouchEvent) => {
        if (zoom > 1) return; // Disable swipe when zoomed
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (zoom > 1) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }
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

    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 when filtering changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedNews = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="bg-[#f5f5f5]">
            {/* HEADER */}
            <div className="bg-[#0f766e] py-16 text-white text-center relative">
                <div className="flex justify-center mb-4">
                    <span ref={tagRef} className={`${caveat.className} text-2xl text-white`}>
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
            <div className="py-12 text-center px-6">
                {/* Mobile Dropdown */}
                <div className="md:hidden mb-8 relative max-w-[280px] mx-auto z-30">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`${nunito.className} w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-bold text-[#1A2E35] shadow-sm transition-all focus:border-[#0f766e]`}
                    >
                        <span>{activeCategory}</span>
                        <ChevronDown size={18} className={`text-[#0f766e] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute z-40 mt-2 w-full rounded-xl border border-gray-100 bg-white shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`${nunito.className} w-full text-left px-5 py-3.5 text-sm font-semibold transition-colors ${activeCategory === cat
                                        ? "bg-[#0f766e]/5 text-[#0f766e]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-[#0f766e]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop Categories */}
                <div className="hidden md:flex justify-center gap-10 flex-wrap mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`${nunito.className} text-lg transition ${activeCategory === cat
                                ? "font-extrabold text-[#0f766e]"
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
                    className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 mb-12"
                >
                    {paginatedNews.map((item, index) => (
                        <div
                            key={item.id}
                            className="card group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg w-full max-w-[380px]"
                            onClick={() => setSelectedIndex((currentPage - 1) * ITEMS_PER_PAGE + index)}
                        >
                            <div className="relative w-full overflow-hidden bg-white">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={500}
                                    height={700}
                                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* OVERLAY */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white text-left">
                                <p
                                    className={`${cabin.className} flex items-center justify-start gap-4 text-xs mb-2 opacity-90`}
                                >
                                    <span className="flex items-center gap-1.5">
                                        <FiCalendar size={12} className="text-[#3ed0a6]" />
                                        {item.date}
                                    </span>

                                    <span className="flex items-center gap-1.5">
                                        <FiMapPin size={12} className="text-[#3ed0a6]" />
                                        {item.location}
                                    </span>
                                </p>

                                <h3
                                    className={`${nunito.className} text-lg font-bold leading-tight`}
                                >
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pb-10">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-500 hover:border-[#0f766e] hover:text-[#0f766e] disabled:opacity-40 transition-all bg-white"
                        >
                            <ChevronLeft size={14} /> Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${currentPage === page
                                    ? "bg-[#0f766e] text-white shadow-md"
                                    : "bg-white border border-gray-200 text-gray-500 hover:border-[#0f766e] hover:text-[#0f766e]"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-500 hover:border-[#0f766e] hover:text-[#0f766e] disabled:opacity-40 transition-all bg-white"
                        >
                            Next <ChevronRight size={14} />
                        </button>
                    </div>
                )}
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
                    <div className="relative flex-grow h-full flex flex-col md:flex-row items-center justify-center p-2 md:p-12 overflow-hidden select-none">

                        {/* Mobile Navigation controls - repositioned to bottom row and sides */}
                        <div className="md:hidden absolute bottom-[5vh] left-0 right-0 flex justify-between px-6 z-[10001] pointer-events-none">
                            <button
                                onClick={handlePrev}
                                className="p-4 rounded-full bg-black/60 border border-white/20 text-white transition-all hover:scale-110 active:scale-90 pointer-events-auto shadow-lg"
                            >
                                <FiArrowLeft className="text-2xl" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="p-4 rounded-full bg-black/60 border border-white/20 text-white transition-all hover:scale-110 active:scale-90 pointer-events-auto shadow-lg"
                            >
                                <FiArrowRight className="text-2xl" />
                            </button>
                        </div>

                        {/* Desktop Side Navigation Buttons */}
                        <button
                            onClick={handlePrev}
                            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-all z-[10001] hover:scale-110 group"
                        >
                            <FiArrowLeft className="text-2xl group-hover:-translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-all z-[10001] hover:scale-110 group"
                        >
                            <FiArrowRight className="text-2xl group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Image Wrapper */}
                        <div
                            ref={imageContainerRef}
                            className={`relative w-full h-full transition-all duration-300 ease-out 
                ${zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
                            onClick={(e) => e.stopPropagation()}
                            onDoubleClick={toggleZoom}
                            onMouseDown={handleMouseDown}
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
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
