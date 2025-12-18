import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import mobileApp from '@/assets/mobile-app.png';
import webApp from '@/assets/web-app.png';
import decorativeShape from '@/assets/decorative-shape.png';
export function DeviceFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return <section ref={ref} id="features" className="py-24 bg-background overflow-hidden">
      <div className="section-container">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-6">
          <span className="eyebrow text-card-foreground">Everywhere customers look
        </span>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Because showing up in one place isn't enough anymore

          </h2>
          
        </motion.div>

        {/* Device mockups layout */}
        <div className="relative flex justify-center items-center min-h-[600px]">
          {/* Decorative shape behind */}
          <motion.img src={decorativeShape} alt="" className="absolute left-0 top-1/2 -translate-y-1/2 w-64 opacity-30 -z-10" style={{
          y: y2
        }} />

          {/* Mobile App */}
          <motion.div style={{
          y: y1
        }} className="relative z-10">
            <motion.img src={mobileApp} alt="GEO Labs mobile app showing Google Maps integration" className="w-64 sm:w-80 rounded-3xl shadow-2xl" whileHover={{
            scale: 1.02,
            rotateY: -3
          }} transition={{
            type: 'spring',
            stiffness: 200
          }} />
          </motion.div>

          {/* Web App */}
          <motion.div style={{
          y: y2
        }} className="relative -ml-16 z-20">
            <motion.img src={webApp} alt="GEO Labs web dashboard showing AI search results" className="w-[500px] sm:w-[600px] rounded-2xl shadow-2xl" whileHover={{
            scale: 1.02,
            rotateY: 3
          }} transition={{
            type: 'spring',
            stiffness: 200
          }} />
          </motion.div>

          {/* Decorative shape right */}
          <motion.img src={decorativeShape} alt="" className="absolute right-0 top-1/3 w-48 opacity-20 -z-10" style={{
          y: y1
        }} />
        </div>

        {/* Feature chips */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="flex flex-wrap justify-center gap-3 mt-12">
          <div className="feature-chip">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Google & Maps Optimization
          </div>
          <div className="feature-chip">
            <span className="w-2 h-2 rounded-full bg-accent" />
            AI & GEO Optimization
          </div>
          <div className="feature-chip">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Review & Reputation Engine
          </div>
        </motion.div>
      </div>
    </section>;
}