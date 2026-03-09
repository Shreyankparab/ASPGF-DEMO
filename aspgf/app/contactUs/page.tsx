// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { QRCodeSVG } from "qrcode.react";
// import { useForm, Controller } from "react-hook-form";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { MapPin, Phone, Twitter, Facebook, Youtube, Instagram, X } from "lucide-react";
// import { Nunito, Manrope, Caveat } from "next/font/google";

// const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
// const manrope = Manrope({
//     subsets: ["latin"],

//     weight: ["400", "500", "600", "700", "800"],
// });
// const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });

// export function ContactUs() {
//     const [isQrOpen, setIsQrOpen] = React.useState(false);

//     type FormData = {
//         name: string;
//         email: string;
//         phone: string;
//         company: string;
//         message: string;
//     };

//     const {
//         register,
//         handleSubmit,
//         control,
//         formState: { errors },
//     } = useForm<FormData>();

//     const onSubmit = (data: FormData) => {
//         setIsQrOpen(true);
//     };

//     return (


//         <section className={`w-full bg-white py-16 px-6 md:px-12 lg:px-24 ${manrope.className}`}>
//             <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-0">

//                 {/* LEFT COLUMN */}
//                 <div className="w-full lg:w-1/2 lg:pr-12 xl:pr-16 flex flex-col items-start relative pb-10">
//                     <p className={`${caveat.className} text-[#00735C] text-3xl mb-4`}>
//                         Get In Touch
//                     </p>
//                     <h2 className="text-[#0A2520] text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.05] tracking-tight mb-8">
//                         Feel free to reach out with any questions or feedback.
//                     </h2>

//                     <p className="text-[#1A2E35] font-medium text-[15px] leading-relaxed mb-12 max-w-[95%]">
//                         Whether you want to volunteer, partner with us, or simply learn more — reach out.
//                         Every connection starts a conversation. Whether you want to volunteer, partner
//                         with us, or simply learn more — reach out. Every connection starts a conversation.
//                     </p>

//                     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mb-16 w-full max-w-full lg:max-w-xl">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Name */}
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="name" className="text-sm font-bold text-[#1A2E35]">Your Name <span className="text-red-500">*</span></label>
//                                 <input
//                                     {...register("name", {
//                                         required: "Name is required",
//                                         pattern: {
//                                             value: /^[A-Za-z\s]+$/,
//                                             message: "Name can only contain letters and spaces"
//                                         }
//                                     })}
//                                     type="text"
//                                     id="name"
//                                     placeholder="John Doe"
//                                     className={`w-full h-14 px-5 rounded-2xl bg-gray-50 border ${errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:border-[#00735C] focus:ring-[#00735C]/20'} focus:ring-2 outline-none transition-all text-[#1A2E35] placeholder:text-gray-400`}
//                                 />
//                                 {errors.name && <span className="text-red-500 text-xs font-semibold">{errors.name.message}</span>}
//                             </div>

//                             {/* Email */}
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="email" className="text-sm font-bold text-[#1A2E35]">Email <span className="text-red-500">*</span></label>
//                                 <input
//                                     {...register("email", {
//                                         required: "Email is required",
//                                         pattern: {
//                                             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                             message: "Please enter a valid email address"
//                                         }
//                                     })}
//                                     type="email"
//                                     id="email"
//                                     placeholder="john@company.com"
//                                     className={`w-full h-14 px-5 rounded-2xl bg-gray-50 border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:border-[#00735C] focus:ring-[#00735C]/20'} focus:ring-2 outline-none transition-all text-[#1A2E35] placeholder:text-gray-400`}
//                                 />
//                                 {errors.email && <span className="text-red-500 text-xs font-semibold">{errors.email.message}</span>}
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {/* Phone */}
//                             <div className="flex flex-col gap-2">
//                                 <label className="text-sm font-bold text-[#1A2E35]">Phone Number <span className="text-red-500">*</span></label>
//                                 <div className={`relative rounded-2xl bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-100 focus-within:border-[#00735C] focus-within:ring-2 focus-within:ring-[#00735C]/20'} transition-all`}>
//                                     <Controller
//                                         name="phone"
//                                         control={control}
//                                         rules={{ required: "Phone number is required", minLength: { value: 8, message: "Invalid phone number" } }}
//                                         render={({ field: { onChange, value } }) => (
//                                             <PhoneInput
//                                                 country={'in'}
//                                                 value={value}
//                                                 onChange={onChange}
//                                                 inputStyle={{
//                                                     width: '100%',
//                                                     height: '56px',
//                                                     border: 'none',
//                                                     background: 'transparent',
//                                                     paddingLeft: '54px',
//                                                     fontSize: '15px',
//                                                     color: '#1A2E35',
//                                                     fontFamily: 'inherit',
//                                                     borderRadius: '1rem'
//                                                 }}
//                                                 buttonStyle={{
//                                                     border: 'none',
//                                                     background: 'transparent',
//                                                     paddingLeft: '14px',
//                                                     borderRadius: '1rem 0 0 1rem'
//                                                 }}
//                                                 dropdownStyle={{
//                                                     borderRadius: '16px',
//                                                     border: '1px solid #f3f4f6',
//                                                     boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
//                                                 }}
//                                             />
//                                         )}
//                                     />
//                                 </div>
//                                 {errors.phone && <span className="text-red-500 text-xs font-semibold">{errors.phone.message}</span>}
//                             </div>

