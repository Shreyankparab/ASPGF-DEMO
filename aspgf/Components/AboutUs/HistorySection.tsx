"use client";

import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Caveat, Nunito, Cabin } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// founding year
const START_YEAR = 2023;
const CURRENT_YEAR = new Date().getFullYear();

const DEFAULT_CHARITY_INFO = {
    title: "Continuing Our Mission",
    points: [
        {
            head: "Community Empowerment.",
            sub: ["Scaling our existing welfare programs.", "Reaching more underserved families."],
        },
        {
            head: "Sustainable Impact.",
            sub: [
                "Strengthening our volunteer network.",
                "Ensuring long-term support for educational projects.",
            ],
        },
        {
            head: "Initial Community Research.",
            sub: ["Identified 10 high-need zones.", "Surveyed 500+ families."],
        },
        {
            head: "Infrastructure Development.",
            sub: [
                "Built and renovated schools in underserved communities.",
                "Supplied educational materials including textbooks and stationery.",
            ],
        },
    ],
};

const historyData: Record<string, any> = {

    "2026": {
        year: "Year 2026",
        title: "Foundation Laid",
        points: [
            {
                head: "Initial Community Research.",
                sub: ["Identified 10 high-need zones.", "Surveyed 500+ families."],
            },
            {
                head: "Infrastructure Development.",
                sub: [
                    "Built and renovated schools in underserved communities.",
                    "Supplied educational materials including textbooks and stationery.",
                ],
            },
            {
                head: "Initial Community Research.",
                sub: ["Identified 10 high-need zones.", "Surveyed 500+ families."],
            },
            {
                head: "Infrastructure Development.",
                sub: [
                    "Built and renovated schools in underserved communities.",
                    "Supplied educational materials including textbooks and stationery.",
                ],
            },
        ],
    },

    "2025": {
        year: "Year 2025",
        title: "Expanding Global Reach",
        points: [
            {
                head: "International Partnerships Established.",
                sub: [
                    "Partnered with 5 global NGOs.",
                    "Launched cross-border digital learning.",
                ],
            },
            {
                head: "Global Scholarship Fund.",
                sub: [
                    "Awarded scholarships to students across 3 continents.",
                    "Launched the Global Scholars mentorship program.",
                ],
            },
            {
                head: "International Partnerships Established.",
                sub: [
                    "Partnered with 5 global NGOs.",
                    "Launched cross-border digital learning.",
                ],
            },
            {
                head: "International Partnerships Established.",
                sub: [
                    "Partnered with 5 global NGOs.",
                    "Launched cross-border digital learning.",
                ],
            },
        ],
    },

    "2024": {
        year: "Year 2024",
        title: "Got First Reward From (NYC)",
        points: [
            {
                head: "Provide access to quality education for underprivileged children.",
                sub: [
                    "Built and renovated schools in underserved communities.",
                    "Supplied educational materials including textbooks and stationery.",
                ],
            },
            {
                head: "Support students with scholarships and learning materials.",
                sub: [
                    "Awarded scholarships to talented students.",
                    "Distributed uniforms and learning kits.",
                ],
            },
            {
                head: "Conduct after-school programs to improve literacy.",
                sub: [
                    "Organized free tutoring sessions.",
                    "Established reading clubs.",
                ],
            },
            {
                head: "Organize career guidance workshops for youth.",
                sub: [
                    "Conducted counseling sessions.",
                    "Held vocational skill workshops.",
                ],
            },
        ],
    },



    "2023": {
        year: "Year 2023",
        title: "Foundation Laid",
        points: [
            {
                head: "Initial Community Research.",
                sub: ["Identified 10 high-need zones.", "Surveyed 500+ families."],
            },
            {
                head: "Infrastructure Development.",
                sub: [
                    "Built and renovated schools in underserved communities.",
                    "Supplied educational materials including textbooks and stationery.",
                ],
            },
            {
                head: "Initial Community Research.",
                sub: ["Identified 10 high-need zones.", "Surveyed 500+ families."],
            },
            {
                head: "Infrastructure Development.",
                sub: [
                    "Built and renovated schools in underserved communities.",
                    "Supplied educational materials including textbooks and stationery.",
                ],
            },
        ],
    },


    "2022": {
        year: "Year 2022",
        title: "Got First Reward From (NYC)",
        points: [
            {
                head: "Provide access to quality education for underprivileged children.",
                sub: [
                    "Built and renovated schools in underserved communities.",
                    "Supplied educational materials including textbooks and stationery.",
                ],
            },
            {
                head: "Support students with scholarships and learning materials.",
                sub: [
                    "Awarded scholarships to talented students.",
                    "Distributed uniforms and learning kits.",
                ],
            },
            {
                head: "Conduct after-school programs to improve literacy.",
                sub: [
                    "Organized free tutoring sessions.",
                    "Established reading clubs.",
                ],
            },
            {
                head: "Organize career guidance workshops for youth.",
                sub: [
                    "Conducted counseling sessions.",
                    "Held vocational skill workshops.",
                ],
            },
        ],
    },



};

