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
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 mt-8">
                                <MapPin className="text-[#00735C]" size={16} />
                            </div>

                            <p className={`${nunito.className} text-[16px] font-extrabold text-[#00735C] uppercase tracking-wider mb-1 `}>
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

                            <a
                                href="tel:+919684001643"
                                className="hover:underline transition-all"
                            >
                                <p className={`${cabin.className} text-[#1A2E35] font-normal text-[12px] leading-tight`}>
                                    +91 9684001643
                                </p>
                            </a>
                        </div>

                        {/* Email */}
                        <div className="bg-[#f8faf9] p-3 rounded-xl border border-[#e8f1ec]">
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                                <span className="text-[#00735C] font-semibold text-base">@</span>
                            </div>

                            <p className={`${nunito.className} text-[16px] font-extrabold text-[#00735C] uppercase tracking-wider mb-1`}>
                                Email
                            </p>

                            <a
                                href="mailto:project.director@aspgf.org"
                                className="hover:underline transition-all"
                            >
                                <p className={`${cabin.className} text-[#1A2E35] font-normal text-[12px] break-all leading-tight`}>
                                    project.director@aspgf.org
                                </p>
                            </a>
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