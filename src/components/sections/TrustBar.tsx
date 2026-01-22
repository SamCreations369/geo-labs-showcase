import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

const trustLogos = ['Google', 'Copilot', 'ChatGPT', 'YouTube', 'Google Maps', 'Google', 'Copilot', 'ChatGPT', 'YouTube', 'Google Maps'];

export function TrustBar() {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const loopRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);

  useLayoutEffect(() => {
    const el = loopRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setLoopWidth(el.scrollWidth);
    });
    ro.observe(el);
    // Set initial width immediately
    setLoopWidth(el.scrollWidth);

    return () => ro.disconnect();
  }, []);

  // px per second (slower by default; paused on hover)
  const speed = isHovered ? 0 : 40;

  useAnimationFrame((_, delta) => {
    if (!loopWidth || speed === 0) return;

    const moveBy = (speed * delta) / 1000;
    const next = x.get() - moveBy;
    // Wrap seamlessly when one full sequence has scrolled out
    x.set(next <= -loopWidth ? next + loopWidth : next);
  });

  return (
    <section className="py-16 bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-sm text-muted-foreground">Increased visibility where customers are searching</p>
      </motion.div>

      <div
        className="relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div className="flex w-max" style={{ x }}>
          {/* First sequence (measured) */}
          <div ref={loopRef} className="flex">
            {trustLogos.map((logo, i) => (
              <div
                key={`a-${i}`}
                className="flex-shrink-0 mx-4 px-6 py-3 rounded-full bg-secondary/50 text-muted-foreground text-sm font-medium"
              >
                {logo}
              </div>
            ))}
          </div>

          {/* Duplicate sequence for seamless looping */}
          <div className="flex" aria-hidden="true">
            {trustLogos.map((logo, i) => (
              <div
                key={`b-${i}`}
                className="flex-shrink-0 mx-4 px-6 py-3 rounded-full bg-secondary/50 text-muted-foreground text-sm font-medium"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}