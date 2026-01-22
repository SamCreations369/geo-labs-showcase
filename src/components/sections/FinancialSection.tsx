import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import decorativeShape from '@/assets/decorative-shape.png';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

const features = ['Call & Lead Tracking', 'Traffic & Visibility Reports', 'Conversion Insights', 'Monthly Strategy Adjustments'];

export function FinancialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Disable parallax on mobile
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [60, -60]);
  const shapeY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [30, -30]);
  
  return <section ref={ref} className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Content */}
          <motion.div initial={{
            opacity: 0,
            x: isMobile ? 0 : -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
            <span className="eyebrow text-secondary-foreground">GEO SERVICES</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Optimize for AI discovery while competitors catch up
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-secondary-foreground">
              Traditional SEO isn't enough. AI platforms are answering questions without sending traffic which cuts into the clicks businesses normally earn from search. We optimize your content so you're part of the answer, not left out of the conversation entirely.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
              {features.map(feature => <div key={feature} className="chip text-sm">
                  {feature}
                </div>)}
            </div>
            <AnimatedButton href="#contact">
              Get Your Visibility Audit
            </AnimatedButton>
          </motion.div>

          {/* Right - Image */}
          <div className="relative">
            {!isMobile && (
              <motion.img src={decorativeShape} alt="" className="absolute -right-20 bottom-0 w-72 opacity-20 -z-10" style={{ y: shapeY }} />
            )}
            <motion.div style={isMobile ? {} : { y }}>
              <img 
                alt="GEO Labs revenue tracking dashboard" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl" 
                src="/lovable-uploads/7a79f66c-fb98-440b-829f-9418c7816f34.png" 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
}