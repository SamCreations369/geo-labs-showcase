import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Search, MapPin, FileText, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

const features = [
  { icon: Search, label: 'SEO Audit & Fixes' },
  { icon: MapPin, label: 'GMB / GBP Optimization' },
  { icon: Target, label: 'Location & Keyword Strategy' },
  { icon: FileText, label: 'Content that ranks locally' },
];

export function ProjectSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="py-24 bg-secondary/30 overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - UI Mockup */}
          <motion.div style={{ y }} className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ rotateY: 2, rotateX: -2 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="glass-card p-6 rounded-3xl shadow-card"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-foreground">Local Keyword Rankings</span>
                <span className="chip text-xs">Live</span>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { keyword: '"med spa beverly hills"', rank: 3, change: '+5' },
                  { keyword: '"best dentist near me"', rank: 1, change: '+12' },
                  { keyword: '"home cleaning LA"', rank: 4, change: '+8' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-xl p-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.keyword}</div>
                      <div className="text-xs text-muted-foreground">Position #{item.rank}</div>
                    </div>
                    <div className="text-sm font-semibold text-chart-up">{item.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">142</div>
                  <div className="text-xs text-muted-foreground">Calls from Maps</div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">38</div>
                  <div className="text-xs text-muted-foreground">AI Result Appearances</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="eyebrow">Local visibility</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Turn your website into a local search growth engine.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stop guessing how customers find you. GEO Labs combines SEO foundations, local optimization, and GEO (Generative Engine Optimization) so your business shows up more often — and in all the right places.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="feature-chip">
                  <feature.icon className="w-4 h-4" />
                  {feature.label}
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-primary">
              Get a FREE GEO Audit
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
