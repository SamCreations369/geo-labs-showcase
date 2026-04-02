import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ShowcaseCarousel } from '@/components/sections/ShowcaseCarousel';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  // Parallax transforms matching Contact section, inverted for top-of-page
  const cloud1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const cloud3Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cloud4Y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={ref} className="relative sky-gradient overflow-x-clip">
      {/* Cloud decorations with parallax — exact match of Contact section */}
      <motion.div
        className="cloud cloud-large cloud-animate-1"
        style={{ top: 40, left: '-5%', y: cloud1Y }}
      />
      <motion.div
        className="cloud cloud-large cloud-animate-2"
        style={{ top: 60, right: '-5%', y: cloud2Y }}
      />
      <motion.div
        className="cloud cloud-medium cloud-animate-3"
        style={{ top: 20, left: '25%', y: cloud3Y }}
      />
      <motion.div
        className="cloud cloud-medium cloud-animate-1"
        style={{ top: 100, right: '20%', y: cloud4Y }}
      />
      <motion.div
        className="cloud cloud-small cloud-animate-2"
        style={{ top: 150, left: '45%', y: cloud3Y }}
      />
      <motion.div
        className="cloud cloud-small cloud-animate-3"
        style={{ top: 80, left: '60%', y: cloud1Y }}
      />
      <motion.div
        className="cloud cloud-medium cloud-animate-1"
        style={{ top: 30, left: '70%', y: cloud2Y }}
      />

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