//                             {/* Company */}
//                             <div className="flex flex-col gap-2">
//                                 <label htmlFor="company" className="text-sm font-bold text-[#1A2E35]">Company Name <span className="text-red-500">*</span></label>
//                                 <input
//                                     {...register("company", { required: "Company Name is required" })}
//                                     type="text"
//                                     id="company"
//                                     placeholder="Your Company"
//                                     className={`w-full h-14 px-5 rounded-2xl bg-gray-50 border ${errors.company ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-100 focus:border-[#00735C] focus:ring-[#00735C]/20'} focus:ring-2 outline-none transition-all text-[#1A2E35] placeholder:text-gray-400`}
//                                 />
//                                 {errors.company && <span className="text-red-500 text-xs font-semibold">{errors.company.message}</span>}
//                             </div>
//                         </div>

//                         {/* Additional Info */}
//                         <div className="flex flex-col gap-2">
//                             <label htmlFor="message" className="text-sm font-bold text-[#1A2E35]">Additional Information</label>
//                             <textarea
//                                 {...register("message")}
//                                 id="message"
//                                 rows={4}
//                                 placeholder="How can we help you?"
//                                 className="w-full p-5 rounded-2xl bg-gray-50 border border-gray-100 focus:border-[#00735C] focus:ring-2 focus:ring-[#00735C]/20 outline-none transition-all text-[#1A2E35] placeholder:text-gray-400 resize-none"
//                             ></textarea>
//                         </div>

//                         <div className="flex justify-center mt-4">
//                             <button
//                                 type="submit"
//                                 className="w-full sm:w-60 h-14 bg-[#00735C] text-white font-extrabold rounded-2xl hover:bg-[#005c4a] transition-colors shadow-lg shadow-[#00735C]/20 uppercase tracking-widest text-sm"
//                             >
//                                 Submit to Donate
//                             </button>
//                         </div>
//                     </form>

//                     {/* Socials */}
//                     {/* <div className="flex items-center gap-4 mt-auto">
//                         <Link href="#" className="w-14 h-14 rounded-full bg-[#D5EBE1] flex items-center justify-center hover:bg-[#00735C] group transition-colors">
//                             <Twitter className="text-[#00735C] group-hover:text-white transition-colors" fill="currentColor" size={20} />
//                         </Link>
//                         <Link href="#" className="w-14 h-14 rounded-full bg-[#D5EBE1] flex items-center justify-center hover:bg-[#00735C] group transition-colors">
//                             <Facebook className="text-[#00735C] group-hover:text-white transition-colors" fill="currentColor" size={20} />
//                         </Link>
//                         <Link href="#" className="w-14 h-14 rounded-full bg-[#D5EBE1] flex items-center justify-center hover:bg-[#00735C] group transition-colors">
//                             <Youtube className="text-[#00735C] group-hover:text-white transition-colors" size={20} />
//                         </Link>
//                         <Link href="#" className="w-14 h-14 rounded-full bg-[#D5EBE1] flex items-center justify-center hover:bg-[#00735C] group transition-colors">
//                             <Instagram className="text-[#00735C] group-hover:text-white transition-colors" size={20} />
//                         </Link>
//                     </div> */}
//                 </div>

//                 {/* RIGHT COLUMN */}
//                 <div className="w-full lg:w-1/2 lg:pl-12 xl:pl-16 lg:border-l lg:border-gray-200 flex flex-col gap-8 h-full">

