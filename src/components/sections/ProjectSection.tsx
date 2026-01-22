import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import decorativeShape from '@/assets/decorative-shape.png';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

const features = ['SEO Audit & Fixes', 'GMB / GBP Optimization', 'Location & Keyword Strategy', 'Content that ranks locally'];

export function ProjectSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Disable parallax on mobile
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [80, -80]);
  const shapeY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [40, -40]);
  
  return <section ref={ref} id="seo-services" className="py-16 md:py-24 bg-secondary/30 overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left - Image (takes half the width) */}
          <div className="relative w-full lg:w-1/2">
            {!isMobile && (
              <motion.img src={decorativeShape} alt="" className="absolute -left-20 top-0 w-72 opacity-20 -z-10" style={{ y: shapeY }} />
            )}
            <motion.div style={isMobile ? {} : { y }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-amber-50 rounded-3xl -z-10 transform -rotate-3"></div>
              <img 
                alt="GEO Labs project management dashboard" 
                className="w-full rounded-2xl shadow-xl" 
                src="/lovable-uploads/7422380c-abf2-4438-8550-982ae4627b8d.png" 
              />
            </motion.div>
          </div>

          {/* Right - Content (takes half the width) */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="w-full lg:w-1/2">
            <span className="eyebrow text-secondary-foreground">SEO SERVICES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Fix what's broken, optimize what works
            </h2>
            <p className="text-lg mb-8 text-secondary-foreground">
              Most businesses have the same problems: terrible site structure, weak content, zero local presence. We audit the damage, prioritize what matters, and rebuild your visibility from the foundation up.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map(feature => <div key={feature} className="chip">
                  {feature}
                </div>)}
            </div>
            <AnimatedButton href="#contact">
              Get Your Visibility Audit
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </section>;
}