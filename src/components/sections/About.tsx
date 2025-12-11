import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin } from 'lucide-react';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-24 bg-background overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">About us</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Built for local businesses that can't afford to stay invisible.
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              GEO Labs exists to give small and local businesses the same algorithmic advantages big brands pay agencies thousands for. We focus on SEO, local optimization, and GEO (Generative Engine Optimization) so your business shows up where it matters most — right when people are searching in your neighborhood.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 text-accent" />
              <span>Based in Los Angeles, serving local businesses everywhere.</span>
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div style={{ y }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Abstract Map Visual */}
              <div className="glass-card p-8 rounded-3xl shadow-card">
                <div className="relative h-80 bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl overflow-hidden">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute w-full h-px bg-primary/30"
                        style={{ top: `${(i + 1) * 12.5}%` }}
                      />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute h-full w-px bg-primary/30"
                        style={{ left: `${(i + 1) * 12.5}%` }}
                      />
                    ))}
                  </div>

                  {/* Location pins */}
                  {[
                    { top: '30%', left: '40%', size: 'lg', pulse: true },
                    { top: '50%', left: '60%', size: 'md', pulse: false },
                    { top: '40%', left: '25%', size: 'sm', pulse: false },
                    { top: '65%', left: '45%', size: 'md', pulse: true },
                    { top: '25%', left: '70%', size: 'sm', pulse: false },
                  ].map((pin, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="absolute"
                      style={{ top: pin.top, left: pin.left }}
                    >
                      <div className={`relative ${pin.pulse ? 'animate-pulse' : ''}`}>
                        <div
                          className={`rounded-full bg-accent flex items-center justify-center ${
                            pin.size === 'lg' ? 'w-8 h-8' : pin.size === 'md' ? 'w-6 h-6' : 'w-4 h-4'
                          }`}
                        >
                          <MapPin className={`text-accent-foreground ${
                            pin.size === 'lg' ? 'w-5 h-5' : pin.size === 'md' ? 'w-4 h-4' : 'w-3 h-3'
                          }`} />
                        </div>
                        {pin.pulse && (
                          <div className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* LA Label */}
                  <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur px-4 py-2 rounded-lg">
                    <div className="text-xs text-muted-foreground">Serving</div>
                    <div className="font-semibold text-foreground">Los Angeles & Beyond</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
