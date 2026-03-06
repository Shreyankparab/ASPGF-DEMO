"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Nunito, Cabin } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

import { allWorkItems, WorkItem } from "@/data/ourWorkData";

const ITEMS_PER_PAGE = 6;

interface OurWorkContentProps {
    activeCategory: string;
    searchQuery: string;
}

export default function OurWorkContent({ activeCategory, searchQuery }: OurWorkContentProps) {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 when filtering changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchQuery]);

    const filtered = allWorkItems.filter((item) => {
        const matchCategory =
            activeCategory === "All Category" ||
            item.category.toLowerCase() === activeCategory.toLowerCase();
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
        <div className={`${cabin.className} flex-1 min-w-0`}>

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
