"use client";

import React, { useState } from "react";
import { Caveat, Cabin } from "next/font/google";
import OurWorkSidebar from "./OurWorkSidebar";
import OurWorkContent from "./OurWorkContent";
import { allWorkItems } from "@/data/ourWorkData";

const caveat = Caveat({ subsets: ["latin"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function OurWorkComponent() {
    const [activeCategory, setActiveCategory] = useState("All Category");
    const [searchQuery, setSearchQuery] = useState("");

    // Detect hash on mount to switch category
    React.useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash.startsWith("#project-")) {
            const id = parseInt(hash.replace("#project-", ""));
            const item = allWorkItems.find(p => p.id === id);
            if (item) {
                setActiveCategory(item.category);
            }
        }
    }, []);

    return (
        <div className={`${cabin.className} bg-[#f9f9f9] min-h-screen`}>
            {/* Page Title */}
            <div className="px-6 md:px-10 lg:px-16 pt-8 pb-4">
                <p className={`${caveat.className} text-3xl text-[#6f7775] font-bold tracking-widest`}>Our Work</p>
            </div>

            {/* Main Layout: Sidebar + Content */}
            <div className="px-6 md:px-10 lg:px-16 pb-16 flex flex-col md:flex-row gap-4 md:gap-12 items-start">
                {/* Sidebar */}
                <OurWorkSidebar
                    activeCategory={activeCategory}
                    onCategoryChange={(cat) => {
                        setActiveCategory(cat);
                    }}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {/* Work Content */}
                <OurWorkContent
                    activeCategory={activeCategory}
                    searchQuery={searchQuery}
                />
            </div>
        </div>
    );
}
