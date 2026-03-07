// "use client";

// import React, { useRef } from "react";
// import Image from "next/image";
// import { Caveat, Nunito, Cabin } from "next/font/google";
// import { useRouter } from "next/navigation";
// import { gsap } from "gsap";

// const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
// const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
// const cabin = Cabin({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

// const AboutSection = () => {
//   const router = useRouter();

//   const sectionRef = useRef<HTMLDivElement>(null);
//   const headingRef = useRef<HTMLHeadingElement>(null);
//   const textRef = useRef<HTMLParagraphElement>(null);
//   const highlightRef = useRef<HTMLDivElement>(null);
//   const featuresRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);

//   const handleMouseEnter = () => {
//     const tl = gsap.timeline();

//     tl.from(imageRef.current, {
//       y: 80,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.out",
//     })
//       .from(
//         headingRef.current,
//         {
//           y: 60,
//           opacity: 0,
//           duration: 0.8,
//           ease: "power3.out",
//         },
//         "-=0.6",
//       )
//       .from(
//         textRef.current,
//         {
//           y: 40,
//           opacity: 0,
//           duration: 0.8,
//           ease: "power3.out",
//         },
//         "-=0.5",
//       )
//       .from(
//         highlightRef.current,
//         {
//           x: -40,
//           opacity: 0,
//           duration: 0.6,
//           ease: "power3.out",
//         },
//         "-=0.5",
//       )
//       .from(
//         featuresRef.current,
//         {
//           y: 30,
//           opacity: 0,
//           duration: 0.6,
//           stagger: 0.2,
//           ease: "power3.out",
//         },
//         "-=0.4",
//       )
//       .from(
//         buttonRef.current,
//         {
//           scale: 0.8,
//           opacity: 0,
//           duration: 0.6,
//           ease: "back.out(1.7)",
//         },
//         "-=0.4",
//       );
//   };

//   return (
//     <section
//       ref={sectionRef}
//       onMouseEnter={handleMouseEnter}
//       className="bg-white py-12 md:py-16 lg:py-24 px-6 sm:px-6 lg:px-8 overflow-hidden relative"
//     >
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//         {/* LEFT SIDE */}
//         <div
//           ref={imageRef}
//           className="relative w-full max-w-[500px] lg:max-w-[550px] mx-auto pt-8 pb-16 pl-4 sm:pl-8"
//         >
//           <div className="absolute top-0 left-[-5%] w-[85%] aspect-[9/10] bg-[#F9F7F1] z-0 block border border-transparent shadow-sm">
//             <div className="absolute inset-0 opacity-100 flex items-center justify-center p-4 overflow-hidden">
//               <Image
//                 src="/peacock-svg.svg"
//                 alt="Peacock texture"
//                 fill
//                 className="object-contain scale-[1.1] origin-center opacity-80"
//               />
//             </div>
//           </div>

//           <div className="relative w-[75%] max-w-[360px] aspect-[4/5.5] z-10 ml-auto mt-[10%] mr-0 bg-white opacity-100 rounded-tl-0 rounded-tr-[100px] rounded-bl-[335px] rounded-br-[335px] shadow-2xl">
//             <div className="relative w-full h-full rounded-tl-0 rounded-tr-[100px] rounded-bl-[335px] rounded-br-[335px] overflow-hidden opacity-100">
//               <Image
//                 src="/images/about-image.png"
//                 alt="Children in need"
//                 fill
//                 className="object-cover opacity-100"
//                 style={{ opacity: 1 }}
//                 priority={true}
//               />
//             </div>

//             <div className="absolute -bottom-8 -right-12 md:-bottom-12 md:-right-16 w-40 h-40 md:w-48 md:h-48 lg:w-[190px] lg:h-[190px] bg-white rounded-full shadow-2xl flex items-center justify-center p-3 z-20">
//               <div className="relative w-full h-full rounded-full border border-gray-100 flex items-center justify-center">
//                 <div className="relative w-[80%] h-[80%] z-10">
//                   <Image
//                     src="/images/main-peacock.png"
//                     alt="Peacock Logo"
//                     fill
//                     className="object-contain"
//                   />
//                 </div>