//                     {/* MAP */}
//                     <div className="w-full h-72 sm:h-80 lg:h-[360px] bg-gray-100 rounded-[32px] overflow-hidden relative shadow-sm">
//                         <iframe
//                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.164808386828!2d73.7709328!3d18.5666113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bec8975a5cb3%3A0xc0fb1df95e990c74!2sSeamedu%20-%20School%20of%20Pro-Expressionism!5e0!3m2!1sen!2sin!4v1709405232757!5m2!1sen!2sin"
//                             width="100%"
//                             height="100%"
//                             style={{ border: 0 }}
//                             allowFullScreen={false}
//                             loading="lazy"
//                             referrerPolicy="no-referrer-when-downgrade"
//                             className="grayscale-[0.1] contrast-[0.9]"
//                         ></iframe>
//                         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-5 w-[90%] sm:w-[280px] bg-white/95 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between shadow-lg">
//                             <div>
//                                 <p className="text-[13px] font-bold text-[#1A2E35]">Balewadi, Pune</p>
//                                 <p className="text-[10px] text-gray-500 font-medium mt-0.5">Main Headquarters</p>
//                             </div>
//                             <Link href="https://maps.google.com/?q=Seamedu+School+of+Pro-Expressionism+Pune" target="_blank" className="bg-[#00735C] text-white text-[9px] tracking-wider font-extrabold px-4 py-2.5 rounded-lg hover:bg-[#005c49] transition-colors">
//                                 GET DIRECTIONS
//                             </Link>
//                         </div>
//                     </div>

//                     {/* OFFICE HOURS CARD */}
//                     <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/60">
//                         <div className="flex items-center justify-between mb-2">
//                             <h3 className="text-[22px] font-bold text-[#1A2E35]">Office Hours</h3>

//                             {new Date().getDay() !== 0 ? (
//                                 <div className="bg-[#D5EBE1] text-[#00735C] text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-widest">
//                                     <span className="w-[5px] h-[5px] bg-[#00735C] rounded-full animate-pulse"></span>
//                                     Open Now
//                                 </div>
//                             ) : (
//                                 <div className="bg-red-50 text-red-500 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-widest">
//                                     <span className="w-[5px] h-[5px] bg-red-500 rounded-full"></span>
//                                     Closed Now
//                                 </div>
//                             )}
//                         </div>
//                         <p className="text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100">"Visit us and be part of the change."</p>

//                         <div className="flex flex-col gap-4 text-[13px] text-gray-500">
//                             <div className="flex justify-between items-center">
//                                 <span>Monday — Saturday</span>
//                                 <span className="text-[#1A2E35] font-bold">9:00 AM — 6:00 PM</span>
//                             </div>

//                             <div className="flex justify-between items-center">
//                                 <span>Sunday</span>
//                                 <span className="text-red-500 font-bold">Closed</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* CONTACT INFO GRID (Moved and Refactored) */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
//                         {/* Address */}
//                         <div className="bg-[#f8faf9] p-3 pt-8 rounded-xl border border-[#e8f1ec]">
//                             <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
//                                 <MapPin className="text-[#00735C]" size={16} />
//                             </div>

//                             <p className={`${nunito.className} text-[10px] font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>
//                                 Address
//                             </p>

//                             <p className="text-[#1A2E35] font-semibold text-[12px] leading-tight">
//                                 6th Floor, Solitaire Business Hub, <br /> Office No. 612, Balewadi High St, <br /> Balewadi, Pune, Maharashtra 411045
//                             </p>
//                         </div>

//                         <div className="col-span-1 flex flex-col gap-3">

//                             {/* Phone */}
//                             <div className="bg-[#f8faf9] p-3 rounded-xl border border-[#e8f1ec]">
//                                 <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
//                                     <Phone className="text-[#00735C]" size={16} />
//                                 </div>

//                                 <p className={`${nunito.className} text-[10px] font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>
//                                     Helpline
//                                 </p>

//                                 <p className="text-[#1A2E35] font-semibold text-[12px] leading-tight">
//                                     +91 9684001643
//                                 </p>
//                             </div>

//                             {/* Email */}
//                             <div className="bg-[#f8faf9] p-3 rounded-xl border border-[#e8f1ec]">
//                                 <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
//                                     <span className="text-[#00735C] font-semibold text-base">@</span>
//                                 </div>

//                                 <p className={`${nunito.className} text-[10px] font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>
//                                     Email
//                                 </p>

//                                 <p className="text-[#1A2E35] font-semibold text-[12px] break-all leading-tight">
//                                     project.director@aspgf.org
//                                 </p>
//                             </div>

//                         </div>
//                     </div>

//                     {/* DONATE CARD */}
//                     {/* <div className="bg-[#0b6b55] rounded-[32px] p-8 lg:p-10 text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-[#0b6b55]/20">
//                         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl mix-blend-overlay rotate-12"></div>

