import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '@/hooks/use-mobile';
import ahrefsShowcase from '@/assets/ahrefs-showcase.png';
import gscShowcase from '@/assets/google-search-console.png';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    if (!section) return;

    if (isMobile) {
      // Mobile: each card slides up into frame individually
      const ctx = gsap.context(() => {
        cardRefs.current.forEach((card) => {
          if (!card) return;
          gsap.set(card, { y: 80, opacity: 0 });
          ScrollTrigger.create({
            trigger: card,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 0.6,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(card, {
                y: 80 * (1 - p),
                opacity: p,
                scale: 0.92 + 0.08 * p,
              });
            },
          });
        });
      }, section);
      return () => ctx.revert();
    }

    // Desktop: 3D scroll-locked carousel
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const activeProgress = self.progress * (slides.length - 1);
          const newIndex = Math.round(activeProgress);
          setActiveIndex(newIndex);

          cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const diff = index - activeProgress;
            const absDiff = Math.abs(diff);

            gsap.set(card, {
              xPercent: diff * 55,
              z: -absDiff * 300,
              rotateY: diff * -35,
              scale: Math.max(1 - absDiff * 0.2, 0.6),
              opacity: absDiff < 1.5 ? Math.max(1 - absDiff * 0.6, 0) : 0,
              filter: `blur(${absDiff * 2}px)`,
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  // Reduced motion or mobile: detect for static layout
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const isStatic = isMobile || prefersReduced;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: isStatic ? 'auto' : `${slides.length * 100}vh` }}
    >
      <div
        className="w-full flex flex-col items-center justify-center"
        style={
          isStatic
            ? { position: 'relative' }
            : { position: 'sticky', top: 0, height: '100vh' }
        }
      >
        {/* 3D Perspective Container */}
        <div
          className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center"
          style={isStatic ? {} : { perspective: '1200px' }}
        >
          <div
            className={`relative w-full ${isStatic ? '' : ''}`}
            style={{
              height: isStatic ? 'auto' : '60vh',
              transformStyle: isStatic ? undefined : 'preserve-3d',
            }}
          >
            {slides.map((slide, index) => {
              // Static layout: show only active on mobile, all stacked for reduced motion
              if (isStatic) {
                if (isMobile && index !== activeIndex) return null;
                return (
                  <div
                    key={slide.label}
                    className={`${prefersReduced ? 'mb-6' : ''} w-[90%] sm:w-[80%] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-card border border-border`}
                    style={isMobile ? { aspectRatio: '16/9' } : {}}
                  >
                    {slide.type === 'image' ? (
                      <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <video src={slide.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    )}
                  </div>
                );
              }

              // Desktop 3D layout
              return (
                <div
                  key={slide.label}
                  ref={(el) => setCardRef(el, index)}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  <div className="w-[80%] h-full rounded-2xl overflow-hidden shadow-2xl bg-card border border-border">
                    {slide.type === 'image' ? (
                      <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <video src={slide.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Label + Link + Dots */}
        <div className="py-6 flex flex-col items-center gap-3">
          <div className="text-center min-h-[3rem]">
            <p
              className="text-sm font-semibold text-foreground transition-opacity duration-300"
              key={activeIndex}
            >
              {slides[activeIndex]?.label}
            </p>
            {slides[activeIndex]?.link && (
              <a
                href={slides[activeIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                {slides[activeIndex].link!.replace('https://www.', '')}
              </a>
            )}
          </div>

          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.label}
                onClick={() => {
                  if (!isStatic && sectionRef.current) {
                    const sectionTop = sectionRef.current.offsetTop;
                    const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;
                    const targetScroll = sectionTop + (index / (slides.length - 1)) * sectionHeight;
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-foreground w-6'
                    : 'bg-muted-foreground/40 hover:bg-muted-foreground/60 w-2'
                }`}
                aria-label={`Go to ${slide.label}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
