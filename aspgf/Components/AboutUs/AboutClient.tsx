"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { Caveat, Nunito, Cabin } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function AboutClient() {

    const [activeTab, setActiveTab] = useState("mission");
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        gsap.from(".fade-up", {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.1
        });

    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">

            <div className="flex flex-col lg:flex-row gap-16">

                {/* LEFT CONTENT */}
                <div className="lg:w-[45%]">
                    <p className={`${caveat.className} text-[#00735C] text-3xl mb-4 font-normal`}>
                        Our Approach
                    </p>
                    <h2 className={`${nunito.className} text-[#0A2520] text-4xl font-extrabold mb-6`}>
                        Building a Sustainable Future with Innovation
                    </h2>

                    <p className={`${cabin.className} text-gray-600 mb-8 font-normal`}>
                        We believe transformation starts from the ground up.
                        By fostering innovation and collaboration we empower
                        communities for sustainable development.
                    </p>
                </div>

                {/* RIGHT TABS */}
                <div className="lg:w-[55%]">

                    {/* TAB BUTTONS */}
                    <div className="flex bg-gray-100 rounded-xl p-2 mb-8">

                        <button
                            onClick={() => setActiveTab("mission")}
                            className={`${nunito.className} flex-1 py-4 rounded-lg font-extrabold transition-colors ${activeTab === "mission" ? "bg-[#00735C] text-white" : "text-[#0A2520] hover:text-[#00735C]"
                                }`}
                        >
                            <Target className="mx-auto mb-1" />
                            Mission
                        </button>

                        <button
                            onClick={() => setActiveTab("vision")}
                            className={`${nunito.className} flex-1 py-4 rounded-lg font-extrabold transition-colors ${activeTab === "vision" ? "bg-[#00735C] text-white" : "text-[#0A2520] hover:text-[#00735C]"
                                }`}
                        >
                            <Eye className="mx-auto mb-1" />
                            Vision
                        </button>

                        <button
                            onClick={() => setActiveTab("value")}
                            className={`${nunito.className} flex-1 py-4 rounded-lg font-extrabold transition-colors ${activeTab === "value" ? "bg-[#00735C] text-white" : "text-[#0A2520] hover:text-[#00735C]"
                                }`}
                        >
                            <Heart className="mx-auto mb-1" />
                            Values
                        </button>

                    </div>

                    {/* TAB CONTENT */}
                    {activeTab === "mission" && (
                        <div className="fade-up">
                            <p className={`${cabin.className} text-gray-600 mb-6 font-normal`}>
                                Our mission is to build inclusive platforms that empower
                                communities through education, healthcare, and
                                sustainable opportunities. Our mission is to build inclusive platforms that empower
                                communities through education, healthcare, and
                                sustainable opportunities.
                            </p>

                            <ul className="space-y-3">
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Accessible education for marginalized communities.
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Long-term sustainable development programs
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Accessible education for marginalized communities.
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Long-term sustainable development programs
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Accessible education for marginalized communities.
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Long-term sustainable development programs
                                </li>
                            </ul>
                        </div>
                    )}

                    {activeTab === "vision" && (
                        <div className="fade-up">
                            <p className={`${cabin.className} text-gray-600 mb-6 font-normal`}>
                                We envision a world where opportunities are not
                                limited by geography or socio-economic status. We envision a world where opportunities are not
                                limited by geography or socio-economic status. We envision a world where opportunities are not
                                limited by geography or socio-economic status.
                            </p>

                            <ul className="space-y-3">
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Accessible education for marginalized communities.
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Long-term sustainable development programs
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Accessible education for marginalized communities.
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Long-term sustainable development programs
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Accessible education for marginalized communities.
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Long-term sustainable development programs
                                </li>
                            </ul>
                        </div>
                    )}

                    {activeTab === "value" && (
                        <div className="fade-up">
                            <p className={`${cabin.className} text-gray-600 mb-6 font-normal`}>
                                Integrity, transparency, empathy, and accountability
                                guide everything we do. Integrity, transparency, empathy, and accountability
                                guide everything we do. Integrity, transparency, empathy, and accountability
                                guide everything we do.
                            </p>

                            <ul className="space-y-3">
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Accessible education for marginalized communities.
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Long-term sustainable development programs
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Accessible education for marginalized communities.
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Long-term sustainable development programs
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Accessible education for marginalized communities.
                                </li>
                                <li className={`${cabin.className} flex gap-2 font-normal text-gray-700`}>
                                    <ArrowRight className="text-[#00735C]" />
                                    Long-term sustainable development programs
                                </li>
                            </ul>
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}