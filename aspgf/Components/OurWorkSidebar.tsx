"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { Manrope, Nunito } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });

const categories = [
    "All Category",
    "Education",
    "Charity",
    "Old Age",
    "Orphanage",
];

interface OurWorkSidebarProps {
    activeCategory: string;
    onCategoryChange: (cat: string) => void;
    searchQuery: string;
    onSearchChange: (q: string) => void;
}

export default function OurWorkSidebar({
    activeCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
}: OurWorkSidebarProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <aside className={`${manrope.className} w-full md:w-[220px] shrink-0`}>
            {/* Search */}
            <div className="relative mb-4 md:mb-8">
                <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search work..."
                    className="w-full rounded-full border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm text-gray-600 placeholder-gray-400 outline-none focus:border-[#00735C] focus:ring-1 focus:ring-[#00735C] transition-all"
                />
            </div>

            {/* Categories */}
            <div className="relative">
                <p className={`${nunito.className} hidden md:block text-[11px] font-extrabold tracking-widest text-[#00735C] uppercase mb-4`}>
                    Browse By Categories
                </p>

                {/* Mobile Custom Dropdown */}
                <div className="md:hidden mb-4 relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-[#1A2E35] shadow-sm transition-all focus:border-[#00735C]"
                    >
                        <span>{activeCategory}</span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute z-[50] mt-2 w-full rounded-xl border border-gray-100 bg-white shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        onCategoryChange(cat);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${activeCategory === cat
                                        ? "bg-[#00735C]/5 text-[#00735C]"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-[#00735C]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop List */}
                <ul className="hidden md:block space-y-1">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <li key={cat}>
                                <button
                                    onClick={() => onCategoryChange(cat)}
                                    className={`w-full text-left px-3 py-2 text-sm font-semibold transition-all duration-200 rounded-r-md border-l-2 ${isActive
                                        ? "border-[#00735C] text-[#00735C] bg-[#00735C]/5"
                                        : "border-transparent text-gray-500 hover:text-[#00735C] hover:border-[#00735C]/30"
                                        }`}
                                >
                                    {cat}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
