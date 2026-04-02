import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ahrefsShowcase from '@/assets/ahrefs-showcase.png';
import gscShowcase from '@/assets/google-search-console.png';

interface SlideItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  label: string;
  link?: string;
}

const slides: SlideItem[] = [
  { type: 'video', src: '/videos/pgr-showcase.mp4', alt: 'PGR Window Tinting website showcase', label: 'PGR Window Tinting', link: 'https://www.pgrwindowtinting.com' },
  { type: 'image', src: ahrefsShowcase, alt: 'Ahrefs SEO analytics dashboard', label: 'SEO Analytics' },
  { type: 'video', src: '/videos/aboutaria-showcase.mp4', alt: 'About Aria Karimpour website showcase', label: 'About Aria', link: 'https://www.aboutariakarimpour.com' },
  { type: 'image', src: gscShowcase, alt: 'Google Search Console performance data', label: 'Search Console' },
];

export function ShowcaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Scroll-driven: advance slides on scroll within the container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;
    const threshold = 150;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) {
        accumulatedDelta = 0;
        return;
      }

      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      accumulatedDelta += delta;

      if (accumulatedDelta > threshold) {
        accumulatedDelta = 0;
        setActiveIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (accumulatedDelta < -threshold) {
        accumulatedDelta = 0;
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDesktopStyle = (index: number) => {
    const diff = index - activeIndex;
    return {
      rotateY: diff * -45,
      scale: diff === 0 ? 1 : 0.75,
      x: `${diff * 85}%`,
      z: diff === 0 ? 0 : -250,
      opacity: Math.abs(diff) > 1 ? 0 : diff === 0 ? 1 : 0.5,
    };
  };

  const getMobileStyle = (index: number) => {
    const diff = index - activeIndex;
    return {
      rotateY: 0,
      scale: diff === 0 ? 1 : 0.85,
      y: `${diff * 110}%`,
      x: '0%',
      z: diff === 0 ? 0 : -100,
      opacity: diff === 0 ? 1 : 0,
    };
  };

  return (
    <div ref={containerRef} className="relative w-full sky-gradient py-12 sm:py-16">
      {/* 3D Perspective Container */}
      <div
        className="relative mx-auto max-w-5xl"
        style={{ perspective: '1200px', height: isMobile ? '300px' : '500px' }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {slides.map((slide, index) => {
            const style = isMobile ? getMobileStyle(index) : getDesktopStyle(index);
            return (
              <motion.div
                key={slide.label}
                className="absolute inset-0 flex items-center justify-center"
                animate={style}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
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
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.label}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-foreground w-6'
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Go to ${slide.label}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Label */}
      <motion.p
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center text-sm text-muted-foreground mt-3 font-medium"
      >
        {slides[activeIndex].label}
      </motion.p>
    </div>
  );
}
