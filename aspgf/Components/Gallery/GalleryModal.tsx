"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Info
} from "lucide-react";
import { Nunito, Cabin } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

const cabin = Cabin({ subsets: ["latin"] });

export default function GalleryModal({
  isOpen,
  onClose,
  items,
  initialIndex,
}: any) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(initialIndex);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, initialIndex]);

  const handlePrev = (e?: any) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev! - 1));
    setZoom(1);
  };

  const handleNext = (e?: any) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev! + 1));
    setZoom(1);
  };

  if (!isOpen || selectedIndex === null) return null;
  const currentItem = items[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col md:flex-row bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-6 z-[100] pointer-events-none">
        <div
          className={`${cabin.className} text-white/50 text-sm font-bold pointer-events-auto bg-black/20 px-4 py-2 rounded-full backdrop-blur-md`}
        >
          {selectedIndex + 1} / {items.length}
        </div>
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowInfo(!showInfo);
            }}
            className={`p-3 rounded-full transition-all ${showInfo ? "bg-[#00735C] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
            title="Toggle Info"
          >
            <Info size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative flex-grow flex items-center justify-center p-4 overflow-hidden h-full">
        <button
          onClick={handlePrev}
          className="absolute left-4 z-50 p-3 md:p-4 rounded-full bg-black/50 text-white hover:bg-[#00735C] transition-all backdrop-blur-sm sm:flex"
        >
          <ArrowLeft size={20} className="md:w-6 md:h-6" />
        </button>

        <div
          className="relative w-full h-full transition-transform duration-500 flex items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={currentItem.image}
            alt="Gallery"
            fill
            className="object-contain p-4 md:p-8"
            priority
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 z-50 p-3 md:p-4 rounded-full bg-black/50 text-white hover:bg-[#00735C] transition-all backdrop-blur-sm sm:flex"
        >
          <ArrowRight size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* Sidebar/Overlay Info */}
      <div
        className={`fixed md:relative bottom-0 left-0 right-0 md:top-0 w-full md:w-[400px] h-[60vh] md:h-full bg-black/80 md:bg-black/40 backdrop-blur-2xl md:backdrop-blur-none border-t md:border-t-0 md:border-l border-white/10 p-6 md:p-8 transition-all duration-500 z-[150] overflow-y-auto no-scrollbar ${showInfo
            ? "translate-y-0 md:translate-x-0 opacity-100"
            : "translate-y-full md:translate-x-full opacity-0 pointer-events-none md:absolute md:right-0"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 md:hidden">
          <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Event Details</span>
          <button
            onClick={() => setShowInfo(false)}
            className="p-2 text-white/50 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <h2
          className={`${nunito.className} text-white text-xl md:text-2xl font-black mb-4 md:mb-6`}
        >
          {currentItem.title}
        </h2>
        <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
          <span
            className={`${cabin.className} text-[#3ed0a6] text-xs font-bold uppercase tracking-widest flex items-center gap-2`}
          >
            <Calendar size={14} /> {currentItem.date}
          </span>
          <span
            className={`${cabin.className} text-white/40 text-xs font-bold uppercase tracking-widest flex items-center gap-2`}
          >
            <MapPin size={14} /> {currentItem.location}
          </span>
        </div>
        <div className="w-16 h-1 bg-[#00735C] rounded-full mb-8" />

        {/* Thumbnails list */}
        <h3
          className={`${cabin.className} text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-4`}
        >
          Event Gallery
        </h3>
        <div className="grid grid-cols-4 gap-2 overflow-y-auto no-scrollbar">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${idx === selectedIndex ? "border-[#00735C]" : "border-transparent"}`}
            >
              <Image
                src={item.image}
                alt="thumb"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