// Generate years dynamically
const ALL_YEARS = Array.from(
    { length: CURRENT_YEAR - START_YEAR + 1 },
    (_, i) => (CURRENT_YEAR - i).toString()
);

export default function HistorySection(): JSX.Element {
    const [activeYear, setActiveYear] = useState<string>(CURRENT_YEAR.toString());

    // Helper to get data for a year
    const getYearData = (year: string) => {
        const data = historyData[year] || { ...DEFAULT_CHARITY_INFO, year: `Year ${year}` };
        return {
            ...data,
            year: data.year || `Year ${year}`
        };
    };

    const currentData = getYearData(activeYear);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(".image-container", {
                x: -150,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".image-container",
                    start: "top 85%",
                }
            });

            gsap.fromTo(
                ".float-image-back",
                { y: 0, x: 0, scale: 1, rotate: 3, filter: "blur(0px)", opacity: 1, zIndex: 20 },
                {
                    y: 35,
                    x: 10,
                    scale: 0.95,
                    rotate: 2,
                    filter: "blur(8px)",
                    opacity: 0.8,
                    zIndex: 10,
                    duration: 5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    force3D: true,
                }
            );

            gsap.fromTo(
                ".float-image-front",
                { y: 0, x: 0, scale: 0.95, rotate: -3, filter: "blur(8px)", opacity: 0.8, zIndex: 10 },
                {
                    y: -35,
                    x: -10,
                    scale: 1,
                    rotate: -4,
                    filter: "blur(0px)",
                    opacity: 1,
                    zIndex: 20,
                    duration: 5,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    force3D: true,
                }
            );
            gsap.from(".float-text-container > *", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".float-text-container",
                    start: "top 85%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!contentRef.current) return;

        gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
        );
    }, [activeYear]);

    return (
        <section
            ref={sectionRef}
            className="bg-white relative overflow-hidden pt-12 md:pt-16 pb-28 md:pb-40"
        >
            {/* Background */}
            <div className="absolute left-0 top-0 md:top-24 h-[480px] md:h-auto md:bottom-40 w-full md:w-[50vw] bg-[#00735C] rounded-br-[60px] rounded-tr-[60px] z-0"></div>

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
                <div className="grid md:grid-cols-[1fr_1fr] items-center gap-24 lg:gap-32">

                    {/* LEFT IMAGES */}
                    <div className="image-container relative flex justify-center md:justify-start items-start md:items-center -mt-5 md:mt-0 pt-0 pb-8 md:py-12">
                        <div className="relative w-full aspect-[4/5] max-w-[320px] md:max-w-[520px]">

                            <div className="float-image-back absolute top-0 right-[-5%] w-[85%] border-[10px] border-white rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/Images/WhatWeDo2.webp"
                                    alt="Community work"
                                    width={450}
                                    height={550}
                                    className="object-cover aspect-[4/5] w-full"
                                    priority
                                />
                            </div>

                            <div className="float-image-front absolute bottom-[-10%] left-[-4%] w-[85%] border-[10px] border-white rounded-[32px] overflow-hidden shadow-xl">
                                <Image
                                    src="/Images/about-image.png"
                                    alt="Family support"
                                    width={350}
                                    height={450}
                                    className="object-cover aspect-square w-full"
                                    priority
                                />
                            </div>

                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="py-6 pl-0 md:pl-16 float-text-container">

                        <div className="flex items-center gap-2 mb-3">
                            <span className={`${caveat.className} text-[#6F7775] text-2xl`}>
                                Our History
                            </span>
                        </div>

                        <h2 className={`${nunito.className} text-[36px] md:text-[42px] font-extrabold text-[#00735C] mb-4`}>
                            Journey Was Started
                        </h2>
                        <div className="h-1.5 w-48 bg-[#00735C] rounded-full mb-8"></div>

                        {/* YEAR SELECTION SECTION */}
                        <div className="mb-14 relative select-none mr-0">
                            <div className="flex justify-between items-center mb-10 px-1">
                                <h3 className={`${nunito.className} text-[13px] font-bold text-gray-400 uppercase tracking-widest`}>Journey Roadmap</h3>
                                <div className="px-5 py-2 bg-[#e6f1ef] rounded-2xl border border-[#00735C]/20 shadow-sm flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 bg-[#00735C] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,115,92,0.4)]"></div>
                                    <span className={`${nunito.className} font-extrabold text-[#00735C] text-xl`}>{activeYear}</span>
                                </div>
                            </div>

                            {/* HORIZONTAL SCROLLING ROADMAP (Universal) */}
                            <div className="relative w-full overflow-x-auto pb-12 pt-4 custom-scrollbar scroll-smooth">
                                <div className="flex items-center gap-14 md:gap-24 min-w-max relative py-4 px-6 pr-14">
                                    {/* Background Track Line */}
                                    <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#00735C]/5 w-full"></div>
                                    </div>

                                    {/* Years Roadmap (Descending Order) */}
                                    {ALL_YEARS.map((year: string, index: number) => {
                                        const isActive = activeYear === year;

                                        return (
                                            <button
                                                key={year}
                                                onClick={() => setActiveYear(year)}
                                                className="relative flex flex-col items-center group outline-none cursor-pointer"
                                            >
                                                {/* Connecting segment to the next year (Neutral Light Gray) */}
                                                {index < ALL_YEARS.length - 1 && (
                                                    <div className="absolute top-1/2 left-1/2 w-14 md:w-24 h-[3px] -translate-y-1/2 z-0 bg-gray-100"></div>
                                                )}

                                                {/* Roadmap Point: Green for Active, Gray for Others */}
                                                <div
                                                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-[3px] border-white transition-all duration-500 z-10 relative shadow-sm
                                                        ${isActive
                                                            ? 'bg-[#00735C] scale-150 shadow-[0_0_15px_rgba(0,115,92,0.3)] ring-2 ring-[#00735C]/10'
                                                            : 'bg-gray-300 group-hover:bg-gray-400'}`}
                                                >
                                                </div>

                                                {/* Year Label Below */}
                                                <span
                                                    className={`absolute top-10 ${nunito.className} text-[14px] md:text-[15px] font-extrabold transition-all duration-300 whitespace-nowrap
                                                        ${isActive
                                                            ? 'text-[#00735C] scale-110 translate-y-1'
                                                            : 'text-gray-400 group-hover:text-gray-500'}`}
                                                >
                                                    {year}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div ref={contentRef}>
                            <p className={`${nunito.className} text-[#00735C] font-extrabold mb-2 text-sm`}>
                                {currentData.year}
                            </p>

                            <h3 className={`${nunito.className} text-[24px] font-extrabold text-gray-900 mb-6`}>
                                {currentData.title}
                            </h3>

                            <ul className="space-y-4">
                                {currentData.points.map((item: any, idx: number) => (
                                    <li key={idx}>
                                        <p className={`${cabin.className} font-bold text-gray-900 text-[15px]`}>
                                            {item.head}
                                        </p>

                                        <ul className="mt-2 space-y-1">
                                            {item.sub.map((subItem: string, sIdx: number) => (
                                                <li
                                                    key={sIdx}
                                                    className={`${cabin.className} text-gray-600 text-sm`}
                                                >
                                                    • {subItem}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}