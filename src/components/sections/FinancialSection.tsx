import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import budgetUI from '@/assets/budget-ui.png';
import decorativeShape from '@/assets/decorative-shape.png';
const features = ['Call & Lead Tracking', 'Traffic & Visibility Reports', 'Conversion Insights', 'Monthly Strategy Adjustments'];
export function FinancialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const shapeY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return <section ref={ref} className="py-24 bg-background overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div initial={{
          opacity: 0,
          x: -30
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
            <p className="text-lg mb-8 text-secondary-foreground">
              Traditional SEO isn't enough. AI platforms are answering questions without sending traffic which cuts into the clicks businesses normally earn from search. We optimize your content so you're part of the answer, not left out of the conversation entirely.

            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map(feature => <div key={feature} className="chip">
                  {feature}
                </div>)}
            </div>
            <a href="#contact" className="btn-primary">
              Get Your Visibility Audit
            </a>
          </motion.div>

          {/* Right - Image */}
          <div className="relative">
            <motion.img src={decorativeShape} alt="" className="absolute -right-20 bottom-0 w-72 opacity-20 -z-10" style={{
            y: shapeY
          }} />
            <motion.div style={{
            y
          }}>
              <motion.img src={budgetUI} alt="GEO Labs revenue tracking dashboard" className="w-full max-w-md mx-auto rounded-2xl shadow-xl" whileHover={{
              scale: 1.02,
              rotateY: -3,
              rotateX: 2
            }} transition={{
              type: 'spring',
              stiffness: 200
            }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
}