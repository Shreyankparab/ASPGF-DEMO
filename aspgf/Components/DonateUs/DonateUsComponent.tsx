"use client";

import React from "react";
import { Caveat, Nunito, Cabin } from "next/font/google";
import { Banknote, Building2, CreditCard, Landmark } from "lucide-react";
import DonateForm from "./DonateForm";
import Image from "next/image";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800", "900"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function DonateUsComponent() {
    return (
        <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <p className={`${caveat.className} text-[#00735C] text-3xl mb-4`}>
                        Make a Difference
                    </p>
                    <h1 className={`${nunito.className} text-[#0A2520] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight`}>
                        Your Support Fuels Our Mission for Change
                    </h1>
                    <p className={`${cabin.className} text-gray-600 text-lg leading-relaxed`}>
                        Join us in our journey to empower communities and create a lasting impact. Your generous contribution helps us provide education, healthcare, and support to those who need it most.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Left Side: Account Details & Why Donate */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-10">
                        <div>
                            <h2 className={`${nunito.className} text-2xl font-extrabold text-[#1A2E35] mb-6 flex items-center gap-3`}>
                                <div className="w-10 h-10 rounded-full bg-[#D5EBE1] flex items-center justify-center">
                                    <Landmark className="text-[#00735C]" size={20} />
                                </div>
                                Bank Account Details
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Bank Name */}
                                <div className="bg-[#f8faf9] p-6 rounded-2xl border border-[#e8f1ec] transition-all hover:shadow-md">
                                    <Building2 className="text-[#00735C] mb-3" size={24} />
                                    <p className={`${nunito.className} text-xs font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>Bank Name</p>
                                    <p className={`${cabin.className} text-[#1A2E35] font-bold text-base`}>HDFC BANK LTD</p>
                                </div>

                                {/* Account Holder */}
                                <div className="bg-[#f8faf9] p-6 rounded-2xl border border-[#e8f1ec] transition-all hover:shadow-md">
                                    <CreditCard className="text-[#00735C] mb-3" size={24} />
                                    <p className={`${nunito.className} text-xs font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>Account Holder</p>
                                    <p className={`${cabin.className} text-[#1A2E35] font-bold text-base`}>Anuja Sushant Patil Global Foundation</p>
                                </div>

                                {/* Account Number */}
                                <div className="bg-[#f8faf9] p-6 rounded-2xl border border-[#e8f1ec] transition-all hover:shadow-md">
                                    <Banknote className="text-[#00735C] mb-3" size={24} />
                                    <p className={`${nunito.className} text-xs font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>Account Number</p>
                                    <p className={`${cabin.className} text-[#1A2E35] font-extrabold text-lg tracking-wider`}>50200114093952</p>
                                </div>

                                {/* IFSC Code */}
                                <div className="bg-[#f8faf9] p-6 rounded-2xl border border-[#e8f1ec] transition-all hover:shadow-md">
                                    <Landmark className="text-[#00735C] mb-3" size={24} />
                                    <p className={`${nunito.className} text-xs font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>IFSC Code</p>
                                    <p className={`${cabin.className} text-[#1A2E35] font-extrabold text-lg tracking-wider`}>HDFC0000103</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#00735C] rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden transition-all hover:shadow-xl hover:shadow-[#00735C]/20">
                            <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>

                            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                                {/* Left: 60% Content */}
                                <div className="w-full md:w-[60%]">
                                    <h3 className={`${nunito.className} text-2xl font-bold mb-4`}>Support Our Cause</h3>
                                    <p className={`${cabin.className} text-white/90 mb-8 text-lg leading-relaxed italic`}>
                                        &quot;Your small contribution can bring a big change. Every single rupee donated goes directly towards empowering those in need and creating a better tomorrow.&quot;
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                                            <Landmark size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Pay via UPI</p>
                                            <p className="font-bold text-lg">project.director@aspgf</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: 40% QR Image */}
                                <div className="w-full md:w-[40%] flex justify-center md:justify-end">
                                    <div className="bg-white p-5 rounded-[32px] shadow-2xl transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer">
                                        <div className="relative p-2 bg-gray-50 rounded-2xl border border-gray-100">
                                            <Image
                                                src="/images/donation-qr.png"
                                                alt="Donation QR Code"
                                                width={260}
                                                height={260}
                                                className="rounded-xl"
                                            />
                                        </div>
                                        <p className={`${nunito.className} text-[#00735C] text-xs font-black text-center mt-4 uppercase tracking-[0.2em]`}>Scan to Support</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Donation Form */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                            <div className="mb-8">
                                <h2 className={`${nunito.className} text-3xl font-extrabold text-[#1A2E35] mb-2`}>Donation Inquiry</h2>
                                <p className={`${cabin.className} text-gray-500`}>Fill out this form and we'll get in touch with you regarding your contribution.</p>
                            </div>
                            <DonateForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
