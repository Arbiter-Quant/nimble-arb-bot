import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CycleResultsSection } from "@/components/home/CycleResultsSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CycleResultsSection />
        <TechStackSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
