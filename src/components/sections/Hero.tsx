import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ShowcaseCarousel } from '@/components/sections/ShowcaseCarousel';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <section ref={ref} className="relative sky-gradient overflow-x-clip">
      {!isMobile && (
        <>
          {/* Left side clouds */}
          <div className="cloud cloud-xlarge cloud-animate-1" style={{ top: -30, left: '-12%' }} />
          <div className="cloud cloud-large cloud-animate-2" style={{ top: 80, left: '-8%' }} />
          <div className="cloud cloud-medium cloud-animate-3" style={{ top: 180, left: '-3%' }} />
          <div className="cloud cloud-xlarge cloud-animate-2" style={{ top: 120, left: '-15%' }} />
          <div className="cloud cloud-small cloud-animate-1" style={{ top: 250, left: '0%' }} />
          {/* Right side clouds */}
          <div className="cloud cloud-xlarge cloud-animate-3" style={{ top: -20, right: '-12%' }} />
          <div className="cloud cloud-large cloud-animate-1" style={{ top: 90, right: '-8%' }} />
          <div className="cloud cloud-medium cloud-animate-2" style={{ top: 200, right: '-3%' }} />
          <div className="cloud cloud-xlarge cloud-animate-1" style={{ top: 140, right: '-15%' }} />
          <div className="cloud cloud-small cloud-animate-3" style={{ top: 260, right: '0%' }} />
        </>
      )}
      
      {isMobile && (
        <>
          <div className="cloud cloud-large" style={{ top: -10, left: '-15%', animation: 'none' }} />
          <div className="cloud cloud-medium" style={{ top: 80, left: '-10%', animation: 'none' }} />
          <div className="cloud cloud-large" style={{ top: -10, right: '-15%', animation: 'none' }} />
          <div className="cloud cloud-medium" style={{ top: 80, right: '-10%', animation: 'none' }} />
        </>
      )}

      <div className="section-container relative z-10 pt-24 sm:pt-32 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-4 sm:mb-6">
            Your competitors aren't smarter. They just show up first.
          </h1>
          <p className="text-base sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 text-muted-foreground">
            Premium websites, SEO, and GEO for LA businesses tired of being invisible. We build stunning websites, optimize your search visibility across Google, Bing, and AI platforms, and keep everything running with affordable monthly maintenance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AnimatedButton href="#contact">
              Book a Free Consultation
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      {/* GSAP Scroll-Locked 3D Carousel */}
      <ShowcaseCarousel />
    </section>
  );
}
