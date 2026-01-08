import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const { scrollY } = useScroll();

  // More noticeable parallax (cloud layer moves faster than the page)
  const y = useTransform(scrollY, [0, 2400], [160, -900]);
  const scale = useTransform(scrollY, [0, 2400], [1.02, 1.08]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Smooth cream -> sky gradient (no hard stop lines) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(40 30% 97%) 0%, hsl(40 28% 96%) 18%, hsl(200 55% 92%) 52%, hsl(200 75% 88%) 74%, hsl(200 80% 85%) 100%)',
        }}
      />

      {/* Parallax cloud layer */}
      <motion.div
        className="absolute inset-x-0 -bottom-24 h-[180%] will-change-transform"
        style={{
          backgroundImage: 'url(/images/clouds-bg.png)',
          backgroundSize: '100% auto',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'hsl(200 80% 85%)',
          y,
          scale,
          transformOrigin: 'center bottom',
        }}
      />
    </div>
  );
}