//                         <div className="relative z-10 flex-1">
//                             <h3 className="text-2xl lg:text-3xl font-medium mb-2 leading-snug">Want to make a<br />difference today?</h3>
//                             <p className="text-white/80 text-sm font-medium">Your support fuels our mission.</p>
//                         </div>
//                         <Link href="/donate" className={`${nunito.className} relative z-10 bg-white text-[#C5633A] font-extrabold tracking-widest uppercase text-xs px-8 py-4 rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 block text-center shrink-0`}>
//                             Donate Now
//                         </Link>
//                     </div> */}

//                 </div>
//             </div>

//             {/* QR CODE DONATION MODAL */}
//             {isQrOpen && (
//                 <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
//                     {/* Backdrop */}
//                     <div
//                         className="absolute inset-0 bg-[#0A2520]/80 backdrop-blur-sm transition-opacity"
//                         onClick={() => setIsQrOpen(false)}
//                     />

//                     {/* Modal Content */}
//                     <div className="relative w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
//                         <button
//                             onClick={() => setIsQrOpen(false)}
//                             className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
//                         >
//                             <X size={18} />
//                         </button>

//                         <div className="text-center mb-8">
//                             <div className="w-16 h-16 bg-[#D5EBE1] rounded-full flex items-center justify-center mx-auto mb-4">
//                                 <MapPin className="text-[#00735C]" size={28} />
//                             </div>
//                             <h3 className="text-2xl font-extrabold text-[#1A2E35] mb-2">Scan to Donate</h3>
//                             <p className="text-gray-500 text-[15px]">Open your preferred UPI app and scan the QR code to proceed with donation.</p>
//                         </div>

//                         <div className="flex justify-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
//                             {/* Note: I'm just substituting ASPGF name into UPI format, 
//                                 adjust the value to match actual UPI ID/Link if u have one */}
//                             <QRCodeSVG
//                                 value="upi://pay?pa=project.director@aspgf&pn=ASPGF&cu=INR"
//                                 size={220}
//                                 bgColor="#F9FAFB"
//                                 fgColor="#1A2E35"
//                             />
//                         </div>

//                         <div className="mt-8 pt-6 border-t border-gray-100 text-center">
//                             <p className="text-sm font-bold text-[#1A2E35]">Thank You For Your Support!</p>
//                             <p className="text-xs text-gray-500 mt-1">Your contribution makes a difference.</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default ContactUs;


import { Metadata } from "next";
import ContactForm from "@/Components/ContactUs/ContactForm";
import { MapPin, Phone } from "lucide-react";
import { Caveat, Nunito, Cabin } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
    title: "Contact Us | ASPGF",
    description:
        "Get in touch with ASPGF. Reach out for volunteering, partnerships, or any queries.",
    openGraph: {
        title: "Contact Us | ASPGF",
        description:
            "Feel free to reach out with any questions or feedback.",
        url: "https://yourdomain.com/contact",
        siteName: "ASPGF",
        type: "website",
    },
};

