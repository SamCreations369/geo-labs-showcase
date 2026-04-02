import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  { type: 'image', src: ahrefsShowcase, alt: 'Ahrefs SEO analytics dashboard', label: 'SEO Analytics' },
  { type: 'image', src: gscShowcase, alt: 'Google Search Console performance data', label: 'Search Console' },
  { type: 'video', src: '/videos/pgr-showcase.mp4', alt: 'PGR Window Tinting website showcase', label: 'PGR Window Tinting' },
  { type: 'video', src: '/videos/aboutaria-showcase.mp4', alt: 'About Aria Karimpour website showcase', label: 'About Aria' },
];

export function ShowcaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const getSlideStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff =
      diff > slides.length / 2 ? diff - slides.length :
      diff < -slides.length / 2 ? diff + slides.length :
      diff;

    if (isMobile) {
      return {
        rotateY: normalizedDiff * -30,
        scale: normalizedDiff === 0 ? 1 : 0.7,
        x: `${normalizedDiff * 90}%`,
        z: normalizedDiff === 0 ? 0 : -200,
        opacity: Math.abs(normalizedDiff) > 1 ? 0 : normalizedDiff === 0 ? 1 : 0.3,
      };
    }

    return {
      rotateY: normalizedDiff * -65,
      scale: normalizedDiff === 0 ? 1 : 0.6,
      x: `${normalizedDiff * 75}%`,
      z: normalizedDiff === 0 ? 50 : -400,
      opacity: Math.abs(normalizedDiff) > 1 ? 0 : normalizedDiff === 0 ? 1 : 0.4,
    };
  };

  return (
    <div className="relative w-full">
      {/* 3D Perspective Container */}
      <div
        className="relative mx-auto max-w-5xl overflow-hidden"
        style={{ perspective: '1200px', height: isMobile ? '300px' : '500px' }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {slides.map((slide, index) => {
            const style = getSlideStyle(index);
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

        {/* Dots */}
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
      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-3 font-medium"
        >
          {slides[activeIndex].label}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
