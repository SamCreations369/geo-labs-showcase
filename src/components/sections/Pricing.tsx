import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
const seoPlans = [{
  name: 'Starter Audit',
  price: '$50',
  description: 'Get clarity before you commit to anything.',
  features: ['Full technical audit', 'GEO audit', 'Competitive visibility review', 'Action plan'],
  cta: 'Get your audit',
  popular: false
}, {
  name: 'Growth Optimization',
  price: 'Custom',
  description: 'Strengthen your foundation so everything else works better.',
  features: ['On-page optimization', 'Local SEO improvements', 'GEO optimization'],
  cta: 'Get started',
  popular: true
}, {
  name: 'Visibility Expansion Retainer',
  price: 'Flexible',
  description: 'Ongoing strategy for sustained growth.',
  features: ['Ongoing content creation', 'Strategic funnel expansion', 'Monthly performance reporting', 'Continuous optimization'],
  cta: 'Contact us',
  popular: false
}];

const webPlans = [{
  name: 'Premium Website',
  price: '$899',
  description: 'A professionally built website for your business.',
  features: ['Custom design & development', 'Mobile-responsive layout', 'SEO-ready foundation', 'Contact forms & integrations'],
  cta: 'Get started',
  popular: false
}, {
  name: 'Full Ownership Package',
  price: '$1,999',
  description: 'Your website, fully yours — code, hosting, everything.',
  features: ['Everything in Premium', 'Full source code ownership', 'Domain & hosting transfer', 'No ongoing obligations'],
  cta: 'Get started',
  popular: true
}, {
  name: 'Maintenance & Enhancement',
  price: '$99',
  priceLabel: '/mo',
  description: 'Keep your site updated, secure, and improving.',
  features: ['Monthly updates & fixes', 'Security monitoring', 'Performance optimization', 'Content updates & enhancements'],
  cta: 'Subscribe',
  popular: false
}];
export function Pricing() {
  const [activeTab, setActiveTab] = useState<'seo' | 'web'>('seo');
  const plans = activeTab === 'seo' ? seoPlans : webPlans;

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
      }} className="text-center mb-8 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-2">
            Simple plans
          </h2>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground leading-tight">
            for serious growth
          </h2>
        </motion.div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-1 p-1 bg-secondary rounded-full">
            <button
              onClick={() => setActiveTab('seo')}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${activeTab === 'seo' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              SEO & GEO
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${activeTab === 'web' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Web Creation
            </button>
          </div>
        </div>

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
        }} className={`glass-card p-8 rounded-2xl relative flex flex-col h-full ${plan.popular ? 'ring-2 ring-primary' : ''}`}>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-semibold text-foreground">
                    {plan.price}
                  </span>
                  {'priceLabel' in plan && (plan as any).priceLabel && <span className="text-muted-foreground">{(plan as any).priceLabel}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map(feature => <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {feature}
                  </li>)}
              </ul>

              <AnimatedButton 
                href="#contact" 
                variant={plan.popular ? "primary" : "secondary"}
                className="w-full text-center mt-auto"
              >
                {plan.cta}
              </AnimatedButton>
            </motion.div>)}
        </div>

      </div>
    </section>;
}