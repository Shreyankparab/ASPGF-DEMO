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
import { Caveat, Nunito, Cabin } from "next/font/google";
import NewsModal from "./NewsModal";

const categories: Category[] = ["All", "Health", "Old Age", "Education"];

const caveat = Caveat({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });
const cabin = Cabin({ subsets: ["latin"] });

export default function NewsComponent() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInitialIndex, setModalInitialIndex] = useState(0);

    const gridRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const tagRef = useRef<HTMLSpanElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const filteredData =
        activeCategory === "All"
            ? newsData
            : newsData.filter((item) => item.category === activeCategory);

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
                            onClick={() => {
                                setModalInitialIndex((currentPage - 1) * ITEMS_PER_PAGE + index);
                                setIsModalOpen(true);
                            }}
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

            {/* News Modal */}
            <NewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                items={filteredData}
                initialIndex={modalInitialIndex}
            />
        </div>
    );
}
