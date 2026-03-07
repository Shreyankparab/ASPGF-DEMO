"use client";

import Image from "next/image";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Caveat, Nunito, Cabin } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const manrope = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Who can benefit from the foundation’s initiatives?",
      answer:
        "The foundation’s initiatives are designed to support communities, students, and individuals through educational, social, and outreach-based programs, depending on the nature of each initiative.The foundation’s initiatives are designed to support communities, students, and individuals through educational, social, and outreach-based programs, depending on the nature of each initiative.The foundation’s initiatives are designed to support communities, students, and individuals through educational, social, and outreach-based programs, depending on the nature of each initiative.",
    },
    {
      question: "What type of work does the foundation focus on?",
      answer:
        "We focus on community development, education, healthcare initiatives, and social upliftment activities across various regions.",
    },
    {
      question: "Are all activities listed on the website real and verified?",
      answer:
        "Yes, every activity showcased on our website is genuine and verified by our team.",
    },
    {
      question:
        "Does the foundation accept online donations through this website?",
      answer:
        "Yes, we accept secure online donations that directly support our missions and activities.",
    },
  ];

  return (
    <section className="relative w-full py-20 bg-[#f6f1e7] overflow-hidden">
      {/* Background Image Subtly Visible */}
      <div className="absolute inset-0 opacity-10 bg-[url('/Images/FAQs.png')] bg-cover bg-center filter blur-sm pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* LEFT SIDE CONTENT */}
          <div>
            {/* LABEL WITH ICON */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`${caveat.className} text-[#6f7775] text-[24px] font-bold tracking-wide mt-1`}
              >
                Frequently asked Questions
              </span>
            </div>

            <h2
              className={`${nunito.className} text-[#00715D] text-3xl md:text-5xl font-extrabold leading-[1.15] mb-8 pr-4`}
            >
              People are frequently asking some questions from us
            </h2>

            <p
              className={`${manrope.className} text-gray-600 leading-relaxed max-w-lg`}
            >
              Proactively procrastinate cross-platform results via extensive
              ideas distinctively underwhelm enterprise. Compellingly plagiarize
              value-added sources with inexpensive schemas.
            </p>
          </div>

          {/* RIGHT SIDE FAQ ACCORDION */}
          <div className="flex flex-col gap-5">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`transition-all duration-500 ease-in-out bg-white shadow-sm rounded-[32px] border border-gray-100 overflow-hidden ${
                    isOpen
                      ? "ring-2 ring-[#00715D]/5 ring-offset-0 scale-[1.02]"
                      : "hover:border-[#00715D]/30"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`w-full flex items-center justify-between text-left gap-4 py-5 px-6 md:py-6 md:px-8 transition-colors duration-300 ${
                      isOpen ? "bg-[#0b6a52]/5" : ""
                    }`}
                  >
                    <h3
                      className={`${nunito.className} text-[16px] md:text-lg font-bold transition-colors duration-300 ${
                        isOpen ? "text-[#00715D]" : "text-[#1A2E35]"
                      }`}
                    >
                      {item.question}
                    </h3>

                    <span
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 flex-shrink-0 ${
                        isOpen
                          ? "bg-[#00715D] text-white rotate-180"
                          : "bg-gray-100 text-[#00715D]"
                      }`}
                    >
                      {isOpen ? (
                        <FiMinus className="w-5 h-5" />
                      ) : (
                        <FiPlus className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {/* ANSWER WRAPPER WITH SMOOTH HEIGHT TRANSITION */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 md:px-8 md:pb-8">
                        <p
                          className={`${manrope.className} text-gray-600 leading-relaxed text-[15px] md:text-[16px]`}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
