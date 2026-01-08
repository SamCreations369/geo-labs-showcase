import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  
  // Move the clouds upward as you scroll down (creates depth effect)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  
  return (
    <motion.div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: 'linear-gradient(180deg, hsl(200 85% 85%) 0%, hsl(200 80% 88%) 50%, hsl(200 75% 92%) 100%)',
      }}
    >
      <motion.div
        className="absolute inset-0 w-full h-[130%]"
        style={{
          backgroundImage: 'url(/images/clouds-bg.png)',
          backgroundSize: '100% auto',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          y,
        }}
      />
    </motion.div>
  );
}
