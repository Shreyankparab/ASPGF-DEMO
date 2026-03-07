"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Caveat, Nunito, Cabin } from "next/font/google";
import { MapPin, Play, X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import StatsSection from "../StatsSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { videoStories } from "@/data/impactData";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] });
const cabin = Cabin({ subsets: ["latin"] });

gsap.registerPlugin(ScrollTrigger);

type VideoStory = typeof videoStories[0];

export default function ImpactComponent() {
    const sectionRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState<VideoStory | null>(null);
    const [showSidebar, setShowSidebar] = useState(true);

    /* PREVENT BODY SCROLL WHEN MODAL IS OPEN */
    useEffect(() => {
        if (activeVideo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [activeVideo]);

    const featuredVideo = videoStories.find(v => v.isFeatured);
    const stackedVideos = videoStories.filter(v => v.id === 2 || v.id === 3);
    const gridVideos = videoStories.filter(v => v.id > 3);

    const ITEMS_PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(gridVideos.length / ITEMS_PER_PAGE);
    const paginatedGridVideos = gridVideos.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getYoutubeEmbedUrl = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
    };

    return (
        <main className="min-h-screen relative">

            <section ref={sectionRef} className="py-20 px-6 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto text-center">
                    {/* Proof of Changes header */}
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-[1px] w-12 md:w-20 bg-gray-300"></div>
                        <span className={`${caveat.className} text-xl md:text-2xl text-[#6f7775] font-bold italic`}>
                            Proof of changes
                        </span>
                        <div className="h-[1px] w-12 md:w-20 bg-gray-300"></div>
                    </div>

                    <h2 className={`${nunito.className} text-4xl md:text-6xl font-black text-[#00735C] mb-6 leading-tight uppercase`}>
                        Our <br className="hidden md:block" /> Impact
                    </h2>

                    <p className={`${cabin.className} max-w-2xl mx-auto text-gray-600 text-base md:text-lg mb-16 leading-relaxed font-semibold`}>
                        Real change created through compassion, collaboration, and a shared commitment to building stronger and more resilient communities.
                    </p>

                    <div className="mt-16">
                        <StatsSection />
                    </div>
                </div>
            </section>

            {/* VIDEO STORIES SECTION (Light Theme) */}
            <section className="py-20 px-6 bg-white text-black border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="mb-12">
                        <p className={`${caveat.className} text-xl md:text-2xl text-[#6f7775] font-bold italic mb-2 px-1 text-left`}>
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
                                                onClick={() => setActiveVideo(featuredVideo)}
                                                className="w-16 h-16 bg-[#00735C]/90 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:bg-[#00735C] hover:scale-110 transition-all duration-300"
                                            >
                                                <Play fill="currentColor" size={32} className="ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1">
                                        <div className={`${cabin.className} flex items-center gap-1.5 text-[#00735C] font-bold text-xs mb-3 uppercase tracking-wider`}>
                                            <MapPin size={14} fill="currentColor" />
                                            <span>{featuredVideo.location}</span>
                                        </div>
                                        <h3 className={`${nunito.className} text-black font-extrabold text-xl md:text-2xl leading-tight mb-3 text-left line-clamp-2`}>
                                            {featuredVideo.title}
                                        </h3>
                                        <div className={`${cabin.className} text-gray-500 text-xs font-semibold text-left uppercase tracking-wide`}>
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
                                                onClick={() => setActiveVideo(video)}
                                                className="w-12 h-12 bg-[#00735C]/90 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-[#00735C] hover:scale-110 transition-all duration-300"
                                            >
                                                <Play fill="currentColor" size={24} className="ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1">
                                        <div className={`${cabin.className} flex items-center gap-1.5 text-[#00735C] font-bold text-[10px] mb-2 uppercase tracking-wider`}>
                                            <MapPin size={12} fill="currentColor" />
                                            <span>{video.location}</span>
                                        </div>
                                        <h3 className={`${nunito.className} text-black font-extrabold text-sm md:text-base leading-tight mb-2 line-clamp-2 text-left`}>
                                            {video.title}
                                        </h3>
                                        <div className={`${cabin.className} text-gray-500 text-[10px] font-semibold text-left uppercase tracking-wide`}>
                                            {video.year} | {video.duration}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Grid: 3 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {paginatedGridVideos.map((video) => (
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
                                            onClick={() => setActiveVideo(video)}
                                            className="w-12 h-12 bg-[#00735C]/90 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-[#00735C] hover:scale-110 transition-all duration-300"
                                        >
                                            <Play fill="currentColor" size={24} className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1">
                                    <div className={`${cabin.className} flex items-center gap-1.5 text-[#00735C] font-bold text-[10px] mb-2 uppercase tracking-wider`}>
                                        <MapPin size={12} fill="currentColor" />
                                        <span>{video.location}</span>
                                    </div>
                                    <h3 className={`${nunito.className} text-black font-extrabold text-base md:text-lg leading-tight mb-2 line-clamp-2 text-left`}>
                                        {video.title}
                                    </h3>
                                    <div className={`${cabin.className} text-gray-500 text-[10px] font-semibold text-left uppercase tracking-wide`}>
                                        {video.year} | {video.duration}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-500 hover:border-[#00735C] hover:text-[#00735C] disabled:opacity-40 transition-all bg-white"
                            >
                                <ChevronLeft size={14} /> Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${currentPage === page
                                        ? "bg-[#00735C] text-white shadow-md"
                                        : "bg-white border border-gray-200 text-gray-500 hover:border-[#00735C] hover:text-[#00735C]"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold text-gray-500 hover:border-[#00735C] hover:text-[#00735C] disabled:opacity-40 transition-all bg-white"
                            >
                                Next <ChevronRight size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* VIDEO POPUP MODAL (Enhanced with Sidebar) */}
            {activeVideo && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 animate-in fade-in duration-300 backdrop-blur-md">
                    <div className="w-full h-full max-w-[1600px] flex flex-col p-4 md:p-8 relative">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 gap-4">
                            <div className="flex flex-col min-w-0 flex-1">
                                <span className={`${caveat.className} text-[#00735C] text-xl font-bold italic`}>Impact Stories</span>
                                <h2 className={`${nunito.className} text-white text-xl md:text-3xl font-extrabold leading-tight`}>
                                    {activeVideo.title}
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowSidebar(!showSidebar)}
                                    className={`p-3 rounded-full transition-all hover:scale-110 active:scale-95 ${showSidebar ? "bg-[#00735C] text-black" : "bg-white/10 text-white"}`}
                                    title="Toggle Stories"
                                >
                                    <Info size={16} className="md:w-6 md:h-6" />
                                </button>
                                <button
                                    onClick={() => setActiveVideo(null)}
                                    className="text-white/60 hover:text-white transition-colors p-3 bg-white/10 rounded-full hover:bg-red-500/80 group"
                                    title="Close View"
                                >
                                    <X size={24} className="md:w-8 md:h-8 group-rotate-90 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden items-center justify-center">
                            {/* Left: Player Section */}
                            <div className={`transition-all duration-500 ease-in-out flex flex-col gap-4 ${showSidebar ? "lg:w-3/4" : "lg:w-full"}`}>
                                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                                    <iframe
                                        src={getYoutubeEmbedUrl(activeVideo.videoUrl) || ""}
                                        className="w-full h-full"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="hidden lg:flex items-center gap-6 p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-2 text-gray-400 font-bold">
                                        <MapPin size={18} className="text-[#00735C]" />
                                        <span>{activeVideo.location}</span>
                                    </div>
                                    <div className="w-px h-6 bg-white/10" />
                                    <div className="text-gray-400 font-bold">
                                        {activeVideo.year} | {activeVideo.duration}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Sidebar Section */}
                            <div className={`transition-all duration-500 ease-in-out flex flex-col bg-white/5 rounded-2xl border border-white/10 overflow-hidden ${showSidebar ? "lg:w-1/4 opacity-100" : "w-0 opacity-0 pointer-events-none border-none ml-[-2rem]"}`}>
                                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-[#00735C]">
                                        <Play size={20} fill="currentColor" />
                                        <h3 className={`${nunito.className} text-white font-bold text-lg`}>More Stories</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <X
                                            size={16}
                                            className="text-white/30 cursor-pointer hover:text-red-500 transition-colors"
                                            onClick={() => setShowSidebar(false)}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                                    <div className="flex flex-col gap-4">
                                        {videoStories.map((video) => (
                                            <div
                                                key={video.id}
                                                onClick={() => setActiveVideo(video)}
                                                className={`group flex items-start gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${activeVideo.id === video.id
                                                    ? "bg-[#00735C]/20 ring-1 ring-[#00735C]"
                                                    : "hover:bg-white/10"
                                                    }`}
                                            >
                                                <div className="relative w-28 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={video.thumbnail}
                                                        alt={video.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Play size={16} fill="currentColor" className="text-white" />
                                                    </div>
                                                    {activeVideo.id === video.id && (
                                                        <div className="absolute inset-0 bg-[#00735C]/60 flex items-center justify-center">
                                                            <div className="flex gap-1">
                                                                <span className="w-1 h-3 bg-white animate-bounce-slow"></span>
                                                                <span className="w-1 h-4 bg-white animate-bounce"></span>
                                                                <span className="w-1 h-2 bg-white animate-bounce-slow"></span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className={`${nunito.className} text-white font-bold text-sm line-clamp-2 leading-tight mb-1`}>
                                                        {video.title}
                                                    </h4>
                                                    <span className="text-gray-500 text-[10px] uppercase font-black tracking-wider">
                                                        {video.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
