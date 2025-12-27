import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";
import ServicesSection from "./components/home/ServicesSection";
import HowItWorksSection from "./components/home/HowItWorksSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import StatsSection from "./components/home/StatsSection";
import CTASection from "./components/home/CTASection";

export const metadata = {
  title: "Care.xyz - Professional Baby Sitting & Elderly Care Services",
  description:
    "Book trusted caregivers for baby care, elderly care, and sick people care services in Bangladesh. Reliable, professional, and affordable care for your loved ones.",
  keywords:
    "baby care Bangladesh, elderly care services, sick care, babysitting Dhaka, home care",
  openGraph: {
    title: "Care.xyz - Baby Sitting & Elderly Care Platform",
    description: "Professional and trusted care services for your family",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </>
  );
}
