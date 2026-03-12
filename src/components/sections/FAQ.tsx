import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What is GEO?',
    answer: 'GEO stands for Generative Engine Optimization — optimizing your presence so AI search tools are more likely to recommend your business. As more people use AI assistants to find local services, GEO ensures your business gets mentioned.',
  },
  {
    question: 'How is this different from normal SEO?',
    answer: 'We combine traditional SEO, local search, and AI-focused strategies so you show up in maps, organic results, and AI-generated answers. It\'s a comprehensive approach that covers all the ways customers search today.',
  },
  {
    question: 'How long until I see results?',
    answer: 'Most local businesses start noticing changes within 4–12 weeks depending on competition, current visibility, and how many locations you\'re targeting. Some quick wins like Google Business Profile optimization can show results even faster.',
  },
  {
    question: 'Do you only work with businesses in LA?',
    answer: 'We\'re based in Los Angeles but can work with businesses in other cities as long as they serve a local area. Our strategies work for any local business looking to dominate their neighborhood.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-border last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="font-serif text-lg text-foreground pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="eyebrow">FAQ</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
