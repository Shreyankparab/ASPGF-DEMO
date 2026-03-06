"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Manrope, Nunito } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });

interface WorkItem {
    id: number;
    image: string;
    category: string;
    date: string;
    title: string;
    description: string;
    featured?: boolean;
}

const allWorkItems: WorkItem[] = [
    {
        id: 1,
        image: "/images/waari-image.png",
        category: "Latest",
        date: "26/11/2025",
        title: "Vari Relief Program",
        description:
            "During the sacred Ashadhi Wari pilgrimage, our foundation organized a large-scale relief distribution program to support Warkaris walking long distances in challenging weather conditions.",
        // "During the sacred Ashadhi Wari pilgrimage, our foundation organized a large-scale relief distribution program to support Warkaris walking long distances in challenging weather conditions. To ensure their safety and comfort during the journey, essential supplies were distributed and refreshments were served along the route. The initiative included the distribution of 200 raincoats and umbrellas to protect devotees from heavy rains, 1,000 biscuit packets to provide quick nourishment, and 50 kg of freshly prepared Sabudana Khichdi along with tea to help Warkaris regain energy and continue their spiritual journey with strength and support.",
        featured: true,
    },
    {
        id: 2,
        image: "/images/donations-new.png",
        category: "Education",
        date: "26/11/2025",
        title: "Scholarship Distribution Program",
        description:
            "To support education for deserving students, the foundation conducted a scholarship distribution program for...",
    },
    {
        id: 3,
        image: "/images/donations-2.png",
        category: "Charity",
        date: "26/11/2025",
        title: "Beggar Rehabilitation Center",
        description:
            "A winter relief and community cleanliness initiative was conducted...",
    },
    {
        id: 4,
        image: "/images/donations-3.png",
        category: "Charity",
        date: "26/11/2025",
        title: "Matruchhaya Children's Home",
        description:
            "Support provided to orphaned children for winter preparedness and daily sustenance.",
    },
    {
        id: 5,
        image: "/images/donations-2.png",
        category: "Orphanage",
        date: "26/11/2025",
        title: "Spreading Joy This Christmas",
        description:
            "A heartwarming Christmas celebration by Anuja Sushant Patil Global Foundation featuring stationery kit distribution.",
    },
    {
        id: 6,
        image: "/images/donations-2.png",
        category: "Old Age",
        date: "24/11/2025",
        title: "Old Age Home Support Drive",
        description:
            "Monthly support drive providing essential supplies and companionship to elderly residents at the old age home.",
    },
    {
        id: 7,
        image: "/images/donations-2.png",
        category: "Education",
        date: "20/11/2025",
        title: "Digital Literacy Workshop",
        description:
            "Empowering students with digital skills through hands-on workshops conducted at government schools.",
    },
    {
        id: 8,
        image: "/images/donations-2.png",
        category: "Charity",
        date: "18/11/2025",
        title: "Community Kitchen Initiative",
        description:
            "Free meals served daily to underprivileged families and individuals in need across Pune.",
    },
    {
        id: 9,
        image: "/images/donations-2.png",
        category: "Education",
        date: "15/11/2025",
        title: "Women Empowerment Seminar",
        description:
            "A seminar focused on skill development and entrepreneurship opportunities for underprivileged women.",
    },
];

const ITEMS_PER_PAGE = 6;

interface OurWorkContentProps {
    activeCategory: string;
    searchQuery: string;
}

export default function OurWorkContent({ activeCategory, searchQuery }: OurWorkContentProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = allWorkItems.filter((item) => {
        const matchCategory =
            activeCategory === "All Category" || item.category === activeCategory;
        const matchSearch =
            searchQuery === "" ||
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const featured = filtered.find((i) => i.featured);
    const rest = filtered.filter((i) => !i.featured);

    const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE);
    const paginated = rest.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className={`${manrope.className} flex-1 min-w-0`}>

            {/* Featured Card */}
            {featured && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm flex flex-col md:flex-row lg:min-h-[400px]">
                    <div className="relative w-full md:w-[45%] shrink-0">
                        <Image
                            src={featured.image}
                            alt={featured.title}
                            width={800}
                            height={500}
                            className="w-full h-auto md:h-full object-cover rounded-2xl md:rounded-r-none p-2"
                        />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                        <span className="inline-block text-[10px] font-extrabold tracking-widest uppercase bg-gray-100 text-gray-500 rounded-full px-3 py-1 mb-4 w-fit">
                            {featured.category}
                        </span>
                        <h2 className={`${nunito.className} text-2xl md:text-3xl font-extrabold text-[#1A2E35] mb-3 leading-tight`}>
                            {featured.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {featured.description}
                        </p>
                    </div>
                </div>
            )}

            {/* Grid of cards */}
            {paginated.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    {paginated.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col h-full"
                        >
                            <div className="relative w-full overflow-hidden shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                                />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#00735C]">
                                        {item.category}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium">
                                        {item.date}
                                    </span>
                                </div>
                                <h3 className={`${nunito.className} font-extrabold text-[#1A2E35] text-lg mb-2 leading-snug`}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400 font-semibold">
                    No results found.
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-500 hover:border-[#00735C] hover:text-[#00735C] disabled:opacity-40 transition-all"
                    >
                        <ChevronLeft size={14} /> Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${currentPage === page
                                ? "bg-[#00735C] text-white shadow-md"
                                : "border border-gray-200 text-gray-500 hover:border-[#00735C] hover:text-[#00735C]"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-500 hover:border-[#00735C] hover:text-[#00735C] disabled:opacity-40 transition-all"
                    >
                        Next <ChevronRight size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}
