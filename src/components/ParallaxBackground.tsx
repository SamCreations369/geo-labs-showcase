import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  
  // Move the clouds upward faster as you scroll down
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-50%']);
  
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Cream/white to sky blue gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(40 30% 97%) 0%, hsl(40 30% 97%) 40%, hsl(200 70% 90%) 70%, hsl(200 80% 85%) 100%)',
        }}
      />
      {/* Parallax cloud layer */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[150%]"
        style={{
          backgroundImage: 'url(/images/clouds-bg.png)',
          backgroundSize: '100% auto',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          y,
        }}
      />
    </div>
  );
}
