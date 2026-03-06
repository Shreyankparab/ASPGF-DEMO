"use client";

import React from "react";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: ["800", "900"] });

const focusItems = [
  "Education",
  "Health Care",
  "Old Age Care",
  "Orphanage",
  "Education",
  "Health Care",
  "Old Age Care",
  "Orphanage",
];

const CustomStar = () => (
  <span className="mx-12 md:mx-20 flex items-center justify-center shrink-0">
    <svg width="65" height="65" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M41 10h18v26l22.5-13 9 15.6L68 51.1l22.5 13-9 15.6-22.5-13V92H41V66.7L18.5 79.7l-9-15.6 22.5-13L9.5 38.1l9-15.6L41 35.5V10z"
        fill="white"
        stroke="#006e57"
        strokeWidth="6"
        strokeLinejoin="round"
        style={{ paintOrder: 'stroke fill' }}
      />
    </svg>
  </span>
);

export default function FocusArea() {
  return (
    <section className="relative w-full bg-white py-12 overflow-hidden">
      <div className="flex whitespace-nowrap overflow-hidden">
        {/* We use two containers to create a seamless loop */}
        <div className="flex animate-marquee items-center">
          {focusItems.map((item, index) => (
            <React.Fragment key={`f1-${index}`}>
              <span
                className={`${lexend.className} text-[60px] md:text-[100px] font-black tracking-tighter focus-outline-text`}
              >
                {item}
              </span>
              <CustomStar />
            </React.Fragment>
          ))}
        </div>

        <div className="flex animate-marquee items-center" aria-hidden="true">
          {focusItems.map((item, index) => (
            <React.Fragment key={`f2-${index}`}>
              <span
                className={`${lexend.className} text-[60px] md:text-[100px] font-black tracking-tighter focus-outline-text`}
              >
                {item}
              </span>
              <CustomStar />
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx>{`
        .focus-outline-text {
          color: white;
          -webkit-text-stroke: 2.8px #006e57;
          /* paint-order draws stroke first, then the white fill covers the inner half */
          paint-order: stroke fill;
          transition: all 0.4s ease;
        }
        
        .focus-outline-text:hover {
            -webkit-text-stroke: 2.8px #00b874;
            transform: scale(1.02);
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

