import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface Main3DWrapperProps {
  children: ReactNode;
}

export function Main3DWrapper({ children }: Main3DWrapperProps) {
  const { scrollYProgress } = useScroll();
  
  // Global 3D tilt based on scroll - Dreelio style
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.01]);
  const translateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 10]);

  return (
    <div className="perspective-container">
      <motion.div
        className="main-content-3d"
        style={{
          rotateX,
          scale,
          translateZ,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
