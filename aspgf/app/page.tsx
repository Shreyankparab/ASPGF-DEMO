import HeroSection from "@/Components/HeroSection";
import FAQSection from "@/Components/FAQSection";

import FocusArea from "@/Components/FocusArea";
import StatsSection from "@/Components/StatsSection";
import NewsSection from "@/Components/NewsSection";
import FoundersSectionMain from "@/Components/FoundersSectionMain";
import AboutSection from "@/Components/AboutSection";
import WhatWeDoSection from "@/Components/WhatWeDoSection";
import OurWorkSection from "@/Components/OurWorkSection";


import ImpactSection from "@/Components/ImpactSection";

export default function Page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FocusArea />

      <WhatWeDoSection />
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-12">
          <StatsSection />
        </div>
      </section>
      <OurWorkSection />

      <FoundersSectionMain />
      <NewsSection />
      <ImpactSection />
      <FAQSection />


    </>
  );
}
