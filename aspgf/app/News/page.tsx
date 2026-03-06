"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import { newsData, Category, NewsItem } from "@/Components/newsData";
import Image from "next/image";
import { FiCalendar, FiMapPin, FiX } from "react-icons/fi";
import { Caveat } from "next/font/google";

const categories: Category[] = ["All", "Health", "Old Age", "Education"];

// font family
const caveat = Caveat({
  subsets: ["latin"],
  // weight: ["400", "700"], // optional weights
});
export default function NewsEvents() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  const filteredData =
    activeCategory === "All"
      ? newsData
      : newsData.filter((item) => item.category === activeCategory);

  /* ================= GRID ANIMATION ================= */
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

  /* ================= MODAL ANIMATION + SCROLL LOCK ================= */
  useEffect(() => {
    if (selectedItem && modalRef.current) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.85, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
      );
    } else {
      document.body.style.overflow = "auto";
    }
    const animateText = (element: HTMLElement | null) => {
      if (!element) return;

      const words = element.innerText.split(" ");

      element.innerHTML = words
        .map(
          (word) =>
            `<span class="word" style="display:inline-block; overflow:hidden;">
            <span style="display:inline-block;">${word}</span>
          </span>`,
        )
        .join(" ");

      const innerWords = element.querySelectorAll(".word span");

      gsap.from(innerWords, {
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

  return (
    <div className=" bg-[#f5f5f5]">
      {/* ================= HEADER ================= */}
      <div className="bg-[#0f766e] py-16 text-white text-center relative">
        <div className="flex ml-88 gap-2 mb-4">
          <span ref={tagRef} className={`${caveat.className} text-2xl`}>
            News & Events
          </span>
        </div>

        <h2 ref={headingRef} className="text-4xl font-bold">
          Community-focused work for a better tomorrow.
        </h2>

        <div className="absolute bottom-0 left-0 w-full h-2 bg-[#A828C6]"></div>
      </div>

      {/* ================= FILTER ================= */}
      <div className="py-12 text-center">
        <div className="flex justify-center gap-10 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-lg transition ${
                activeCategory === cat
                  ? "font-bold text-[#0f766e]"
                  : "text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= GRID ================= */}
        <div
          ref={gridRef}
          className="grid gap-8 max-w-6xl mx-auto px-6 "
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="card relative rounded-2xl overflow-hidden cursor-pointer shadow-lg "
              onClick={() => setSelectedItem(item)}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={380}
                className="w-full h-[380px] object-cover hover:scale-110 duration-90"
              />

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent text-white">
                <p className="flex items-center justify-center gap-6 text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <FiCalendar size={14} />
                    {item.date}
                  </span>

                  <span className="flex items-center gap-2">
                    <FiMapPin size={14} />
                    {item.location}
                  </span>
                </p>

                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] p-4"
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl w-fit max-w-[95vw] max-h-[95vh] p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white p-2 rounded-full z-10 transition"
            >
              <FiX size={20} />
            </button>

            <Image
              src={selectedItem.image}
              alt={selectedItem.title}
              width={1000}
              height={800}
              className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
      <style jsx>{`
        .card:hover {
          transform: translateY(-8px) scale(1.02);
          transition: 0.3s ease;
        }
      `}</style>
    </div>
  );
}
