import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dashboardImage from '@/assets/dreelio-dashboard.png';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const imageRotateX = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-24 pb-8">
      <div className="section-container relative z-10">
        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.08] mb-6">
            Get found first in AI and local search.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            GEO Labs helps local businesses in Los Angeles dominate Google, Maps, and generative AI results so more customers find you, call you, and walk through your doors.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a 
              href="#contact" 
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a FREE GEO Audit
            </motion.a>
            <motion.a 
              href="#features" 
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              See How It Works
            </motion.a>
          </div>
        </motion.div>

        {/* Dashboard Image with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ 
            y: imageY, 
            scale: imageScale,
            rotateX: imageRotateX,
          }}
          className="perspective-container mx-auto max-w-5xl"
        >
          <motion.div
            className="tilt-3d"
            whileHover={{ rotateX: -2, rotateY: 2, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <img
              src={dashboardImage}
              alt="GEO Labs Dashboard showing search visibility metrics"
              className="w-full dashboard-image"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
