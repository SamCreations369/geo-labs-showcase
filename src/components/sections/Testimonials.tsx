import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex R.',
    role: 'Owner, Neighborhood Café',
    quote: 'Our calls from Google and Maps almost doubled within a few months. We\'re finally showing up above chains we could never beat before.',
    avatar: 'AR',
  },
  {
    name: 'Monica T.',
    role: 'Founder, Med Spa in LA',
    quote: 'GEO Labs helped us show up in AI-powered search results and local searches. We\'re seeing more booked consultations every week.',
    avatar: 'MT',
  },
  {
    name: 'David P.',
    role: 'Home Services Business Owner',
    quote: 'We went from invisible to fully booked weekends. It felt like flipping a switch on our online presence.',
    avatar: 'DP',
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ 
        rotateX: -2, 
        rotateY: 2, 
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300 }
      }}
      className="glass-card p-8 rounded-2xl shadow-soft"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Quote className="w-8 h-8 text-accent/30 mb-4" />
      <p className="text-foreground text-lg leading-relaxed mb-6">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
            Loved by local businesses
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
