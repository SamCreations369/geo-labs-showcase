import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
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

export function ShowcaseCarousel() {
  const outerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Continuous progress mapped to 0 → SLIDE_COUNT-1
  const progress = useTransform(scrollYProgress, [0, 1], [0, SLIDE_COUNT - 1]);

  return (
    <div
      ref={outerRef}
      style={{ height: `${(SLIDE_COUNT + 1) * 100}vh` }}
      className="relative sky-gradient"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="relative w-full max-w-5xl mx-auto px-4"
          style={{
            perspective: isMobile ? '800px' : '1200px',
            height: isMobile ? '300px' : '500px',
          }}
        >
          {slides.map((slide, index) => (
            <CarouselSlide
              key={slide.label}
              slide={slide}
              index={index}
              progress={progress}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-8">
          {slides.map((slide, index) => (
            <DotIndicator key={slide.label} index={index} progress={progress} />
          ))}
        </div>

        {/* Label */}
        <SlideLabel progress={progress} />
      </div>
    </div>
  );
}

function CarouselSlide({
  slide,
  index,
  progress,
  isMobile,
}: {
  slide: SlideItem;
  index: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}) {
  // Desktop: rotateY-based 3D effect. Mobile: translateY from bottom.
  const rotateY = useTransform(progress, (p) => {
    const diff = index - p;
    return isMobile ? 0 : diff * -45;
  });

  const x = useTransform(progress, (p) => {
    const diff = index - p;
    return isMobile ? 0 : diff * 85;
  });

  const y = useTransform(progress, (p) => {
    if (!isMobile) return 0;
    const diff = index - p;
    return diff * 110;
  });

  const z = useTransform(progress, (p) => {
    const diff = index - p;
    if (isMobile) return Math.abs(diff) === 0 ? 0 : -100;
    return diff === 0 ? 0 : -250;
  });

  const scale = useTransform(progress, (p) => {
    const diff = Math.abs(index - p);
    if (diff < 0.01) return 1;
    return isMobile ? 0.85 : 0.75;
  });

  const opacity = useTransform(progress, (p) => {
    const diff = Math.abs(index - p);
    if (diff < 0.01) return 1;
    if (diff > 1.2) return 0;
    if (isMobile) return Math.max(0, 1 - diff * 1.5);
    return 0.5;
  });

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        rotateY,
        x: useTransform(x, (v) => `${v}%`),
        y: useTransform(y, (v) => `${v}%`),
        z,
        scale,
        opacity,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="w-[85%] sm:w-[75%] h-full rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
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

function DotIndicator({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const width = useTransform(progress, (p) => {
    const diff = Math.abs(index - p);
    return diff < 0.5 ? 24 : 8;
  });
  const dotOpacity = useTransform(progress, (p) => {
    const diff = Math.abs(index - p);
    return diff < 0.5 ? 1 : 0.4;
  });

  return (
    <motion.div
      className="h-2 rounded-full bg-foreground"
      style={{ width, opacity: dotOpacity }}
    />
  );
}

function SlideLabel({ progress }: { progress: MotionValue<number> }) {
  const labelOpacity = useTransform(progress, (p) => {
    const nearest = Math.round(p);
    return Math.abs(p - nearest) < 0.3 ? 1 : 0;
  });

  const labelIndex = useTransform(progress, (p) => Math.round(p));

  return (
    <motion.p
      className="text-center text-sm text-muted-foreground mt-3 font-medium"
      style={{ opacity: labelOpacity }}
    >
      <MotionLabel index={labelIndex} />
    </motion.p>
  );
}

function MotionLabel({ index }: { index: MotionValue<number> }) {
  // Use a simple approach - render all labels and show active one
  return (
    <>
      {slides.map((slide, i) => (
        <MotionLabelText key={slide.label} index={index} slideIndex={i} label={slide.label} />
      ))}
    </>
  );
}

function MotionLabelText({
  index,
  slideIndex,
  label,
}: {
  index: MotionValue<number>;
  slideIndex: number;
  label: string;
}) {
  const display = useTransform(index, (v) => (v === slideIndex ? 'inline' : 'none'));
  return <motion.span style={{ display }}>{label}</motion.span>;
}
