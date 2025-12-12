import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dashboardImage from '@/assets/dreelio-dashboard.png';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const imageRotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section ref={ref} className="relative sky-gradient overflow-hidden">
      {/* Cloud decorations */}
      <div className="cloud" style={{ width: 400, height: 200, top: 60, left: '5%' }} />
      <div className="cloud" style={{ width: 600, height: 250, top: 40, right: '10%' }} />
      <div className="cloud" style={{ width: 300, height: 150, top: 120, left: '35%' }} />

      <div className="section-container relative z-10 pt-32 pb-8">
        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
            Get found first in AI and local search.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            GEO Labs helps local businesses in Los Angeles dominate Google, Maps, and generative AI results so more customers find you, call you, and walk through your doors.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="btn-primary">
              Get a FREE GEO Audit
            </a>
            <a href="#features" className="btn-secondary">
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Dashboard Image with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            y: imageY, 
            scale: imageScale,
            rotateX: imageRotateX,
          }}
          className="perspective-wrapper mx-auto max-w-5xl"
        >
          <motion.div
            className="tilt-3d"
            whileHover={{ rotateX: -2, rotateY: 2, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <img
              src={dashboardImage}
              alt="GEO Labs Dashboard showing search visibility metrics"
              className="w-full rounded-2xl shadow-2xl"
              style={{
                boxShadow: '0 50px 100px -30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
