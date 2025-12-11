import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Star, Phone, Globe, MapPin, Bot, MessageSquare } from 'lucide-react';

export function DeviceFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} id="features" className="py-24 bg-background overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">Seamless across platforms</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Show up wherever customers are searching,{' '}
              <span className="text-muted-foreground">from Maps to AI chatbots.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We optimize your website, Google Business Profile, and GEO signals so you appear in local search, map packs, and generative AI answers — all with one ongoing strategy.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="feature-chip">
                <Globe className="w-4 h-4" />
                Google & Maps Optimization
              </div>
              <div className="feature-chip">
                <Bot className="w-4 h-4" />
                AI & GEO Optimization
              </div>
              <div className="feature-chip">
                <Star className="w-4 h-4" />
                Review & Reputation Engine
              </div>
            </div>
          </motion.div>

          {/* Right - Device Mockups */}
          <div className="relative">
            {/* Phone Mockup - Google Maps */}
            <motion.div
              style={{ y: y1 }}
              className="relative z-10 mx-auto w-64"
            >
              <div className="glass-card rounded-[2.5rem] p-2 shadow-card">
                <div className="bg-card rounded-[2rem] overflow-hidden">
                  {/* Phone Header */}
                  <div className="bg-secondary px-4 py-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">Maps</span>
                  </div>
                  
                  {/* Business Card */}
                  <div className="p-4">
                    <div className="bg-secondary/50 rounded-xl p-4 mb-3">
                      <div className="font-semibold text-foreground mb-1">Your Business Name</div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">4.9 (127)</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Open · Closes 8 PM</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 bg-accent text-accent-foreground rounded-full py-2 text-xs font-medium flex items-center justify-center gap-1">
                        <Globe className="w-3 h-3" />
                        Website
                      </button>
                      <button className="flex-1 bg-chart-up text-white rounded-full py-2 text-xs font-medium flex items-center justify-center gap-1">
                        <Phone className="w-3 h-3" />
                        Call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Browser Mockup - AI Chat */}
            <motion.div
              style={{ y: y2 }}
              className="absolute top-20 -right-8 lg:right-0 w-72 z-20"
            >
              <div className="glass-card rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">AI Assistant</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-secondary/50 rounded-lg p-3 text-xs text-muted-foreground">
                    "What's the best med spa near me?"
                  </div>
                  <div className="bg-accent/10 rounded-lg p-3 text-xs text-foreground">
                    Based on reviews and location, I recommend{' '}
                    <span className="font-semibold text-accent">Your Business</span> in Beverly Grove. They have excellent ratings and...
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
