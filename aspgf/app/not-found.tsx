"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Nunito, Cabin, Caveat } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });

export default function NotFound() {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-6 text-center bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#00735C]/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#A828C6]/5 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* 404 Number with floating animation */}
                <h1 className={`${nunito.className} text-[120px] md:text-[200px] font-black text-[#00735C]/10 leading-none select-none animate-bounce-slow inline-block`}>
                    404
                </h1>

                <div className="-mt-10 md:-mt-20">
                    <p className={`${caveat.className} text-[#A828C6] text-3xl md:text-4xl mb-4`}>
                        Oops! You're lost
                    </p>
                    <h2 className={`${nunito.className} text-3xl md:text-5xl font-extrabold text-[#1A2E35] mb-6`}>
                        Page Not Found
                    </h2>
                    <p className={`${cabin.className} text-gray-500 text-lg max-w-md mx-auto mb-10 leading-relaxed font-medium`}>
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                        <Link
                            href="/"
                            className={`${cabin.className} flex items-center gap-2 bg-[#00735C] text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#005c4a] transition-all hover:shadow-lg hover:shadow-[#00735C]/20 hover:-translate-y-1`}
                        >
                            <Home size={18} />
                            Go to Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className={`${cabin.className} flex items-center gap-2 border-2 border-gray-100 text-[#1A2E35] px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-gray-50 transition-all hover:border-gray-200`}
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.05); opacity: 0.2; }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