//                 <div className="absolute inset-x-0 bottom-0 top-0 w-full h-full animate-[spin_30s_linear_infinite]">
//                   <svg
//                     viewBox="0 0 100 100"
//                     className="w-full h-full overflow-visible"
//                   >
//                     <defs>
//                       <path
//                         id="circlePath"
//                         d="M 50,50 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
//                       />
//                     </defs>
//                     <text
//                       className={`text-[8.5px] fill-[#6F7775] font-extrabold ${cabin.className} tracking-[0.12em] uppercase`}
//                     >
//                       <textPath href="#circlePath" startOffset="0%">
//                         A.S.P Global Foundation • 25 Years Experience •
//                       </textPath>
//                     </text>
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-col justify-center space-y-6 lg:pl-8 z-10 w-full relative">
//           <div
//             className="absolute inset-0 bg-[#000000] opacity-0 pointer-events-none -z-10"
//             aria-hidden="true"
//           ></div>

//           <div className="flex items-center gap-2 mb-1">
//             <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
//               <Image
//                 src="/icon.svg"
//                 alt="About us icon"
//                 width={20}
//                 height={20}
//               />
//             </div>
//             <span
//               className={`${caveat.className} text-[#6F7775] text-[24px] font-bold tracking-wide mt-1`}
//             >
//               About Us
//             </span>
//           </div>

//           <h2
//             ref={headingRef}
//             className={`${nunito.className} text-[#00715D] text-4xl lg:text-5xl font-extrabold leading-[1.15] max-w-[600px] pr-4`}
//           >
//             Collective effort can create meaningful social impact
//           </h2>

//           <p
//             ref={textRef}
//             className={`${cabin.className} text-gray-500 leading-relaxed text-[15px] lg:text-[16px] max-w-[600px]`}
//           >
//             Anuja Sushant Patil Global Foundation is a registered not-for-profit
//             organization established in 2025, focused on community development,
//             educational support, and socially responsible initiatives.
//           </p>

//           <div
//             ref={highlightRef}
//             className="relative pl-5 py-1 -mt-2 mb-2 max-w-[600px]"
//           >
//             <div className="absolute left-0 top-1 bottom-1 w-1 bg-[#00715D] rounded-full"></div>
//             <p
//               className={`${cabin.className} text-gray-700 text-[15px] lg:text-[16px] font-medium leading-[1.7]`}
//             >
//               Active since <span className="text-pink-600 font-bold">2025</span>{" "}
//               , the foundation has undertaken multiple community initiatives in{" "}
//               <span className="text-purple-600 font-bold">India</span>.
//             </p>
//           </div>

//           <div
//             ref={featuresRef}
//             className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-6 pt-2 max-w-[600px]"
//           >
//             {/* Feature Cards remain unchanged */}
//           </div>

//           <div ref={buttonRef} className="pt-6">
//             <button
//               onClick={() => router.push("/AboutUs")}
//               className={`${cabin.className} px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] hover:shadow-[0_8px_30px_rgb(0,110,87,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider`}
//             >
//               DISCOVER MORE
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;

