import { motion } from 'framer-motion';
import { Building2, UtensilsCrossed, Sparkles, Stethoscope, Dumbbell, Wrench } from 'lucide-react';

const industries = [
  { name: 'Local Restaurants', icon: UtensilsCrossed },
  { name: 'Med Spas', icon: Sparkles },
  { name: 'Dental Clinics', icon: Stethoscope },
  { name: 'Gyms & Studios', icon: Dumbbell },
  { name: 'Home Services', icon: Wrench },
  { name: 'Local Restaurants', icon: UtensilsCrossed },
  { name: 'Med Spas', icon: Sparkles },
  { name: 'Dental Clinics', icon: Stethoscope },
  { name: 'Gyms & Studios', icon: Dumbbell },
  { name: 'Home Services', icon: Wrench },
];

export function TrustBar() {
  return (
    <section className="py-12 bg-background border-y border-border/50 overflow-hidden">
      <div className="section-container mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground"
        >
          Built for neighborhood businesses ready to outrank big brands.
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex animate-marquee">
          {[...industries, ...industries].map((industry, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-8 text-muted-foreground/70"
            >
              <industry.icon className="w-5 h-5" />
              <span className="text-sm font-medium whitespace-nowrap">{industry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
