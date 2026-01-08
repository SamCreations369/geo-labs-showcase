import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import mobileApp from '@/assets/mobile-app.png';
import webApp from '@/assets/web-app.png';
import decorativeShape from '@/assets/decorative-shape.png';

export function DeviceFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'mobile' | 'web'>('mobile');
  
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} id="features" className="py-24 bg-background overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="eyebrow text-card-foreground">Everywhere customers look</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Because showing up in one place isn't enough anymore
          </h2>
        </motion.div>

        {/* Device mockup with tabs */}
        <div className="relative flex flex-col items-center min-h-[600px]">
          {/* Decorative shape behind */}
          <motion.img
            src={decorativeShape}
            alt=""
            className="absolute left-0 top-1/2 -translate-y-1/2 w-64 opacity-30 -z-10"
            style={{ y: y2 }}
          />

          {/* Image container */}
          <div className="relative z-10 flex justify-center items-center min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">
            <AnimatePresence mode="wait">
              {activeTab === 'mobile' ? (
                <motion.img
                  key="mobile"
                  src={mobileApp}
                  alt="GEO Labs mobile app showing Google Maps integration"
                  className="w-[700px] sm:w-[850px] lg:w-[1000px] rounded-3xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.img
                  key="web"
                  src={webApp}
                  alt="GEO Labs web dashboard showing AI search results"
                  className="w-[700px] sm:w-[850px] lg:w-[1000px] rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 mt-8">
            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'mobile'
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Mobile App
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'web'
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Web App
            </button>
          </div>

          {/* Decorative shape right */}
          <motion.img
            src={decorativeShape}
            alt=""
            className="absolute right-0 top-1/3 w-48 opacity-20 -z-10"
            style={{ y: y1 }}
          />
        </div>

        {/* Feature chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
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
    </section>
  );
}