"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Caveat, Nunito, Cabin } from "next/font/google";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "700", "800"] });
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const router = useRouter();

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.from(imageRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          headingRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          textRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          highlightRef.current,
          {
            x: -40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          featuresRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          buttonRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 md:py-16 lg:py-24 px-6 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT SIDE */}
        <div
          ref={imageRef}
          className="order-2 lg:order-1 relative w-full max-w-[450px] lg:max-w-[550px] mx-auto pt-8 pb-16 pl-10 sm:pl-12 lg:pl-8"
        >
          <div className="absolute top-0 left-[-5%] w-[85%] aspect-[9/10] bg-[#F9F7F1] z-0 block border border-transparent shadow-sm">
            <div className="absolute inset-0 opacity-100 flex items-center justify-center p-4 overflow-hidden">
              <Image
                src="/peacock-svg.svg"
                alt="Peacock texture"
                fill
                className="object-contain scale-[1.1] origin-center opacity-80"
              />
            </div>
          </div>

          <div className="relative w-[75%] max-w-[360px] aspect-[4/5.5] z-10 ml-auto mt-[10%] mr-0 bg-white opacity-100 rounded-tl-0 rounded-tr-[100px] rounded-bl-[335px] rounded-br-[335px] shadow-2xl">
            <div className="relative w-full h-full rounded-tl-0 rounded-tr-[100px] rounded-bl-[335px] rounded-br-[335px] overflow-hidden opacity-100">
              <Image
                src="/images/about-image.png"
                alt="Children in need"
                fill
                className="object-cover opacity-100"
                style={{ opacity: 1 }}
                priority={true}
              />
            </div>

            <div className="absolute -bottom-8 -right-12 md:-bottom-12 md:-right-16 w-40 h-40 md:w-48 md:h-48 lg:w-[190px] lg:h-[190px] bg-white rounded-full shadow-2xl flex items-center justify-center p-3 z-20 mr-8">
              <div className="relative w-full h-full rounded-full border border-gray-100 flex items-center justify-center">
                <div className="relative w-[80%] h-[80%] z-10">
                  <Image
                    src="/images/main-peacock.png"
                    alt="Peacock Logo"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 top-0 w-full h-full animate-[spin_30s_linear_infinite]">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full overflow-visible"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50,50 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
                      />
                    </defs>
                    <text
                      className={`text-[8.5px] fill-[#6F7775] font-extrabold ${cabin.className} tracking-[0.12em] uppercase`}
                    >
                      <textPath href="#circlePath" startOffset="0%">
                        A.S.P Global Foundation • 25 Years Experience •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6 lg:pl-8 z-10 w-full relative">
          <div
            className="absolute inset-0 bg-[#000000] opacity-0 pointer-events-none -z-10"
            aria-hidden="true"
          ></div>

          <div className="flex items-center gap-2 mb-1">
            <span
              className={`${caveat.className} text-[#6f7775] text-[24px] font-bold tracking-wide mt-1`}
            >
              About Us
            </span>
          </div>

          <h2
            ref={headingRef}
            className={`${nunito.className} text-[#00715D] text-4xl lg:text-5xl font-extrabold leading-[1.15] max-w-[600px] pr-4`}
          >
            Collective effort can create meaningful social impact
          </h2>

          <p
            ref={textRef}
            className={`${cabin.className} text-gray-500 leading-relaxed text-[15px] lg:text-[16px] max-w-[600px]`}
          >
            Anuja Sushant Patil Global Foundation is a registered not-for-profit
            organization established in 2025, focused on community development,
            educational support, and socially responsible initiatives.
          </p>

          <div
            ref={highlightRef}
            className="relative pl-5 py-1 -mt-2 mb-2 max-w-[600px]"
          >
            <div className="absolute left-0 top-1 bottom-1 w-1 bg-[#00715D] rounded-full"></div>
            <p
              className={`${cabin.className} text-gray-700 text-[15px] lg:text-[16px] font-medium leading-[1.7]`}
            >
              Active since <span className="text-pink-600 font-bold">2025</span>{" "}
              , the foundation has undertaken multiple community initiatives in{" "}
              <span className="text-purple-600 font-bold">India</span>.
            </p>
          </div>

          <div
            ref={featuresRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-6 pt-2 max-w-[600px]"
          ></div>

          <div ref={buttonRef} className="pt-6">
            <button
              onClick={() => router.push("/AboutUs")}
              className={`${cabin.className} px-10 py-4 font-extrabold text-white rounded-full text-lg bg-gradient-to-r from-[#006e57] to-[#00b874] hover:shadow-[0_8px_30px_rgb(0,110,87,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 tracking-wider`}
            >
              DISCOVER MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
