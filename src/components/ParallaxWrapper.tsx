import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxWrapperProps {
  children: ReactNode;
}

export function ParallaxWrapper({ children }: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Create smooth spring-based transforms for the 3D tilt effect
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 3]),
    { stiffness: 100, damping: 30 }
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.01]),
    { stiffness: 100, damping: 30 }
  );

  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -20]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <div 
      ref={ref} 
      className="relative overflow-hidden"
      style={{ perspective: '1500px' }}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          y: translateY,
          transformOrigin: 'center top',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
