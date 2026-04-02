import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ahrefsShowcase from '@/assets/ahrefs-showcase.png';
import gscShowcase from '@/assets/google-search-console.png';

interface SlideItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  label: string;
}

const slides: SlideItem[] = [
  { type: 'video', src: '/videos/pgr-showcase.mp4', alt: 'PGR Window Tinting website showcase', label: 'PGR Window Tinting' },
  { type: 'image', src: ahrefsShowcase, alt: 'Ahrefs SEO analytics dashboard', label: 'SEO Analytics' },
  { type: 'video', src: '/videos/aboutaria-showcase.mp4', alt: 'About Aria Karimpour website showcase', label: 'About Aria' },
  { type: 'image', src: gscShowcase, alt: 'Google Search Console performance data', label: 'Search Console' },
];

export function ShowcaseCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll to active index
  const activeIndexFloat = useTransform(scrollYProgress, [0, 1], [0, slides.length - 1]);

  return (
    // Tall container to create scroll space — each slide gets ~100vh
    <div ref={containerRef} style={{ height: `${slides.length * 100}vh` }} className="relative">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-background z-30">
        <div
          className="relative w-full max-w-5xl mx-auto"
          style={{ perspective: '1200px', height: isMobile ? '60vh' : '65vh' }}
        >
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {slides.map((slide, index) => (
              <ScrollSlide
                key={slide.label}
                slide={slide}
                index={index}
                activeIndexFloat={activeIndexFloat}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* Dots + label */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <ScrollDot key={i} index={i} activeIndexFloat={activeIndexFloat} />
            ))}
          </div>
          <ScrollLabel activeIndexFloat={activeIndexFloat} />
        </div>
      </div>
    </div>
  );
}

function ScrollSlide({
  slide,
  index,
  activeIndexFloat,
  isMobile,
}: {
  slide: SlideItem;
  index: number;
  activeIndexFloat: ReturnType<typeof useTransform>;
  isMobile: boolean;
}) {
  const diff = useTransform(activeIndexFloat, (v: number) => index - v);

  const rotateY = useTransform(diff, (d: number) => (isMobile ? 0 : d * -45));
  const scale = useTransform(diff, (d: number) => {
    const abs = Math.abs(d);
    if (abs < 0.05) return 1;
    return isMobile ? 0.85 : 0.75;
  });
  const xPercent = useTransform(diff, (d: number) =>
    isMobile ? d * 110 : d * 85
  );
  const z = useTransform(diff, (d: number) => {
    const abs = Math.abs(d);
    if (abs < 0.05) return 0;
    return isMobile ? -100 : -250;
  });
  const opacity = useTransform(diff, (d: number) => {
    const abs = Math.abs(d);
    if (abs < 0.05) return 1;
    if (isMobile) return Math.max(0, 1 - abs * 2);
    return abs > 1.2 ? 0 : 0.5;
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        rotateY,
        scale,
        x: useTransform(xPercent, (v: number) => `${v}%`),
        z,
        opacity,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="w-[90%] sm:w-[80%] h-[85%] rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
        {slide.type === 'image' ? (
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <video
            src={slide.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </motion.div>
  );
}

function ScrollLabel({
  activeIndexFloat,
}: {
  activeIndexFloat: ReturnType<typeof useTransform>;
}) {
  const label = useTransform(activeIndexFloat, (v: number) => {
    const idx = Math.round(Math.max(0, Math.min(v, slides.length - 1)));
    return slides[idx].label;
  });

  return (
    <motion.p className="text-sm text-muted-foreground font-medium">{label}</motion.p>
  );
}

function ScrollDot({
  index,
  activeIndexFloat,
}: {
  index: number;
  activeIndexFloat: ReturnType<typeof useTransform>;
}) {
  const activeIdx = useTransform(activeIndexFloat, (v: number) =>
    Math.round(Math.max(0, Math.min(v, slides.length - 1)))
  );
  const isActive = useTransform(activeIdx, (v: number) => v === index);
  const width = useTransform(isActive, (a: boolean) => (a ? 24 : 8));
  const bg = useTransform(isActive, (a: boolean) =>
    a ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground) / 0.4)'
  );

  return (
    <motion.div
      className="h-2 rounded-full"
      style={{ width, backgroundColor: bg }}
    />
  );
}
