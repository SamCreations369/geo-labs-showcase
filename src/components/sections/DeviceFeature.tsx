import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import mobileApp from '@/assets/mobile-app.png';
import webApp from '@/assets/web-app.png';

export function DeviceFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="features" className="py-24 overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <span className="eyebrow">Seamless across platforms</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Show up wherever customers are searching,
          </h2>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground leading-tight">
            from Maps to AI chatbots.
          </h2>
        </motion.div>

        {/* Device mockups layout - Dreelio style with glass container */}
        <motion.div 
          className="glass-card-strong p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex justify-center items-center min-h-[500px]">
            {/* Mobile App */}
            <motion.div
              style={{ y: y1 }}
              className="relative z-10"
            >
              <motion.img
                src={mobileApp}
                alt="GEO Labs mobile app showing Google Maps integration"
                className="w-56 sm:w-72 rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.03, rotateY: -4 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              />
            </motion.div>

            {/* Web App */}
            <motion.div
              style={{ y: y2 }}
              className="relative -ml-20 z-20"
            >
              <motion.img
                src={webApp}
                alt="GEO Labs web dashboard showing AI search results"
                className="w-[450px] sm:w-[550px] rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.03, rotateY: 4 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              />
            </motion.div>
          </div>

          {/* Feature chips inside glass container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {['Google & Maps Optimization', 'AI & GEO Optimization', 'Review & Reputation Engine'].map((label, i) => (
              <motion.div 
                key={label}
                className="feature-chip"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
