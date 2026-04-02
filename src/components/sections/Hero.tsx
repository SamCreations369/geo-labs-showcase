import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  
  // Disable expensive scroll transforms on mobile
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 200]);
  const imageScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 0.9]);
  const imageRotateX = useTransform(scrollYProgress, [0, 0.6], isMobile ? [25, 0] : [55, 0]);
  return <section ref={ref} className="relative sky-gradient overflow-hidden min-h-screen">
      {/* Simplified clouds on mobile - only show a few static clouds */}
      {!isMobile && (
        <>
          {/* Left side clouds */}
          <div className="cloud cloud-xlarge cloud-animate-1" style={{ top: -50, left: '-10%' }} />
          <div className="cloud cloud-large cloud-animate-2" style={{ top: 80, left: '-5%' }} />
          <div className="cloud cloud-medium cloud-animate-3" style={{ top: 180, left: '5%' }} />
          
          {/* Center clouds */}
          <div className="cloud cloud-xlarge cloud-animate-2" style={{ top: -30, left: '20%' }} />
          <div className="cloud cloud-large cloud-animate-1" style={{ top: 50, left: '35%' }} />
          <div className="cloud cloud-medium cloud-animate-3" style={{ top: 150, left: '45%' }} />
          
          {/* Right side clouds */}
          <div className="cloud cloud-xlarge cloud-animate-3" style={{ top: -40, right: '-10%' }} />
          <div className="cloud cloud-large cloud-animate-1" style={{ top: 60, right: '0%' }} />
          <div className="cloud cloud-medium cloud-animate-2" style={{ top: 160, right: '15%' }} />
          <div className="cloud cloud-small cloud-animate-1" style={{ top: 220, right: '25%' }} />
          
          {/* Extra scattered clouds */}
          <div className="cloud cloud-small cloud-animate-2" style={{ top: 100, left: '55%' }} />
          <div className="cloud cloud-small cloud-animate-3" style={{ top: 200, left: '70%' }} />
        </>
      )}
      
      {/* Mobile: just 3 simple clouds with no animation */}
      {isMobile && (
        <>
          <div className="cloud cloud-large" style={{ top: -20, left: '-5%', animation: 'none' }} />
          <div className="cloud cloud-medium" style={{ top: 60, right: '-5%', animation: 'none' }} />
          <div className="cloud cloud-medium" style={{ top: 120, left: '30%', animation: 'none' }} />
        </>
      )}

      <div className="section-container relative z-10 pt-24 sm:pt-32 pb-8">
        {/* Centered Content */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
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
    </section>;
}