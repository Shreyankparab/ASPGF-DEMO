"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import {
    FiCalendar,
    FiMapPin,
    FiX,
    FiArrowLeft,
    FiArrowRight,
} from "react-icons/fi";
import { NewsItem } from "@/data/newsData";
import { Nunito, Manrope, Cabin } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });
const cabin = Cabin({ subsets: ["latin"] });

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: NewsItem[];
    initialIndex: number;
}

export default function NewsModal({ isOpen, onClose, items, initialIndex }: NewsModalProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [zoom, setZoom] = useState(1);
    const [panY, setPanY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [showInfo, setShowInfo] = useState(true);
    const [direction, setDirection] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);

    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setSelectedIndex(initialIndex);
            setZoom(1);
            setPanY(0);
            document.body.style.overflow = "hidden";
        } else {
            setSelectedIndex(null);
            document.body.style.overflow = "auto";
        }
    }, [isOpen, initialIndex]);

    const selectedNews = selectedIndex !== null ? items[selectedIndex] : null;

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

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex === null) return;
        setDirection(1);
        setSelectedIndex(
            selectedIndex === 0 ? items.length - 1 : selectedIndex - 1,
        );
        setZoom(1);
        setPanY(0);
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex === null) return;
        setDirection(-1);
        setSelectedIndex(
            selectedIndex === items.length - 1 ? 0 : selectedIndex + 1,
        );
        setZoom(1);
        setPanY(0);
    };

    if (!isOpen || selectedIndex === null || !selectedNews) return null;

    const onTouchStart = (e: React.TouchEvent) => {
        if (zoom > 1) return;
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (zoom > 1) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrev();
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

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col md:flex-row bg-black/95 backdrop-blur-xl transition-all duration-500"
            onClick={onClose}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Top Controls Bar */}
            <div className="absolute top-0 inset-x-0 h-16 md:h-20 flex items-center justify-between px-4 md:px-12 z-[10005] bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <span className={`${manrope.className} text-white/50 text-xs md:text-sm font-medium`}>
                        {selectedIndex + 1} / {items.length}
                    </span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 pointer-events-auto">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowInfo(!showInfo);
                        }}
                        className={`p-2.5 md:p-3 rounded-full transition-all hover:scale-110 active:scale-95 ${showInfo ? "bg-[#00715D] text-black" : "bg-white/10 text-white"}`}
                    >
                        <InfoIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={toggleZoom}
                        className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 active:scale-95"
                    >
                        <ZoomIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2.5 md:p-3 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-all hover:scale-110 active:scale-95 group"
                    >
                        <FiX className="text-lg md:text-2xl group-rotate-90 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* MAIN VIEWPORT */}
            <div className="relative flex-grow h-full flex flex-col md:flex-row items-center justify-center p-2 md:p-12 overflow-hidden select-none">
                {/* Mobile Navigation */}
                <div className="md:hidden absolute bottom-[5vh] left-0 right-0 flex justify-between px-6 z-[10001] pointer-events-none">
                    <button
                        onClick={handlePrev}
                        className="p-4 rounded-full bg-black/60 border border-white/20 text-white pointer-events-auto"
                    >
                        <FiArrowLeft className="text-2xl" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="p-4 rounded-full bg-black/60 border border-white/20 text-white pointer-events-auto"
                    >
                        <FiArrowRight className="text-2xl" />
                    </button>
                </div>

                {/* Desktop Side Buttons */}
                <button
                    onClick={handlePrev}
                    className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-all z-[10001] hover:scale-110"
                >
                    <FiArrowLeft className="text-2xl" />
                </button>
                <button
                    onClick={handleNext}
                    className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/10 transition-all z-[10001] hover:scale-110"
                >
                    <FiArrowRight className="text-2xl" />
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
                        className="object-contain pointer-events-none"
                        priority
                    />
                </div>
            </div>

            {/* SIDEBAR INFO PANEL */}
            <div
                className={`fixed md:relative bottom-0 right-0 h-[70vh] md:h-full bg-black/90 md:bg-white/5 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/10 transition-all duration-500 ease-in-out z-[10004] 
        ${showInfo ? "translate-y-0 md:translate-x-0 w-full md:w-[450px]" : "translate-y-full md:translate-x-full w-full md:w-0 overflow-hidden"}
      `}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 md:p-12 h-full flex flex-col overflow-y-auto no-scrollbar">
                    {/* Sidebar Title & Close Button */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className={`${nunito.className} text-white text-2xl md:text-3xl font-black leading-tight flex-grow`}>
                            {selectedNews.title}
                        </h2>

                        <button
                            onClick={() => setShowInfo(false)}
                            className="md:hidden p-2 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all flex-shrink-0 -mt-2"
                            title="Close Sidebar"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Metadata Tags (Date & Location) */}
                    <div className="flex items-center gap-4 flex-wrap mb-8">
                        <span className={`${manrope.className} flex items-center gap-2 text-[#3ed0a6] text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/10`}>
                            <FiCalendar size={13} className="opacity-80" /> {selectedNews.date}
                        </span>
                        <span className={`${manrope.className} flex items-center gap-2 text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest`}>
                            <FiMapPin size={13} /> {selectedNews.location}
                        </span>
                    </div>

                    <div className="w-16 md:w-20 h-1.5 bg-[#00715D] rounded-full mb-10"></div>


                    <div className="flex flex-col gap-6">
                        <h3 className={`${manrope.className} text-[#3ed0a6] text-[11px] font-bold uppercase tracking-[0.25em] mb-2`}>
                            More Stories
                        </h3>

                        <div className="flex flex-col gap-4 overflow-y-auto max-h-[40vh] pr-2 no-scrollbar">

                            {items.map((item, idx) => {
                                if (idx === selectedIndex) return null;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => {
                                            setSelectedIndex(idx);
                                            setZoom(1);
                                            setPanY(0);
                                        }}
                                        className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group/item"
                                    >
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black/20">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 overflow-hidden">
                                            <span className="text-[#3ed0a6] text-[10px] font-bold uppercase">
                                                {item.date}
                                            </span>
                                            <h4 className={`${nunito.className} text-white text-sm font-bold leading-tight line-clamp-2`}>
                                                {item.title}
                                            </h4>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
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
    );
}

function ZoomIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
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
    );
}
