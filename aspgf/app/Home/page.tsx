"use client";

import FAQSection from "@/Components/FAQSection";
import FocusArea from "@/Components/FocusArea";
import Footer from "@/Components/Footer";
import FoundersSectionMain from "@/Components/FoundersSectionMain";
import HeroSection from "@/Components/HeroSection";
import NewsSection from "@/Components/NewsSection";
import StatsSection from "@/Components/StatsSection";
import WhatWeDoSection from "@/Components/WhatWeDoSection";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Impact Section */}
      <FocusArea />

      {/* Founders Section */}
      <FoundersSectionMain />

      {/* Empowering Communities Section */}
      <WhatWeDoSection />

      {/* Campaign Section */}
      <StatsSection />

      {/* Stats Section */}
      <NewsSection />

      {/* Testimonials Section */}
      {/* <TestimonialsSection /> */}

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
