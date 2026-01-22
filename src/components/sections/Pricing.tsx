import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
const plans = [{
  name: 'GEO Labs Basic',
  price: 'Free',
  priceAnnual: 'Free',
  description: 'For solo use with light needs.',
  features: ['Unlimited projects', 'Unlimited clients', 'Time tracking', 'CRM', 'iOS & Android app'],
  cta: 'Try GEO Labs free',
  popular: false
}, {
  name: 'GEO Labs Premium',
  price: '$189',
  priceAnnual: '$87',
  description: 'For pro use with advanced needs.',
  features: ['Everything in Basic', 'Invoices & payments', 'Expense tracking', 'Income tracking', 'Scheduling'],
  cta: 'Get started',
  popular: true,
  discount: 'Save 20%'
}, {
  name: 'GEO Labs Enterprise',
  price: 'Flexible',
  priceAnnual: 'Flexible',
  description: 'For team use with custom needs.',
  features: ['Everything in Premium', 'Custom data import', 'Advanced onboarding', 'Hubspot integration', 'Timesheets'],
  cta: 'Contact sales',
  popular: false
}];
export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  return <section id="pricing" className="py-24 bg-background">
      <div className="section-container">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-6">
          <span className="eyebrow">Pricing</span>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-2">
            Simple plans
          </h2>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground leading-tight">
            for serious growth
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => <motion.div key={plan.name} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: i * 0.1
        }} whileHover={{
          scale: 1.02,
          y: -5
        }} className={`glass-card p-8 rounded-2xl relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.discount && <div className="absolute -top-3 right-6">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {plan.discount}
                  </span>
                </div>}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-semibold text-foreground">
                    {isAnnual ? plan.priceAnnual : plan.price}
                  </span>
                  {plan.price !== 'Free' && plan.price !== 'Flexible' && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {feature}
                  </li>)}
              </ul>

              <AnimatedButton href="#contact" variant={plan.popular ? "primary" : "secondary"} className="w-full text-center">
                {plan.cta}
              </AnimatedButton>
            </motion.div>)}
        </div>

        {/* Toggle */}
        
      </div>
    </section>;
}