import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PhoneCall, BarChart3, LineChart, Settings2, TrendingUp, Users, MousePointerClick } from 'lucide-react';

const features = [
  { icon: PhoneCall, label: 'Call & Lead Tracking' },
  { icon: BarChart3, label: 'Traffic & Visibility Reports' },
  { icon: LineChart, label: 'Conversion Insights' },
  { icon: Settings2, label: 'Monthly Strategy Adjustments' },
];

export function FinancialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

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
            <span className="eyebrow">Revenue impact</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Turn more searches into actual paying customers.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Track how search visibility translates into calls, bookings, and visits. We connect traffic insights with real-world results so you can see the ROI of your SEO and GEO investment.
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

          {/* Right - UI Mockup */}
          <motion.div style={{ y }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ rotateY: -2, rotateX: 2 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="glass-card p-6 rounded-3xl shadow-card"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-foreground">Revenue Dashboard</span>
                <span className="text-xs text-muted-foreground">This month</span>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <TrendingUp className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <div className="text-lg font-bold text-foreground">24.5K</div>
                  <div className="text-[10px] text-muted-foreground">Impressions</div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <MousePointerClick className="w-4 h-4 mx-auto mb-1 text-accent" />
                  <div className="text-lg font-bold text-foreground">1,847</div>
                  <div className="text-[10px] text-muted-foreground">Clicks</div>
                </div>
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <Users className="w-4 h-4 mx-auto mb-1 text-chart-up" />
                  <div className="text-lg font-bold text-foreground">156</div>
                  <div className="text-[10px] text-muted-foreground">Conversions</div>
                </div>
              </div>

              {/* Chart Area */}
              <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-foreground">Calls & Form Submissions</span>
                  <div className="flex gap-2 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-accent" /> Calls
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-chart-up" /> Forms
                    </span>
                  </div>
                </div>
                <div className="h-24 flex items-end gap-2">
                  {[
                    { calls: 60, forms: 30 },
                    { calls: 45, forms: 40 },
                    { calls: 70, forms: 35 },
                    { calls: 55, forms: 50 },
                    { calls: 80, forms: 45 },
                    { calls: 75, forms: 60 },
                    { calls: 90, forms: 55 },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex gap-0.5">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${item.calls}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        className="flex-1 bg-accent/80 rounded-t-sm"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${item.forms}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        className="flex-1 bg-chart-up/80 rounded-t-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Conversion Rate</span>
                <span className="font-semibold text-chart-up">8.4% ↑</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
