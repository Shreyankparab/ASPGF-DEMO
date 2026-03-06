"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Nunito, Manrope, Caveat } from "next/font/google";
import { ArrowRight, CheckCircle2, ChevronRight, Target, Eye, Heart, Globe, Quote } from "lucide-react";
import gsap from "gsap";

// Fonts setup
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});
const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });

export default function AboutUs() {
    // State for Tabs
    const [activeTab, setActiveTab] = useState("mission");
    const [activeYear, setActiveYear] = useState("2010");
    const sectionRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".fade-up", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    React.useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
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
        <main className={`w-full bg-white ${manrope.className}`}>
            {/* HERO SECTION */}
            <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-start overflow-hidden">
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0 bg-[#0A2520]">
                    <img
                        src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop"
                        alt="Group of diverse children smiling"
                        className="w-full h-full object-cover object-top opacity-80"
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0A2520]/90 md:from-[#0A2520]/80 to-transparent z-10" />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full">
                    <div className="max-w-xl left-0 absolute pl-6 md:pl-12 lg:pl-24 top-1/2 -translate-y-1/2">
                        <h1 className="text-white text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.1] mb-8">
                            Committed To Purpose,<br />
                            Guided By Integrity
                        </h1>
                        <div className="w-64 h-[2px] bg-white/30 mb-8 rounded-full">
                            <div className="w-16 h-full bg-white" />
                        </div>
                        <h2 className={`${caveat.className} text-white text-3xl md:text-4xl mb-4`}>
                            About Us
                        </h2>
                        <p className="text-white/90 text-[15px] md:text-base font-medium leading-relaxed max-w-md">
                            Working Towards Inclusive Development Through Education, Outreach, And Community Programs.
                        </p>
                    </div>
                </div>
            </section>

            {/* APPROACH & MISSION TABS SECTION */}
            <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left Side */}
                    <div className="w-full lg:w-[45%] relative">
                        {/* Background faded globe/leaves icon */}
                        <div className="absolute -top-10 -left-10 opacity-[0.03] w-64 h-64 z-0 pointer-events-none">
                            <Globe size={256} className="text-[#00735C]" />
                        </div>

                        <div className="relative z-10">
                            <p className={`${caveat.className} text-[#00735C] text-2xl mb-3`}>Our Approach</p>
                            <h2 className="text-[#0A2520] text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-[1.15] mb-6">
                                Building a Sustainable Future with Innovation
                            </h2>
                            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                                We believe that true transformation starts from the ground up. By fostering innovation, transparency, and collaboration, we aim to implement long-term strategies that empower local communities.
                            </p>
                            <button className="bg-[#00735C] text-white px-8 py-3.5 rounded-full font-extrabold text-[12px] uppercase tracking-widest hover:bg-[#005c49] transition-all shadow-lg shadow-[#00735C]/20 flex items-center gap-2">
                                Read More
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Tabs */}
                    <div className="w-full lg:w-[55%]">
                        {/* Tab Headers */}
                        <div className="flex bg-[#E8EFEA] rounded-2xl p-2 mb-8 relative">
                            <button
                                onClick={() => setActiveTab("mission")}
                                className={`flex-1 flex flex-col items-center justify-center py-5 rounded-xl transition-all duration-300 ${activeTab === "mission" ? "bg-[#00735C] text-white shadow-md" : "text-[#1A2E35] hover:bg-[#00735C]/10"}`}
                            >
                                <Target className={`mb-3 ${activeTab === "mission" ? "text-white" : "text-[#00735C]"}`} size={24} />
                                <span className="font-extrabold text-[13px] tracking-wide">Our Mission</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("vision")}
                                className={`flex-1 flex flex-col items-center justify-center py-5 rounded-xl transition-all duration-300 ${activeTab === "vision" ? "bg-[#00735C] text-white shadow-md relative z-10" : "text-[#1A2E35] hover:bg-[#00735C]/10"}`}
                            >
                                <Eye className={`mb-3 ${activeTab === "vision" ? "text-white" : "text-[#00735C]"}`} size={24} />
                                <span className="font-extrabold text-[13px] tracking-wide">Our Vision</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("value")}
                                className={`flex-1 flex flex-col items-center justify-center py-5 rounded-xl transition-all duration-300 ${activeTab === "value" ? "bg-[#00735C] text-white shadow-md relative z-10" : "text-[#1A2E35] hover:bg-[#00735C]/10"}`}
                            >
                                <Heart className={`mb-3 ${activeTab === "value" ? "text-white" : "text-[#00735C]"}`} size={24} />
                                <span className="font-extrabold text-[13px] tracking-wide">Our Value</span>
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white p-2">
                            {activeTab === "mission" && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <p className="text-gray-600 leading-relaxed mb-6 font-medium text-[15px]">
                                        Our mission is to establish sustainable platforms through inclusive programs that directly address local needs. We are dedicated to creating resilient societies by bridging gaps in healthcare, education, and resources.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "Advancing Accessible And Quality Education to Marginalized Communities",
                                            "Encouraging Responsible Citizenship And Ethical Leadership",
                                            "Engaging In Outreach Programs That Address Socio-Economic Challenges",
                                            "Building Long-Term Solutions Instead of Short-Term Relief",
                                            "Creating Measurable, Transparent, And Sustainable Impact"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="mt-0.5 shrink-0">
                                                    <ArrowRight className="text-[#00735C]" size={18} />
                                                </div>
                                                <span className="text-[#1A2E35] font-bold text-[14px] leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === "vision" && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <p className="text-gray-600 leading-relaxed mb-6 font-medium text-[15px]">
                                        We envision a world where opportunities are not limited by geography or socio-economic status. A future where every individual has the foundational support needed to thrive and contribute meaningully to society.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "A global network of empowered and self-sustaining communities",
                                            "Eradicating basic disparities through modern innovation",
                                            "Cultivating global partnerships for systemic change"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="mt-0.5 shrink-0">
                                                    <ArrowRight className="text-[#00735C]" size={18} />
                                                </div>
                                                <span className="text-[#1A2E35] font-bold text-[14px] leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === "value" && (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <p className="text-gray-600 leading-relaxed mb-6 font-medium text-[15px]">
                                        Our core values are the compass that guides every initiative we undertake. We hold ourselves to the highest standards of integrity, empathy, and accountability.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "Integrity and Transparency in all operations",
                                            "Unwavering Empathy for the communities we serve",
                                            "Commitment to Lasting Quality and Excellence",
                                            "Respect for Diversity and Inclusion"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="mt-0.5 shrink-0">
                                                    <ArrowRight className="text-[#00735C]" size={18} />
                                                </div>
                                                <span className="text-[#1A2E35] font-bold text-[14px] leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#f8faf9] border-y border-[#e8f1ec]">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
                    <div className="flex flex-col items-center justify-center text-center flex-1 w-full relative">
                        <div className="w-20 h-20 rounded-full border border-[#00735C]/20 border-dashed text-[#00735C] flex items-center justify-center mb-6 bg-white shadow-sm relative">
                            {/* Inner circle */}
                            <div className="w-16 h-16 rounded-full bg-[#E8EFEA] flex items-center justify-center">
                                <CheckCircle2 size={28} />
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-[46px] font-black text-[#0A2520] mb-2 tracking-tight">98%</h3>
                        <p className="text-[#00735C] text-[11px] font-extrabold uppercase tracking-widest">Successful Initiatives</p>
                    </div>

                    <div className="hidden md:block w-px h-24 bg-gray-200" />

                    <div className="flex flex-col items-center justify-center text-center flex-1 w-full relative">
                        <div className="w-20 h-20 rounded-full border border-[#00735C]/20 border-dashed text-[#00735C] flex items-center justify-center mb-6 bg-white shadow-sm relative">
                            {/* Inner circle */}
                            <div className="w-16 h-16 rounded-full bg-[#E8EFEA] flex items-center justify-center">
                                <Heart size={28} />
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-[46px] font-black text-[#0A2520] mb-2 tracking-tight">1265+</h3>
                        <p className="text-[#00735C] text-[11px] font-extrabold uppercase tracking-widest">Individuals Reached</p>
                    </div>

                    <div className="hidden md:block w-px h-24 bg-gray-200" />

                    <div className="flex flex-col items-center justify-center text-center flex-1 w-full relative">
                        <div className="w-20 h-20 rounded-full border border-[#00735C]/20 border-dashed text-[#00735C] flex items-center justify-center mb-6 bg-white shadow-sm relative">
                            {/* Inner circle */}
                            <div className="w-16 h-16 rounded-full bg-[#E8EFEA] flex items-center justify-center">
                                <Globe size={28} />
                            </div>
                        </div>
                        <h3 className="text-4xl md:text-[46px] font-black text-[#0A2520] mb-2 tracking-tight">36k</h3>
                        <p className="text-[#00735C] text-[11px] font-extrabold uppercase tracking-widest">Global Supporters</p>
                    </div>
                </div>
            </section>


            {/* LEADERSHIP SECTION replaced by the MessageSection component inline */}
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

            {/* NEW SECTION replacing Journey */}
            <section className="py-20 flex justify-center">
                <div className="relative flex flex-col items-center">
                    <div className="absolute bottom-[-20px] left-[-20px] w-64 h-64 bg-teal-100/50 rounded-full blur-3xl -z-10"></div>

                    <div className="relative group w-full max-w-[280px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-xl bg-gray-50 border-[6px] border-white">
                        {/* Trustworthy Badge */}
                        <div className="badge-trust absolute text-black top-2 left-2 bg-white/90 px-2 py-1 rounded text-[8px] font-bold flex items-center gap-1 shadow-sm z-10 w-fit">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Trustworthy
                        </div>

                        <Image
                            src="/Images/SushantPatil.webp"
                            alt="Dr. Sushant Patil"
                            width={280}
                            height={360}
                            className="w-full h-full object-cover"
                        />

                        {/* Vision & Aim Badge */}
                        <div className="badge-vision absolute bottom-4 text-black right-3 bg-white px-3 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 shadow-md border border-gray-100 z-10 w-fit">
                            <span className="text-teal-500">◈</span>
                            Vision & Aim
                        </div>
                    </div>

                    <div className="mt-4 text-left w-full pl-2">
                        <h4 className="font-extrabold text-[18px] text-black">
                            Dr. Sushant Patil
                        </h4>
                        <p className="text-[14px] font-medium text-gray-600">Founder</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
