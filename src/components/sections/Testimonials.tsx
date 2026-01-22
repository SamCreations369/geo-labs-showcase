import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import testimonialFeatured from '@/assets/testimonial-featured.png';
import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';
import testimonial4 from '@/assets/testimonial-4.jpg';

const testimonials = [{
  name: 'Alex R.',
  role: 'Owner, Neighborhood Café',
  quote: 'Our calls from Google and Maps almost doubled within a few months. We\'re finally showing up above chains we could never beat before.',
  image: testimonial1
}, {
  name: 'Monica T.',
  role: 'Founder, Med Spa in LA',
  quote: 'GEO Labs helped us show up in AI-powered search results and local searches. We\'re seeing more booked consultations every week.',
  image: testimonial2
}, {
  name: 'David P.',
  role: 'Home Services Business Owner',
  quote: 'We went from invisible to fully booked weekends. It felt like flipping a switch on our online presence.',
  image: testimonial3
}, {
  name: 'Sarah K.',
  role: 'Owner, Fitness Studio',
  quote: 'Managing our online presence used to mean spreadsheets and missed opportunities. GEO Labs keeps everything tight and our clients impressed.',
  image: testimonial4
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
          <p className="text-2xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-10 max-w-4xl mx-auto font-medium">
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
          className="relative overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div className="flex w-max" style={{ x }}>
            {/* First sequence (measured) */}
            <div ref={loopRef} className="flex gap-6">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={`a-${i}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card p-6 rounded-2xl w-80 flex-shrink-0"
                >
                  <p className="text-foreground mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Duplicate sequence for seamless looping */}
            <div className="flex gap-6 ml-6" aria-hidden="true">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={`b-${i}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card p-6 rounded-2xl w-80 flex-shrink-0"
                >
                  <p className="text-foreground mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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