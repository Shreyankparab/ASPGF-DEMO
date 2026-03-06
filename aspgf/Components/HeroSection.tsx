"use client";

import Image from "next/image";
import { Caveat, Nunito, Manrope } from "next/font/google";
import React from "react";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const HeroSection: React.FC = () => {
    return (
        <section className="relative w-full h-[90vh] flex items-center">
            {/* BACKGROUND IMAGE */}
            <Image
                src="/Images/Hero.webp"
                alt="Hero Background"
                fill
                priority
                className="object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-[1440px] w-full px-6 md:px-10 lg:pl-[120px]">
                <div className="max-w-3xl">
                    {/* SUBTITLE */}
                    <p
                        className={`${caveat.className} text-[#38b6a1] text-3xl font-bold mb-4`}
                    >
                        Always Donate for Humanity
                    </p>

                    {/* TITLE */}
                    <h1
                        className={`${nunito.className} text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6 md:mb-0`}
                    >
                        <span className="text-[#a020f0]">Empower change</span>, one act
                        <br className="hidden md:block" />
                        {' '}of kindness at a time
                    </h1>

                    {/* DESCRIPTION */}
                    <p className={`${manrope.className} text-xl text-white mt-6 font-medium opacity-90 leading-relaxed`}>
                        Working together to uplift communities and create lasting change.
                    </p>

                    {/* BUTTON */}
                    <div className="mt-10">
                        <button
                            className={`${manrope.className} px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] hover:shadow-[0_8px_30px_rgb(0,110,87,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider`}
                        >
                            DISCOVER MORE
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
