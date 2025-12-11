import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    subtitle: 'Local Basics',
    price: '$497',
    period: '/month',
    description: 'For small businesses taking their first serious step into SEO and GEO.',
    features: [
      'Local SEO audit',
      'Google Business Profile optimization',
      '1 focus location',
      'Monthly performance report',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    subtitle: 'Neighborhood Leader',
    price: '$997',
    period: '/month',
    description: 'For businesses that want to dominate their area and outrank bigger brands.',
    features: [
      'Everything in Starter',
      'GEO optimization for AI search',
      'Content strategy & implementation',
      '2–3 focus locations',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Authority',
    subtitle: 'Citywide Authority',
    price: 'Custom',
    period: '',
    description: 'For brands expanding across multiple neighborhoods or cities.',
    features: [
      'Everything in Growth',
      'Multi-location strategy',
      'Advanced reporting & call tracking',
      'Priority support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

function PricingCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        rotateX: -2, 
        rotateY: index === 0 ? 3 : index === 2 ? -3 : 0, 
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300 }
      }}
      className={`relative glass-card p-8 rounded-2xl ${
        plan.popular ? 'ring-2 ring-accent shadow-lg' : 'shadow-soft'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-accent text-accent-foreground text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="text-sm font-medium text-muted-foreground">{plan.name}</div>
        <div className="font-serif text-xl text-foreground">{plan.subtitle}</div>
      </div>

      <div className="mb-6">
        <span className="font-serif text-4xl text-foreground">{plan.price}</span>
        <span className="text-muted-foreground">{plan.period}</span>
      </div>

      <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
            <Check className="w-4 h-4 text-chart-up mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`block text-center py-3 rounded-full font-medium transition-all ${
          plan.popular
            ? 'bg-primary text-primary-foreground hover:shadow-lg'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        {plan.cta}
      </a>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Pricing</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Simple plans
            <br />
            <span className="text-muted-foreground">for serious work</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
