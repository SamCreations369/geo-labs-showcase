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
  const imageRotateX = useTransform(scrollYProgress, [0, 0.6], isMobile ? [0, 0] : [55, 0]);
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

      <div className="section-container relative z-10 pt-32 pb-8">
        {/* Centered Content */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
            Your competitors aren't smarter. They just show up first.
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground">
            Complete visibility strategy for LA businesses tired of being invisible in local search. From comprehensive SEO audit to sustainable organic growth across Google, Bing, and AI platforms, we deliver honest assessments and effective solutions for businesses throughout Los Angeles County.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AnimatedButton href="#contact">
              Get Your Visibility Audit
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Dashboard Image with 3D effect - simplified on mobile */}
        <div className="mx-auto max-w-5xl" style={{ perspective: isMobile ? 'none' : '1200px' }}>
          <motion.div initial={{
            opacity: 0,
            y: isMobile ? 20 : 60
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} style={isMobile ? {} : {
            y: imageY,
            scale: imageScale,
            rotateX: imageRotateX,
            transformStyle: 'preserve-3d',
            transformOrigin: 'center bottom'
          }}>
            <img alt="GEO Labs Dashboard showing search visibility metrics" className="w-full rounded-2xl shadow-2xl" style={{
              boxShadow: isMobile ? '0 20px 40px -15px rgba(0, 0, 0, 0.15)' : '0 50px 100px -30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'
            }} src="/lovable-uploads/40529a62-99b6-4a96-91f2-28b64058f07f.png" />
          </motion.div>
        </div>
      </div>
    </section>;
}