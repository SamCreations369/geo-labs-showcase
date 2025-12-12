import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import budgetUI from '@/assets/budget-ui.png';

const features = ['Call & Lead Tracking', 'Traffic & Visibility Reports', 'Conversion Insights', 'Monthly Strategy Adjustments'];

export function FinancialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-24 overflow-hidden">
      <div className="section-container">
        <motion.div 
          className="glass-card-strong p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="eyebrow">Revenue impact</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                Turn more searches into actual paying customers.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Track how search visibility translates into calls, bookings, and visits. We connect traffic insights with real-world results so you can see the ROI of your SEO and GEO investment.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {features.map((feature, i) => (
                  <motion.div 
                    key={feature} 
                    className="chip"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    {feature}
                  </motion.div>
                ))}
              </div>
              <motion.a 
                href="#contact" 
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Get a FREE GEO Audit
              </motion.a>
            </motion.div>

            {/* Right - Image */}
            <div className="relative">
              <motion.div style={{ y }}>
                <motion.img
                  src={budgetUI}
                  alt="GEO Labs revenue tracking dashboard"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.03, rotateY: -4, rotateX: 2 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
