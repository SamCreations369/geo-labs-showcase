import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dashboardImage from '@/assets/dreelio-dashboard.png';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const imageRotateX = useTransform(scrollYProgress, [0, 0.4], [6, 0]);
  
  // Cloud parallax transforms
  const cloud1Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const cloud3Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const cloud4Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const cloud5Y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative sky-gradient overflow-hidden min-h-screen">
      {/* Animated Cloud decorations with parallax - many more clouds */}
      {/* Left side clouds */}
      <motion.div 
        className="cloud cloud-xlarge cloud-animate-1"
        style={{ top: -50, left: '-10%', y: cloud1Y }}
      />
      <motion.div 
        className="cloud cloud-large cloud-animate-2"
        style={{ top: 80, left: '-5%', y: cloud2Y }}
      />
      <motion.div 
        className="cloud cloud-medium cloud-animate-3"
        style={{ top: 180, left: '5%', y: cloud3Y }}
      />
      
      {/* Center clouds */}
      <motion.div 
        className="cloud cloud-xlarge cloud-animate-2"
        style={{ top: -30, left: '20%', y: cloud3Y }}
      />
      <motion.div 
        className="cloud cloud-large cloud-animate-1"
        style={{ top: 50, left: '35%', y: cloud4Y }}
      />
      <motion.div 
        className="cloud cloud-medium cloud-animate-3"
        style={{ top: 150, left: '45%', y: cloud5Y }}
      />
      
      {/* Right side clouds */}
      <motion.div 
        className="cloud cloud-xlarge cloud-animate-3"
        style={{ top: -40, right: '-10%', y: cloud2Y }}
      />
      <motion.div 
        className="cloud cloud-large cloud-animate-1"
        style={{ top: 60, right: '0%', y: cloud1Y }}
      />
      <motion.div 
        className="cloud cloud-medium cloud-animate-2"
        style={{ top: 160, right: '15%', y: cloud4Y }}
      />
      <motion.div 
        className="cloud cloud-small cloud-animate-1"
        style={{ top: 220, right: '25%', y: cloud3Y }}
      />
      
      {/* Extra scattered clouds */}
      <motion.div 
        className="cloud cloud-small cloud-animate-2"
        style={{ top: 100, left: '55%', y: cloud5Y }}
      />
      <motion.div 
        className="cloud cloud-small cloud-animate-3"
        style={{ top: 200, left: '70%', y: cloud1Y }}
      />

      <div className="section-container relative z-10 pt-32 pb-8">
        {/* Centered Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
            Your competitors aren't smarter. They just show up first.
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground">
            Complete visibility strategy for businesses tired of being invisible. From comprehensive audit to sustainable organic growth, we deliver honest assessments and effective solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="btn-primary">
              Get Your Visibility Audit
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
          style={{ y: imageY, scale: imageScale, rotateX: imageRotateX }}
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
                boxShadow: '0 50px 100px -30px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}