import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import testimonialFeatured from '@/assets/testimonial-featured.png';
import testimonialBill from '@/assets/testimonial-bill.png';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';
import testimonialBrandon from '@/assets/testimonial-brandon.png';

const testimonials = [{
  name: 'Bill Williams',
  role: 'Mobile Detail Owner',
  quote: 'Honest feedback we actually needed. Our content was mediocre and our local SEO was a mess. They helped fix both, and now we rank where we should have been all along. Profits have increased and I\'ve had more calls consistently ever since.',
  image: testimonialBill
}, {
  name: 'Juan Hernandez',
  role: 'Clothing Brand Owner',
  quote: 'They identified our biggest visibility gaps, fixed them, and taught us how to keep them fixed. Would definitely recommend.',
  image: testimonial2
}, {
  name: 'Monica T.',
  role: 'Home Services Business Owner',
  quote: 'We went from invisible to fully booked weekends. It felt like flipping a switch on our online presence.',
  image: testimonial3
}, {
  name: 'Brandon Routh',
  role: 'HVAC Company Director',
  quote: 'No sugar-coating, just results. They explained exactly why we weren\'t ranking and what it would take to fix it. Six months later, we\'re finally getting the business traffic we needed.',
  image: testimonialBrandon
}];

export function Testimonials() {
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
    setLoopWidth(el.scrollWidth);

    return () => ro.disconnect();
  }, []);

  const speed = isHovered ? 0 : 50;

  useAnimationFrame((_, delta) => {
    if (!loopWidth || speed === 0) return;

    const moveBy = (speed * delta) / 1000;
    const next = x.get() - moveBy;
    x.set(next <= -loopWidth ? next + loopWidth : next);
  });

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="section-container">
        {/* Featured Testimonial - Dreelio style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-12 md:p-16 mb-12 text-center"
        >
          <p className="text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-10 max-w-4xl mx-auto font-medium">
            "GEO Labs is by far the best local SEO partner we have ever worked with."
          </p>
          <div className="flex flex-col items-center">
            <img src={testimonialFeatured} alt="Martha P." className="w-16 h-16 rounded-full object-cover mb-4" />
            <div className="font-semibold text-foreground">Martha P.</div>
            <div className="text-sm text-muted-foreground">VP Marketing, Local Business Network</div>
          </div>
        </motion.div>

        {/* Scrolling Testimonials with pause on hover */}
        <div
          className="relative overflow-hidden cursor-pointer py-4 -my-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div className="flex w-max py-2" style={{ x }}>
            {/* First sequence (measured) */}
            <div ref={loopRef} className="flex gap-6 py-2">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={`a-${i}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card rounded-2xl w-80 flex-shrink-0 flex flex-col"
                >
                  <p className="text-foreground p-6 pb-4 flex-1">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 px-6 py-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Duplicate sequence for seamless looping */}
            <div className="flex gap-6 ml-6 py-2" aria-hidden="true">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={`b-${i}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card rounded-2xl w-80 flex-shrink-0 flex flex-col"
                >
                  <p className="text-foreground p-6 pb-4 flex-1">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 px-6 py-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}