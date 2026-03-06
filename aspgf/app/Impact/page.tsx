"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Caveat, Nunito, Manrope } from "next/font/google";
import { TrendingUp, Lightbulb, ThumbsUp, MapPin, Calendar, Play, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { videoStories } from "@/data/impactData";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

gsap.registerPlugin(ScrollTrigger);

const impactStats = [
    {
        id: 1,
        icon: <TrendingUp className="w-8 h-8 text-[#00735C]" />,
        value: 98,
        suffix: "%",
        label: "Beneficiaries Reached",
    },
    {
        id: 2,
        icon: <Lightbulb className="w-8 h-8 text-[#00735C]" />,
        value: 1265,
        suffix: "+",
        label: "Families Benefited",
    },
    {
        id: 3,
        icon: <ThumbsUp className="w-8 h-8 text-[#00735C]" />,
        value: 36,
        suffix: "k",
        label: "Students Supported",
    },
];

export default function ImpactPage() {
    const sectionRef = useRef(null);
    const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);

    useEffect(() => {
        const stats = statsRefs.current;

        stats.forEach((stat, index) => {
            if (!stat) return;

            const targetValue = impactStats[index].value;
            const counterObj = { val: 0 };
            const counterDisplay = stat.querySelector(".counter-value");

            gsap.to(counterObj, {
                val: targetValue,
                duration: 2,
                scrollTrigger: {
                    trigger: stat,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                onUpdate: () => {
                    if (counterDisplay) {
                        counterDisplay.textContent = Math.floor(counterObj.val).toString();
                    }
                },
            });

            // Fade in and slide up animation for the card
            gsap.fromTo(stat,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%",
                    }
                }
            );
        });
    }, []);

    const featuredVideo = videoStories.find(v => v.isFeatured);
    const stackedVideos = videoStories.filter(v => v.id === 2 || v.id === 3);
    const gridVideos = videoStories.filter(v => v.id > 3);

    const getYoutubeEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
    };

    return (
        <main className="min-h-screen relative">
            {/* STATS SECTION */}
            <section ref={sectionRef} className="py-20 px-6 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Proof of Changes header */}
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-[1px] w-12 md:w-20 bg-gray-300"></div>
                        <span className={`${caveat.className} text-xl md:text-2xl text-gray-500 font-bold italic`}>
                            Proof of changes
                        </span>
                        <div className="h-[1px] w-12 md:w-20 bg-gray-300"></div>
                    </div>

                    <h2 className={`${nunito.className} text-4xl md:text-6xl font-extrabold text-[#00735C] mb-6 leading-tight uppercase`}>
                        Our <br className="hidden md:block" /> Impact
                    </h2>

                    <p className={`${manrope.className} max-w-2xl mx-auto text-gray-600 text-base md:text-lg mb-16 leading-relaxed font-semibold`}>
                        Real change created through compassion, collaboration, and a shared commitment to building stronger and more resilient communities.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-24">
                        {impactStats.map((stat, index) => (
                            <div
                                key={stat.id}
                                ref={(el) => { statsRefs.current[index] = el; }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-full border-2 border-[#00735C]/30 flex items-center justify-center mb-6 shadow-sm">
                                    {stat.icon}
                                </div>

                                <div className={`${nunito.className} text-4xl md:text-5xl font-extrabold text-[#1A2E35] mb-2 flex items-baseline`}>
                                    <span className="counter-value">0</span>
                                    <span>{stat.suffix}</span>
                                </div>

                                <p className={`${manrope.className} text-gray-500 font-bold uppercase tracking-wider text-xs md:text-sm`}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIDEO STORIES SECTION (Light Theme) */}
            <section className="py-20 px-6 bg-white text-black border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="mb-12">
                        <p className={`${caveat.className} text-xl md:text-2xl text-gray-500 font-bold italic mb-2 px-1 text-left`}>
                            Words of reality
                        </p>
                        <h2 className={`${nunito.className} text-4xl md:text-5xl font-black leading-tight text-left text-[#1A2E35]`}>
                            Stories that <span className="text-[#00735C]">defines us</span>
                        </h2>
                    </div>

                    {/* Top Row: Featured + Stacked */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        {/* Featured (Left Big) */}
                        <div className="lg:col-span-2">
                            {featuredVideo && (
                                <div className="group bg-white rounded-lg overflow-hidden flex flex-col h-full shadow-md border border-gray-100">
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <Image
                                            src={featuredVideo.thumbnail}
                                            alt={featuredVideo.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                onClick={() => setActiveVideo(featuredVideo.videoUrl)}
                                                className="w-16 h-16 bg-[#00735C]/90 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:bg-[#00735C] hover:scale-110 transition-all duration-300"
                                            >
                                                <Play fill="currentColor" size={32} className="ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1">
                                        <div className="flex items-center gap-1.5 text-[#00735C] font-bold text-xs mb-3 uppercase tracking-wider">
                                            <MapPin size={14} fill="currentColor" />
                                            <span>{featuredVideo.location}</span>
                                        </div>
                                        <h3 className={`${nunito.className} text-black font-extrabold text-xl md:text-2xl leading-tight mb-3 text-left line-clamp-2`}>
                                            {featuredVideo.title}
                                        </h3>
                                        <div className="text-gray-500 text-xs font-semibold text-left">
                                            {featuredVideo.year} | {featuredVideo.duration}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stacked (Right Two) */}
                        <div className="flex flex-col gap-6">
                            {stackedVideos.map((video) => (
                                <div key={video.id} className="group bg-white rounded-lg overflow-hidden flex flex-col flex-1 shadow-sm border border-gray-100">
                                    <div className="relative aspect-[16/8] overflow-hidden">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                onClick={() => setActiveVideo(video.videoUrl)}
                                                className="w-12 h-12 bg-[#00735C]/90 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-[#00735C] hover:scale-110 transition-all duration-300"
                                            >
                                                <Play fill="currentColor" size={24} className="ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1">
                                        <div className="flex items-center gap-1.5 text-[#00735C] font-bold text-[10px] mb-2 uppercase tracking-wider">
                                            <MapPin size={12} fill="currentColor" />
                                            <span>{video.location}</span>
                                        </div>
                                        <h3 className={`${nunito.className} text-black font-extrabold text-sm md:text-base leading-tight mb-2 line-clamp-2 text-left`}>
                                            {video.title}
                                        </h3>
                                        <div className="text-gray-500 text-[10px] font-semibold text-left">
                                            {video.year} | {video.duration}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Grid: 3 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gridVideos.map((video) => (
                            <div key={video.id} className="group bg-white rounded-lg overflow-hidden flex flex-col shadow-sm border border-gray-100">
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            onClick={() => setActiveVideo(video.videoUrl)}
                                            className="w-12 h-12 bg-[#00735C]/90 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-[#00735C] hover:scale-110 transition-all duration-300"
                                        >
                                            <Play fill="currentColor" size={24} className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1">
                                    <div className="flex items-center gap-1.5 text-[#00735C] font-bold text-[10px] mb-2 uppercase tracking-wider">
                                        <MapPin size={12} fill="currentColor" />
                                        <span>{video.location}</span>
                                    </div>
                                    <h3 className={`${nunito.className} text-black font-extrabold text-base md:text-lg leading-tight mb-2 line-clamp-2 text-left`}>
                                        {video.title}
                                    </h3>
                                    <div className="text-gray-500 text-[10px] font-semibold text-left">
                                        {video.year} | {video.duration}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VIDEO POPUP MODAL */}
            {activeVideo && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 md:p-10 animate-in fade-in duration-300">
                    <button
                        onClick={() => setActiveVideo(null)}
                        className="absolute top-6 right-6 text-white hover:text-[#00735C] transition-colors p-2"
                    >
                        <X size={40} />
                    </button>
                    <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
                        <iframe
                            src={getYoutubeEmbedUrl(activeVideo) || ""}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </main>
    );
}
