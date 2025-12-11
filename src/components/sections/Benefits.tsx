import { motion } from 'framer-motion';
import { Search, Bot, Award, UserCheck } from 'lucide-react';

const benefits = [
  {
    icon: Search,
    title: 'SEO Foundations',
    description: 'Technical fixes, on-page optimization, and clean site structure so search engines trust your website.',
  },
  {
    icon: Bot,
    title: 'GEO (Generative Engine Optimization)',
    description: 'We tune your content and signals so AI tools like ChatGPT, Google Gemini, and others are more likely to mention your business.',
  },
  {
    icon: Award,
    title: 'Local Authority',
    description: 'Reviews, citations, and local content that position you as the go-to business in your neighborhood.',
  },
  {
    icon: UserCheck,
    title: 'Done-for-You Execution',
    description: 'We handle the research, strategy, and implementation while you focus on serving your customers.',
  },
];

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        rotateX: -3, 
        rotateY: 3, 
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300 }
      }}
      className="glass-card p-8 rounded-2xl shadow-soft tilt-card"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
        <benefit.icon className="w-7 h-7 text-accent" />
      </div>
      <h3 className="font-serif text-xl text-foreground mb-3">{benefit.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
    </motion.div>
  );
}

export function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Features</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Built for freelancers,
            <br />
            <span className="text-muted-foreground">powered by simplicity</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Smart, flexible, and built around your business workflow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
