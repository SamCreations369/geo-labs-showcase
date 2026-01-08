import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { DeviceFeature } from '@/components/sections/DeviceFeature';
import { ProjectSection } from '@/components/sections/ProjectSection';
import { FinancialSection } from '@/components/sections/FinancialSection';
import { Benefits } from '@/components/sections/Benefits';
import { Testimonials } from '@/components/sections/Testimonials';
import { Pricing } from '@/components/sections/Pricing';
import { Blog } from '@/components/sections/Blog';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { ParallaxBackground } from '@/components/ParallaxBackground';

const Index = () => {
  return (
    <>
      <ParallaxBackground />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <DeviceFeature />
        <ProjectSection />
        <FinancialSection />
        <Benefits />
        <Testimonials />
        <Pricing />
        <TrustBar />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
