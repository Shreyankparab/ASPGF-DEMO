"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { X, CheckCircle2 } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Nunito, Cabin } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type FormData = {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
};

export default function DonateForm() {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormData>();
    const [qrOpen, setQrOpen] = useState(false);

    const onSubmit = (data: FormData) => {
        setQrOpen(true);
    };

    const handleCloseQr = () => {
        setQrOpen(false);
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full max-w-full lg:max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className={`text-sm font-bold text-[#1A2E35] ${nunito.className}`}>Your Name <span className="text-red-500">*</span></label>
                        <input
                            {...register("name", {
                                required: "Name is required",
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Name can only contain letters and spaces"
                                }
                            })}
                            type="text"
                            id="name"
                            placeholder="Alif Shaikh"
                            className={`w-full h-14 px-5 rounded-2xl bg-gray-50 border ${errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:border-[#00735C] focus:ring-[#00735C]/20'} focus:ring-2 outline-none transition-all text-[#1A2E35] placeholder:text-gray-400 ${cabin.className}`}
                        />
                        {errors.name && <span className="text-red-500 text-xs font-semibold">{errors.name.message}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className={`text-sm font-bold text-[#1A2E35] ${nunito.className}`}>Email <span className="text-red-500">*</span></label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            type="email"
                            id="email"
                            placeholder="aspgf@gmail.com"
                            className={`w-full h-14 px-5 rounded-2xl bg-gray-50 border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:border-[#00735C] focus:ring-[#00735C]/20'} focus:ring-2 outline-none transition-all text-[#1A2E35] placeholder:text-gray-400 ${cabin.className}`}
                        />
                        {errors.email && <span className="text-red-500 text-xs font-semibold">{errors.email.message}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                        <label className={`text-sm font-bold text-[#1A2E35] ${nunito.className}`}>Phone Number <span className="text-red-500">*</span></label>
                        <div className={`relative rounded-2xl bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-100 focus-within:border-[#00735C] focus-within:ring-2 focus-within:ring-[#00735C]/20'} transition-all`}>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: "Phone number is required", minLength: { value: 8, message: "Invalid phone number" } }}
                                render={({ field: { onChange, value } }) => (
                                    <PhoneInput
                                        country={'in'}
                                        value={value}
                                        onChange={onChange}
                                        inputStyle={{
                                            width: '100%',
                                            height: '56px',
                                            border: 'none',
                                            background: 'transparent',
                                            paddingLeft: '54px',
                                            fontSize: '15px',
                                            color: '#1A2E35',
                                            fontFamily: 'inherit',
                                            borderRadius: '1rem'
                                        }}
                                        buttonStyle={{
                                            border: 'none',
                                            background: 'transparent',
                                            paddingLeft: '14px',
                                            borderRadius: '1rem 0 0 1rem'
                                        }}
                                        dropdownStyle={{
                                            borderRadius: '16px',
                                            border: '1px solid #f3f4f6',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                )}
                            />
                        </div>
                        {errors.phone && <span className="text-red-500 text-xs font-semibold">{errors.phone.message}</span>}
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="company" className={`text-sm font-bold text-[#1A2E35] ${nunito.className}`}>Company Name <span className="text-red-500">*</span></label>
                        <input
                            {...register("company", { required: "Company Name is required" })}
                            type="text"
                            id="company"
                            placeholder="Your Company"
                            className={`w-full h-14 px-5 rounded-2xl bg-gray-50 border ${errors.company ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:border-[#00735C] focus:ring-[#00735C]/20'} focus:ring-2 outline-none transition-all text-[#1A2E35] placeholder:text-gray-400 ${cabin.className}`}
                        />
                        {errors.company && <span className="text-red-500 text-xs font-semibold">{errors.company.message}</span>}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className={`text-sm font-bold text-[#1A2E35] ${nunito.className}`}>Additional Information</label>
                    <textarea
                        {...register("message")}
                        id="message"
                        rows={4}
                        placeholder="Share your feedback or message"
                        className={`w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#00735C] focus:ring-2 focus:ring-[#00735C]/20 outline-none transition-all text-[#1A2E35] placeholder:text-gray-400 resize-none ${cabin.className}`}
                    ></textarea>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className={`w-full sm:w-60 h-14 bg-[#00735C] text-white font-extrabold rounded-2xl hover:bg-[#005c4a] transition-colors shadow-lg shadow-[#00735C]/20 uppercase tracking-widest text-sm ${cabin.className}`}
                    >
                        Submit to Donate
                    </button>
                </div>
            </form>

            {/* QR CODE DONATION MODAL */}
            {qrOpen && (
                <div className="fixed inset-0 z-[10050] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[#0A2520]/80 backdrop-blur-sm transition-opacity"
                        onClick={handleCloseQr}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={handleCloseQr}
                            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="text-center mb-0">
                            <div className="w-20 h-20 bg-[#D5EBE1] rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="text-[#00735C]" size={40} />
                            </div>
                            <h3 className={`text-2xl font-extrabold text-[#1A2E35] mb-3 ${nunito.className}`}>Inquiry Received!</h3>
                            <p className={`text-gray-500 text-[16px] leading-relaxed mb-8 ${cabin.className}`}>
                                Thank you for your interest in supporting our foundation. We have received your details and will get in touch with you shortly to guide you through the process.
                            </p>

                            <button
                                onClick={handleCloseQr}
                                className={`w-full py-4 bg-[#00735C] text-white font-extrabold rounded-2xl hover:bg-[#005c4a] transition-colors uppercase tracking-widest text-sm ${cabin.className}`}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
