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

const SLIDE_COUNT = slides.length;
const ANGLE_STEP = 360 / SLIDE_COUNT; // 90deg per card
const RADIUS = 500; // translateZ radius for the cylinder

export function ShowcaseCarousel() {
  const outerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to cylinder rotation (desktop) or active index (mobile)
  const cylinderRotation = useTransform(scrollYProgress, [0, 1], [0, -ANGLE_STEP * (SLIDE_COUNT - 1)]);

  // For mobile: map progress to a continuous index value (0 to SLIDE_COUNT-1)
  const mobileProgress = useTransform(scrollYProgress, [0, 1], [0, SLIDE_COUNT - 1]);

  return (
    <div
      ref={outerRef}
      style={{ height: `${SLIDE_COUNT * 100}vh` }}
      className="relative"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {isMobile ? (
          <MobileCarousel progress={mobileProgress} />
        ) : (
          <DesktopCarousel rotation={cylinderRotation} />
        )}

        {/* Dot indicators */}
        <ScrollDots progress={mobileProgress} />
      </div>
    </div>
  );
}

function DesktopCarousel({ rotation }: { rotation: any }) {
  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{ perspective: '1200px', height: '500px' }}
    >
      <motion.div
        className="relative"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          rotateY: rotation,
        }}
      >
        {slides.map((slide, index) => {
          const angle = index * ANGLE_STEP;
          return (
            <div
              key={slide.label}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="w-[70%] max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
                <SlideContent slide={slide} />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function MobileCarousel({ progress }: { progress: any }) {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: '350px' }}>
      {slides.map((slide, index) => (
        <MobileSlide key={slide.label} slide={slide} index={index} progress={progress} />
      ))}
    </div>
  );
}

function MobileSlide({ slide, index, progress }: { slide: SlideItem; index: number; progress: any }) {
  // Each slide: when progress equals index, translateY = 0 and opacity = 1
  // Before: translateY = 100% (below), After: translateY = -100% (above)
  const y = useTransform(progress, [index - 1, index, index + 1], ['100%', '0%', '-100%']);
  const opacity = useTransform(progress, [index - 1, index - 0.5, index, index + 0.5, index + 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(progress, [index - 1, index, index + 1], [0.85, 1, 0.85]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4"
      style={{ y, opacity, scale }}
    >
      <div className="w-full max-w-sm aspect-video rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
        <SlideContent slide={slide} />
      </div>
    </motion.div>
  );
}

function SlideContent({ slide }: { slide: SlideItem }) {
  if (slide.type === 'image') {
    return (
      <img
        src={slide.src}
        alt={slide.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <video
      src={slide.src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
    />
  );
}

function ScrollDots({ progress }: { progress: any }) {
  return (
    <div className="flex gap-2 mt-6">
      {slides.map((slide, index) => (
        <DotIndicator key={slide.label} index={index} progress={progress} label={slide.label} />
      ))}
    </div>
  );
}

function DotIndicator({ index, progress, label }: { index: number; progress: any; label: string }) {
  const width = useTransform(progress, [index - 0.5, index, index + 0.5], [8, 24, 8]);
  const opacity = useTransform(progress, [index - 0.5, index, index + 0.5], [0.4, 1, 0.4]);

  return (
    <motion.div
      className="h-2 rounded-full bg-foreground"
      style={{ width, opacity }}
      aria-label={`Slide: ${label}`}
    />
  );
}
