"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function LeadershipSection() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".fade-up", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
            });

            // Animate all Trustworthy badges
            gsap.from(".badge-trust", {
                y: -20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out",
            });

            // Animate all Vision badges
            gsap.from(".badge-vision", {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                delay: 0.2,
                ease: "power2.out",
            });

            // Floating animation (smooth & natural)
            gsap.to(".badge-trust", {
                y: 4,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(".badge-vision", {
                y: -4,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-8 space-y-40">
                {/* ================= SECTION 1: DR. SUSHANT PATIL ================= */}
                <div className="fade-up">
                    <h2 className="text-[26px] text-black font-black tracking-tight mb-12 border-b-4 border-black inline-block leading-none pb-1">
                        MESSAGE FROM THE FOUNDER
                    </h2>

                    <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    A Vision Rooted in Service
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    Global Foundation was established with a deep commitment to
                                    service and social responsibility. Our purpose is to uplift
                                    underserved communities and ensure equal access to
                                    opportunities for growth and dignity.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    Empowering Lives Through Opportunity
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    We believe empowerment begins with access — access to
                                    education, healthcare, skill development, and sustainable
                                    livelihood initiatives that enable individuals to shape their
                                    own future.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    Building Partnerships for Impact
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    Collaboration is the cornerstone of meaningful change. Through
                                    partnerships with communities, volunteers, and institutions,
                                    we strengthen our ability to create measurable and lasting
                                    impact.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    A Future Focused on Sustainability
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    Our long-term vision centers on sustainable development —
                                    fostering self-reliant communities, protecting the
                                    environment, and nurturing leadership that drives positive
                                    transformation for generations to come.
                                </p>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center">
                            <div className="absolute bottom-[-20px] left-[-20px] w-64 h-64 bg-teal-100/50 rounded-full blur-3xl -z-10"></div>

                            <div className="relative group w-full max-w-[300px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl bg-gray-50 border-[6px] border-white">
                                {/* Trustworthy Badge */}
                                <div className="badge-trust absolute text-black top-2 left-2 bg-white/90 px-2 py-1 rounded text-[8px] font-bold flex items-center gap-1 shadow-sm z-10 w-fit">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Trustworthy
                                </div>

                                <Image
                                    src="/Images/SushantPatil.webp"
                                    alt="Dr. Sushant Patil"
                                    width={300}
                                    height={380}
                                    className="w-full h-full object-cover"
                                />

                                {/* Vision & Aim Badge */}
                                <div className="badge-vision absolute bottom-4 text-black right-3 bg-white px-3 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-md border border-gray-100 z-10 w-fit">
                                    <span className="text-teal-500">◈</span>
                                    Vision & Aim
                                </div>
                            </div>

                            <div className="mt-4 text-center w-full max-w-[300px]">
                                <h4 className="font-extrabold text-[18px] text-black">
                                    Dr. Sushant Patil
                                </h4>
                                <p className="text-[14px] font-medium text-gray-600">Founder</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= SECTION 2: ANUJA PATIL ================= */}
                <div className="fade-up">
                    <h2 className="text-[26px] text-black font-black tracking-tight mb-12 border-b-4 border-black inline-block leading-none pb-1">
                        MESSAGE FROM THE FOUNDER
                    </h2>
                    <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    A Commitment to Purpose-Driven Change
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    At Global Foundation, our mission begins with compassion and
                                    responsibility. We are dedicated to building inclusive
                                    communities where every individual, regardless of background,
                                    has access to education, opportunity, and dignity.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    Empowering Communities Through Action
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    We believe real change happens at the grassroots level.
                                    Through community-driven initiatives, skill development
                                    programs, and outreach activities, we empower individuals to
                                    become catalysts of transformation within their own
                                    communities.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    Guided by Integrity and Transparency
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    Trust is the foundation of impact. We operate with complete
                                    transparency, measurable outcomes, and ethical governance to
                                    ensure that every effort contributes meaningfully toward
                                    sustainable development.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    Building a Sustainable Future Together
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    Our vision extends beyond short-term relief. We focus on
                                    long-term solutions that create lasting social impact —
                                    strengthening education, healthcare access, livelihood
                                    opportunities, and environmental sustainability for
                                    generations to come.
                                </p>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center">
                            <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-teal-100/50 rounded-full blur-3xl -z-10"></div>
                            <div className="relative group w-full max-w-[300px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl bg-gray-50 border-[6px] border-white">
                                {/* Trustworthy Badge */}
                                <div className="badge-trust absolute text-black top-2 left-2 bg-white/90 px-2 py-1 rounded text-[8px] font-bold flex items-center gap-1 shadow-sm z-10 w-fit">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Trustworthy
                                </div>

                                <Image
                                    src="/Images/AnujaPatil.webp"
                                    alt="Anuja Patil"
                                    width={300}
                                    height={380}
                                    className="w-full h-full object-cover"
                                />

                                {/* Vision & Aim Badge */}
                                <div className="badge-vision absolute bottom-4 text-black right-3 bg-white px-3 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-md border border-gray-100 z-10 w-fit">
                                    <span className="text-teal-500">◈</span>
                                    Vision & Aim
                                </div>
                            </div>
                            <div className="mt-4 text-center w-full max-w-[300px]">
                                <h4 className="font-extrabold text-[18px] text-black">
                                    Anuja Patil
                                </h4>
                                <p className="text-[14px] font-medium text-gray-600">Founder</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= SECTION 3: DR. SHRIRAM CHAVAN ================= */}
                <div className="fade-up">
                    <h2 className="text-[26px] text-black font-black tracking-tight mb-12 border-b-4 border-black inline-block leading-none pb-1">
                        MESSAGE FROM PROJECT DIRECTOR
                    </h2>

                    <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
                        {/* LEFT CONTENT */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    Turning Vision into Measurable Impact
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    At Global Foundation, our focus is on translating purpose into
                                    practical action. Every initiative is designed to create
                                    measurable outcomes that uplift communities and improve lives.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    Strengthening Systems for Sustainable Growth
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    We build structured programs, transparent governance models,
                                    and accountable systems that ensure long-term sustainability
                                    across education, healthcare, livelihood, and environmental
                                    development initiatives.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    Community-Centered Leadership
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    True development begins with listening. By collaborating with
                                    local stakeholders, volunteers, and partners, we create
                                    inclusive solutions tailored to real community needs.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-[16px] text-gray-900">
                                    Accountability with Compassion
                                </h3>
                                <p className="text-[14px] text-gray-700 leading-relaxed">
                                    While compassion drives our mission, accountability ensures
                                    our impact. We continuously evaluate our programs to guarantee
                                    that every contribution creates meaningful and lasting change.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT IMAGE SIDE */}
                        <div className="relative flex flex-col items-center">
                            <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-teal-100/50 rounded-full blur-3xl -z-10"></div>

                            <div className="relative group w-full max-w-[300px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl bg-gray-50 border-[6px] border-white">
                                {/* Trustworthy Badge */}
                                <div className="badge-trust absolute text-black top-2 left-2 bg-white/90 px-2 py-1 rounded text-[8px] font-bold flex items-center gap-1 shadow-sm z-10 w-fit">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Trustworthy
                                </div>

                                <Image
                                    src="/Images/SHRIRAM.png"
                                    alt="Dr. Shriram Chavan"
                                    width={300}
                                    height={380}
                                    className="w-full h-full object-cover"
                                />

                                {/* Vision & Aim Badge */}
                                <div className="badge-vision absolute bottom-4 text-black right-3 bg-white px-3 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-md border border-gray-100 z-10 w-fit">
                                    <span className="text-teal-500">◈</span>
                                    Vision & Aim
                                </div>
                            </div>

                            <div className="mt-4 text-center w-full max-w-[300px]">
                                <h4 className="font-extrabold text-[18px] text-black">
                                    DR. SHRIRAM CHAVAN
                                </h4>
                                <p className="text-[14px] font-medium text-gray-600 uppercase tracking-wide">
                                    Project Director
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
