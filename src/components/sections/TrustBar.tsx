import { motion } from 'framer-motion';

const trustLogos = [
  'Local Restaurants',
  'Med Spas',
  'Dental Clinics',
  'Gyms & Studios',
  'Home Services',
  'Local Restaurants',
  'Med Spas',
  'Dental Clinics',
  'Gyms & Studios',
  'Home Services',
];

export function TrustBar() {
  return (
    <section className="py-16 bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-sm text-muted-foreground">
          Built for neighborhood businesses ready to outrank big brands
        </p>
      </motion.div>

      <div className="relative overflow-hidden">
        <div className="flex animate-marquee">
          {[...trustLogos, ...trustLogos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-8 px-6 py-3 rounded-full bg-secondary/50 text-muted-foreground text-sm font-medium"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
