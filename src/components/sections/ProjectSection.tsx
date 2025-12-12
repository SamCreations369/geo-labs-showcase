import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import projectUI from '@/assets/project-ui.png';

const features = ['SEO Audit & Fixes', 'GMB / GBP Optimization', 'Location & Keyword Strategy', 'Content that ranks locally'];

export function ProjectSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

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
            {/* Left - Image */}
            <div className="relative order-2 lg:order-1">
              <motion.div style={{ y }}>
                <motion.img
                  src={projectUI}
                  alt="GEO Labs project management dashboard"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
                  whileHover={{ scale: 1.03, rotateY: 4, rotateX: -2 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                />
              </motion.div>
            </div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2"
            >
              <span className="eyebrow">Local visibility</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                Turn your website into a local search growth engine.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Stop guessing how customers find you. GEO Labs combines SEO foundations, local optimization, and GEO (Generative Engine Optimization) so your business shows up more often — and in all the right places.
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
