import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import projectUI from '@/assets/project-ui.png';
import decorativeShape from '@/assets/decorative-shape.png';
const features = ['SEO Audit & Fixes', 'GMB / GBP Optimization', 'Location & Keyword Strategy', 'Content that ranks locally'];
export function ProjectSection() {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const shapeY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return <section ref={ref} className="py-24 bg-secondary/30 overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <motion.img src={decorativeShape} alt="" className="absolute -left-20 top-0 w-72 opacity-20 -z-10" style={{
            y: shapeY
          }} />
            <motion.div style={{
            y
          }}>
              <motion.img src={projectUI} alt="GEO Labs project management dashboard" className="w-full max-w-md mx-auto rounded-2xl shadow-xl" whileHover={{
              scale: 1.02,
              rotateY: 3,
              rotateX: -2
            }} transition={{
              type: 'spring',
              stiffness: 200
            }} />
            </motion.div>
          </div>

          {/* Right - Content */}
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
        }} className="order-1 lg:order-2">
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
            <a href="#contact" className="btn-primary">
              Get Your Visibility Audit
            </a>
          </motion.div>
        </div>
      </div>
    </section>;
}