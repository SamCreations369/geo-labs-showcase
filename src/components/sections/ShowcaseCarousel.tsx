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
    offset: ['start end', 'end start'],
  });

  // Map scroll progress to active index (0 to slides.length - 1)
  const activeIndexFloat = useTransform(scrollYProgress, [0.1, 0.9], [0, slides.length - 1]);

  return (
    <div ref={containerRef} className="relative w-full py-4">
      {/* 3D Perspective Container */}
      <div
        className="relative mx-auto max-w-5xl overflow-hidden sticky top-20"
        style={{ perspective: '1200px', height: isMobile ? '300px' : '500px' }}
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

      {/* Label driven by scroll */}
      <div className="sticky top-[calc(50vh+280px)] flex justify-center pointer-events-none">
        <ScrollLabel activeIndexFloat={activeIndexFloat} />
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
  const scale = useTransform(diff, (d: number) =>
    Math.abs(d) < 0.01 ? 1 : isMobile ? 0.85 : 0.75
  );
  const x = useTransform(diff, (d: number) =>
    isMobile ? d * 105 : d * 85
  );
  const z = useTransform(diff, (d: number) =>
    Math.abs(d) < 0.01 ? 0 : isMobile ? -100 : -250
  );
  const opacity = useTransform(diff, (d: number) => {
    const abs = Math.abs(d);
    if (abs < 0.01) return 1;
    if (isMobile) return abs > 0.8 ? 0 : 1 - abs;
    return abs > 1.2 ? 0 : 0.5;
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        rotateY,
        scale,
        x: useTransform(x, (v: number) => `${v}%`),
        z,
        opacity,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="w-[90%] sm:w-[80%] h-full rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
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

  // Dots
  const activeIdx = useTransform(activeIndexFloat, (v: number) =>
    Math.round(Math.max(0, Math.min(v, slides.length - 1)))
  );

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {slides.map((_, i) => (
          <ScrollDot key={i} index={i} activeIdx={activeIdx} />
        ))}
      </div>
      <motion.p className="text-sm text-muted-foreground font-medium">
        {label}
      </motion.p>
    </div>
  );
}

function ScrollDot({
  index,
  activeIdx,
}: {
  index: number;
  activeIdx: ReturnType<typeof useTransform>;
}) {
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
