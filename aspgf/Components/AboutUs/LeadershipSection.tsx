"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Nunito, Cabin } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function LeadershipSection() {
    useEffect(() => {
        // Floating up and down animation for badges
        gsap.to(".badge-trust", {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                each: 0.2,
                from: "random"
            }
        });

        gsap.to(".badge-vision", {
            y: -10,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                each: 0.2,
                from: "random"
            }
        });
    }, []);

    return (
        <section className="bg-white py-20">
            <div className="max-w-5xl mx-auto px-8 space-y-40">
                {/* ================= SECTION 1: DR. SUSHANT PATIL ================= */}
                <div>
                    <div className="mb-12">
                        <h2 className={`${nunito.className} text-[26px] text-black font-black tracking-tight leading-none pb-2`}>
                            MESSAGE FROM THE FOUNDER
                        </h2>
                        <div className="h-1.5 w-32 bg-black rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
                        <div className="relative flex flex-col items-start">


                            <div className="relative group w-full aspect-square max-w-[400px]">
                                {/* Trustworthy Badge - Floating Outside */}
                                <div className="badge-trust absolute -top-3 -left-3 text-black bg-white px-3 py-2.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-xl z-20 w-fit">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Trustworthy
                                </div>

                                <div className="w-full h-full rounded-xl overflow-hidden shadow-xl bg-transparent border-[6px] border-white relative z-10">
                                    <Image
                                        src="/Images/Sushant-patil.png"
                                        alt="Dr. Sushant Patil"
                                        fill
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Vision & Aim Badge - Floating Outside */}
                                <div className="badge-vision absolute -bottom-3 -right-3 text-black bg-white px-3 py-2.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-xl z-20 w-fit">
                                    <span className="text-teal-500 text-[10px]">◈</span>
                                    Vision & Aim
                                </div>
                            </div>

                            <div className="mt-6 text-left w-full max-w-[400px]">
                                <h4 className={`${nunito.className} font-extrabold text-[18px] text-black`}>
                                    Dr. Sushant Patil
                                </h4>
                                <p className={`${cabin.className} text-[14px] font-medium text-gray-600`}>Founder</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <p className={`${cabin.className} text-[16px] text-gray-700 leading-relaxed text-justify`}>
                                <em>Every great change begins with a simple belief — that we can make
                                    a difference. The <strong className="text-[#0a7061]">Anuja Sushant Patil Global Foundation</strong> is not just
                                    an organization, it is a <strong className="text-[#0a7061]">movement to empower lives</strong> through
                                    <strong className="text-[#0a7061]"> education, care, and opportunity</strong>.
                                </em>
                            </p>

                            <p className={`${cabin.className} text-[16px] text-gray-700 leading-relaxed text-justify`}>
                                Our vision is to create a society where <strong className="text-[#0a7061]">knowledge</strong> is not a privilege,
                                but a right; where <strong className="text-[#0a7061]">helping the needful</strong> is not an act of charity, but a
                                <strong className="text-[#0a7061]"> responsibility</strong> we all share. By <strong className="text-[#0a7061]">nurturing young minds</strong>, <strong className="text-[#0a7061]">supporting
                                    communities</strong>, and <strong className="text-[#0a7061]">encouraging self-reliance</strong>, we aim to build a
                                world where progress is <strong className="text-[#0a7061]">inclusive and sustainable</strong>.
                            </p>

                            <p className={`${cabin.className} text-[16px] text-gray-700 leading-relaxed text-justify italic border-l-4 border-teal-600 pl-8 pt-4 relative`}>
                                <span className="absolute left-2 top-0 text-4xl text-black/20 font-serif leading-none">"</span>
                                <em>I believe that <strong className="text-[#0a7061]">true success</strong> is measured not by what we achieve for
                                    ourselves, but by what we <strong className="text-[#0a7061]">enable others to achieve</strong>. Through this
                                    foundation, we strive to sow <strong className="text-[#0a7061]">seeds of hope, dignity, and growth</strong> that will inspire generations to
                                    come.
                                    <span className="inline-block translate-y-2 ml-1 text-4xl text-black/20 font-serif leading-none">"</span>
                                </em>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= SECTION 2: ANUJA PATIL ================= */}
                <div>
                    <div className="mb-12">
                        <h2 className={`${nunito.className} text-[26px] text-black font-black tracking-tight leading-none pb-2`}>
                            MESSAGE FROM THE FOUNDER
                        </h2>
                        <div className="h-1.5 w-32 bg-black rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
                        {/* Image Side */}
                        <div className="relative flex flex-col items-start">
                            <div className="relative group w-full aspect-square max-w-[400px]">
                                {/* Trustworthy Badge - Floating Outside */}
                                <div className="badge-trust absolute -top-3 -left-3 text-black bg-white px-3 py-2.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-xl z-20 w-fit">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Trustworthy
                                </div>

                                <div className="w-full h-full rounded-xl overflow-hidden shadow-xl bg-transparent border-[6px] border-white relative z-10">
                                    <Image
                                        src="/Images/Anuja-patil.png"
                                        alt="Anuja Patil"
                                        fill
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Vision & Aim Badge - Floating Outside */}
                                <div className="badge-vision absolute -bottom-3 -right-3 text-black bg-white px-3 py-2.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-xl z-20 w-fit">
                                    <span className="text-teal-500 text-[10px]">◈</span>
                                    Vision & Aim
                                </div>
                            </div>
                            <div className="mt-6 text-left w-full max-w-[400px]">
                                <h4 className={`${nunito.className} font-extrabold text-[18px] text-black`}>
                                    Adv. Anuja Patil
                                </h4>
                                <p className={`${cabin.className} text-[14px] font-medium text-gray-600`}>Founder</p>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="flex flex-col gap-4">
                            <p className={`${cabin.className} text-[16px] text-gray-700 leading-relaxed text-justify`}>
                                At the heart of every great nation lies the <strong className="text-[#0a7061]">strength of its people</strong>,
                                and that strength comes from <strong className="text-[#0a7061]">education, compassion, and
                                    opportunities to grow</strong>. With this belief, the <strong className="text-[#0a7061]">Anuja Sushant Patil
                                        Global Foundation</strong> was established as a humble step towards
                                creating a society where <strong className="text-[#0a7061]">knowledge empowers</strong>, <strong className="text-[#0a7061]">kindness uplifts</strong>,
                                and support reaches those who need it the most.
                            </p>

                            <p className={`${cabin.className} text-[16px] text-gray-700 leading-relaxed text-justify`}>
                                <strong className="text-[#0a7061]">Education</strong> is not just about academics — it is about <strong className="text-[#0a7061]">shaping
                                    confident, capable, and responsible individuals</strong> who can contribute
                                positively to the world. We are committed to <strong className="text-[#0a7061]">nurturing young minds</strong>,
                                <strong className="text-[#0a7061]"> supporting underprivileged communities</strong>, and building pathways
                                where <strong className="text-[#0a7061]">hope transforms into reality</strong>.
                            </p>

                            <p className={`${cabin.className} text-[16px] text-gray-700 leading-relaxed text-justify italic border-l-4 border-teal-600 pl-8 pt-4 relative`}>
                                <span className="absolute left-2 top-0 text-4xl text-black/20 font-serif leading-none">"</span>
                                <em>Our mission goes <strong className="text-[#0a7061]">beyond charity</strong>; it is about <strong className="text-[#0a7061]">empowering people with dignity,
                                    skills, and confidence</strong> to stand tall and lead a better tomorrow. Together,
                                    with <strong className="text-[#0a7061]">collective effort and shared responsibility</strong>, we can create a future
                                    where <strong className="text-[#0a7061]">no dream is left behind</strong> and no individual is left <br />unseen.
                                    <span className="inline-block translate-y-2 ml-1 text-4xl text-black/20 font-serif leading-none">"</span>
                                </em>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= SECTION 3: DR. SHRIRAM CHAVAN ================= */}
                <div>
                    <div className="mb-12">
                        <h2 className={`${nunito.className} text-[26px] text-black font-black tracking-tight leading-none pb-2`}>
                            MESSAGE FROM PROJECT DIRECTOR
                        </h2>
                        <div className="h-1.5 w-32 bg-black rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
                        {/* RIGHT IMAGE SIDE (Moved to Left) */}
                        <div className="relative flex flex-col items-start">


                            <div className="relative group w-full aspect-square max-w-[400px]">
                                {/* Trustworthy Badge - Floating Outside */}
                                <div className="badge-trust absolute -top-3 -left-3 text-black bg-white px-3 py-2.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-xl z-20 w-fit">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Trustworthy
                                </div>

                                <div className="w-full h-full rounded-xl overflow-hidden shadow-xl bg-transparent border-[6px] border-white relative z-10">
                                    <Image
                                        src="/Images/SHRIRAM.png"
                                        alt="Dr. Shriram Chavan"
                                        fill
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Vision & Aim Badge - Floating Outside */}
                                <div className="badge-vision absolute -bottom-3 -right-3 text-black bg-white px-3 py-2.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-xl z-20 w-fit">
                                    <span className="text-teal-500 text-[10px]">◈</span>
                                    Vision & Aim
                                </div>
                            </div>

                            <div className="mt-6 text-left w-full max-w-[400px]">
                                <h4 className={`${nunito.className} font-extrabold text-[18px] text-black uppercase`}>
                                    DR. SHRIRAM CHAVAN
                                </h4>
                                <p className={`${cabin.className} text-[14px] font-medium text-gray-600 uppercase tracking-wide`}>
                                    Project Director
                                </p>
                            </div>
                        </div>

                        {/* LEFT CONTENT (Moved to Right) */}
                        <div className="flex flex-col gap-4">
                            <p className={`${cabin.className} text-[16px] text-gray-700 leading-relaxed text-justify`}>
                                <strong className="text-[#0a7061]">Mr. Shriram Chavan</strong> is the <strong className="text-[#0a7061]">Project Director</strong> at <strong className="text-[#0a7061]">Anuja Sushant
                                    Patil Global Foundation</strong>, leading impactful initiatives in <strong className="text-[#0a7061]">education, healthcare, women empowerment, and rural development</strong>. With a strong commitment to <strong className="text-[#0a7061]">social welfare</strong>, he works to
                                create <strong className="text-[#0a7061]">sustainable change</strong> and uplift communities through
                                <strong className="text-[#0a7061]"> strategic planning and compassionate leadership</strong>.
                            </p>

                            <p className={`${cabin.className} text-[16px] text-gray-700 leading-relaxed text-justify`}>
                                Our vision is to create a society where <strong className="text-[#0a7061]">knowledge</strong> is not a privilege,
                                but a right; where <strong className="text-[#0a7061]">helping the needful</strong> is not an act of charity, but a
                                <strong className="text-[#0a7061]"> responsibility</strong> we all share. By <strong className="text-[#0a7061]">nurturing young minds</strong>, <strong className="text-[#0a7061]">supporting
                                    communities</strong>, and <strong className="text-[#0a7061]">encouraging self-reliance</strong>, we aim to build a
                                world where progress is <strong className="text-[#0a7061]">inclusive and sustainable</strong>.
                            </p>

                            <p className={`${cabin.className} text-[16px] text-gray-700 leading-relaxed text-justify italic border-l-4 border-teal-600 pl-8 pt-4 relative`}>
                                <span className="absolute left-2 top-0 text-4xl text-black/20 font-serif leading-none">"</span>
                                <em>I believe that <strong className="text-[#0a7061]">true success</strong> is measured not by what we achieve for
                                    ourselves, but by what we <strong className="text-[#0a7061]">enable others to achieve</strong>. Through this
                                    foundation, we strive to sow <strong className="text-[#0a7061]">seeds of hope, dignity, and growth</strong> that will inspire generations to
                                    come.
                                    <span className="inline-block translate-y-2 ml-1 text-4xl text-black/20 font-serif leading-none">"</span>
                                </em>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