export default function ContactPage() {
    return (
        <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

                {/* LEFT SIDE */}
                <div className="w-full lg:w-1/2 flex flex-col">

                    <p className={`${caveat.className} text-[#6f7775] text-3xl mb-4 font-normal`}>
                        Get In Touch
                    </p>

                    <h1 className={`${nunito.className} text-[#0A2520] text-4xl md:text-5xl font-extrabold mb-6`}>
                        Feel free to reach out with any questions or feedback.
                    </h1>

                    <p className={`${cabin.className} text-gray-600 mb-10`}>
                        Whether you want to volunteer, partner with us, or simply learn more reach out. Every connection starts a conversation. Whether you want to volunteer, partner with us, or simply learn more reach out. Every connection starts a conversation.  Whether you want to volunteer, partner with us, or simply learn more reach out. Every connection starts a conversation.   Whether you want to volunteer, partner with us, or simply learn more reach out. Every connection starts a conversation.
                    </p>

                    {/* CLIENT COMPONENT */}
                    {/* <ContactForm /> */}

                    {/* CONTACT INFO GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-9">
                        {/* Address */}
                        <div className="sm:row-span-2 bg-[#f8faf9] p-3 rounded-xl border border-[#e8f1ec]">
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                                <MapPin className="text-[#00735C]" size={16} />
                            </div>

                            <p className={`${nunito.className} text-[16px] font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>
                                Address
                            </p>

                            <p className={`${cabin.className} text-[#1A2E35] font-normal text-[12px] leading-tight`}>
                                Dr. Sushant Patil Corporate, Office No. 615, 6th Floor, <br /> Solitaire Business Hub, Balewadi High Street, <br /> Baner, Pune 411045
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="bg-[#f8faf9] p-3 rounded-xl border border-[#e8f1ec]">
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                                <Phone className="text-[#00735C]" size={16} />
                            </div>

                            <p className={`${nunito.className} text-[16px] font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>
                                Helpline
                            </p>

                            <p className={`${cabin.className} text-[#1A2E35] font-normal text-[12px] leading-tight`}>
                                +91 9684001643
                            </p>
                        </div>

                        {/* Email */}
                        <div className="bg-[#f8faf9] p-3 rounded-xl border border-[#e8f1ec]">
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                                <span className="text-[#00735C] font-semibold text-base">@</span>
                            </div>

                            <p className={`${nunito.className} text-[16px] font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>
                                Email
                            </p>

                            <p className={`${cabin.className} text-[#1A2E35] font-normal text-[12px] break-all leading-tight`}>
                                project.director@aspgf.org
                            </p>
                        </div>
                    </div>


                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:w-1/2 flex flex-col gap-8">

                    {/* MAP */}
                    <div className="w-full h-80 sm:h-80 lg:h-[380px] bg-gray-100 rounded-[32px] overflow-hidden relative shadow-sm">
                        <iframe
                            src="https://maps.google.com/maps?q=Seamedu%20%2F%20Toolbox%20Studio%2C%206th%20Floor%2C%20Solitaire%20Business%20Hub%2C%20Office%20No.%20612%2C%20Balewadi%20High%20St%2C%20Balewadi%2C%20Pune%2C%20Maharashtra%20411045&t=&z=17&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[0.1] contrast-[0.9]"
                        ></iframe>
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-5 w-[80%] sm:w-[280px] bg-white/95 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between shadow-lg">
                            <div>
                                <p className={`${cabin.className} text-[13px] font-extrabold text-[#1A2E35]`}>Solitaire Business Hub</p>
                                <div className="mt-0.5 flex items-center gap-1.5">
                                    <span className={`w-[5px] h-[5px] rounded-full ${new Date().getDay() !== 0 ? 'bg-[#00735C] animate-pulse' : 'bg-red-500'}`}></span>
                                    <p className={`${cabin.className} text-[10px] ${new Date().getDay() !== 0 ? 'text-[#00735C]' : 'text-red-500'} font-extrabold uppercase tracking-widest`}>
                                        {new Date().getDay() !== 0 ? 'Open Now' : 'Closed Now'}
                                    </p>
                                </div>
                            </div>
                            <a href="https://www.google.com/maps/search/?api=1&query=Seamedu+%2F+Toolbox+Studio%2C+6th+Floor%2C+Solitaire+Business+Hub%2C+Office+No.+612%2C+Balewadi+High+St%2C+Balewadi%2C+Pune%2C+Maharashtra+411045" target="_blank" className={`${cabin.className} bg-[#00735C] text-white text-[9px] tracking-wider font-extrabold px-4 py-2.5 rounded-lg hover:bg-[#005c49] transition-colors`}>
                                GET DIRECTIONS
                            </a>
                        </div>
                    </div>

                    {/* OFFICE HOURS CARD */}
                    <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/60">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex flex-col">
                                <h3 className={`${nunito.className} text-[22px] font-extrabold text-[#1A2E35]`}>Solitaire Business Hub</h3>
                                <p className={`${cabin.className} text-[#00735C] text-[10px] font-extrabold uppercase tracking-widest mt-1`}>Operating Hours</p>
                            </div>

                            {new Date().getDay() !== 0 ? (
                                <div className={`${cabin.className} bg-[#D5EBE1] text-[#00735C] text-[10px] font-normal px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-widest`}>
                                    <span className="w-[5px] h-[5px] bg-[#00735C] rounded-full animate-pulse"></span>
                                    Open Now
                                </div>
                            ) : (
                                <div className={`${cabin.className} bg-red-50 text-red-500 text-[10px] font-normal px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-widest`}>
                                    <span className="w-[5px] h-[5px] bg-red-500 rounded-full"></span>
                                    Closed Now
                                </div>
                            )}
                        </div>
                        <p className={`${cabin.className} text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100`}>&quot;Visit us and be part of the change.&quot;</p>

                        <div className="flex flex-col gap-4 text-[13px] text-gray-500">
                            <div className="flex justify-between items-center">
                                <span className={cabin.className}>Monday — Saturday</span>
                                <span className={`${cabin.className} text-[#1A2E35] font-normal`}>9:00 AM — 6:00 PM</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className={cabin.className}>Sunday</span>
                                <span className={`${cabin.className} text-red-500 font-normal`}>Closed</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}