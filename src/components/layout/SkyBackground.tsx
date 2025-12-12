import { motion, useScroll, useTransform } from 'framer-motion';

export function SkyBackground() {
  const { scrollYProgress } = useScroll();
  
  // Parallax for clouds - move slower than scroll
  const cloud1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cloud3Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const cloud4Y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="sky-background">
      <motion.div 
        className="cloud cloud-1"
        style={{ y: cloud1Y }}
      />
      <motion.div 
        className="cloud cloud-2"
        style={{ y: cloud2Y }}
      />
      <motion.div 
        className="cloud cloud-3"
        style={{ y: cloud3Y }}
      />
      <motion.div 
        className="cloud cloud-4"
        style={{ y: cloud4Y }}
      />
    </div>
  );
}
