"use client";

import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Caveat, Nunito, Cabin } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const historyData = {
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
};

type YearKey = keyof typeof historyData;

export default function HistorySection(): JSX.Element {
    const [activeYear, setActiveYear] = useState<YearKey>("2024");

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
                },
            });

            gsap.fromTo(
                ".float-image-back",
                { y: 0, filter: "blur(8px)", scale: 0.92 },
                {
                    y: 25,
                    filter: "blur(0px)",
                    scale: 1,
                    duration: 3.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                }
            );

            gsap.fromTo(
                ".float-image-front",
                { y: 0, filter: "blur(0px)", scale: 1 },
                {
                    y: -25,
                    filter: "blur(8px)",
                    scale: 0.92,
                    duration: 3.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                }
            );
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
            <div className="absolute left-0 top-0 bottom-12 w-full md:w-[50vw] bg-[#00735C] rounded-br-[60px] rounded-tr-[60px] z-0"></div>

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
                <div className="grid md:grid-cols-[1fr_1fr] items-center gap-12 lg:gap-20">

                    {/* LEFT IMAGES */}
                    <div className="image-container relative flex justify-center items-center py-8 md:py-12">
                        <div className="relative w-full aspect-[4/5] max-w-[280px] md:max-w-[420px]">

                            <div className="float-image-back absolute top-0 right-[-8%] z-10 w-[80%] border-[10px] border-white rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/Images/WhatWeDo2.webp"
                                    alt="Community work"
                                    width={450}
                                    height={550}
                                    className="object-cover aspect-[4/5] w-full"
                                    priority
                                />
                            </div>

                            <div className="float-image-front absolute bottom-[-10%] left-[-5%] z-20 w-[80%] border-[10px] border-white rounded-[32px] overflow-hidden shadow-xl">
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
                    <div className="py-6 pl-12">

                        <div className="flex items-center gap-2 mb-3">
                            <span className={`${caveat.className} text-gray-400 text-2xl`}>
                                Our History
                            </span>
                        </div>

                        <h2 className={`${nunito.className} text-[36px] md:text-[42px] font-extrabold text-[#00735C] mb-6`}>
                            Journey Was Started
                        </h2>

                        {/* YEAR TABS */}
                        <div className={`${nunito.className} flex gap-4 mb-8`}>
                            {(Object.keys(historyData) as YearKey[])
                                .sort((a, b) => Number(a) - Number(b))
                                .map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setActiveYear(year)}
                                        className={`px-6 py-2 rounded-full text-[13px] font-extrabold transition-all ${activeYear === year
                                            ? "text-[#00735C] border-2 border-[#00735C] bg-[#e6f1ef]"
                                            : "text-gray-400 hover:text-gray-600"
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                        </div>

                        <div ref={contentRef}>
                            <p className={`${nunito.className} text-[#00735C] font-extrabold mb-2 text-sm`}>
                                {historyData[activeYear].year}
                            </p>

                            <ul className="space-y-4">
                                {historyData[activeYear].points.map((item, idx) => (
                                    <li key={idx}>
                                        <p className={`${cabin.className} font-bold text-gray-900 text-[15px]`}>
                                            {item.head}
                                        </p>

                                        <ul className="mt-2 space-y-1">
                                            {item.sub.map((subItem, sIdx) => (
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