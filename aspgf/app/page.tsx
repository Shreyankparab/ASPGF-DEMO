import HeroSection from "@/Components/HeroSection";
import FAQSection from "@/Components/FAQSection";

import FocusArea from "@/Components/FocusArea";
import StatsSection from "@/Components/StatsSection";

import FoundersSectionMain from "@/Components/FoundersSectionMain";
import AboutSection from "@/Components/AboutSection";
import WhatWeDoSection from "@/Components/WhatWeDoSection";
// import FoundersSectionMain from "@/Components/FoundersSectionMain";


// import ContactUs from "@/app/contactUs/ContactUs";StatsSection 

export default function Page() {
  return (
    <>
      <HeroSection />
      <AboutSection/>
      <FocusArea/>
    
      <WhatWeDoSection/>
        <StatsSection/>
      <FoundersSectionMain/>
      <FAQSection/>

    </>
  );
}
