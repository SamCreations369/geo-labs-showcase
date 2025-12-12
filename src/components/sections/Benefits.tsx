import { motion } from 'framer-motion';
import customizationFeature from '@/assets/customization-feature.svg';

const integrationLogos = [
  { name: 'Google', bg: 'bg-red-100' },
  { name: 'Maps', bg: 'bg-green-100' },
  { name: 'ChatGPT', bg: 'bg-emerald-100' },
  { name: 'Gemini', bg: 'bg-blue-100' },
  { name: 'Bing', bg: 'bg-cyan-100' },
  { name: 'Yelp', bg: 'bg-red-100' },
];

const features = [
  {
    title: 'Collaborate in realtime',
    description: 'Keep every conversation in sync — use comments, messages, and project chats to stay on the same page.',
  },
  {
    title: 'Speaks your language',
    description: 'Set your language, currency, time, and date preferences for a seamless experience that feels truly local.',
  },
  {
    title: 'View things your way',
    description: 'Easily toggle between various views, including Kanban, cards, list, table, timeline, and calendar.',
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <span className="eyebrow">Features</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-2">
            Built for local businesses,
          </h2>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground leading-tight mb-6">
            powered by simplicity
          </h2>
          <p className="text-lg text-muted-foreground">
            Smart, flexible, and built around your business workflow
          </p>
        </motion.div>

        {/* Feature Cards Grid - Dreelio style with glass borders */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Customization Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card p-8"
          >
            <img src={customizationFeature} alt="Customization options" className="mb-6 h-16" />
            <p className="text-foreground leading-relaxed">
              <strong>Personalize every detail.</strong> From branding and interface layout to colors and menus, so GEO Labs feels like an extension of your brand.
            </p>
          </motion.div>

          {/* Integrations Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass-card p-8"
          >
            <p className="text-sm text-muted-foreground mb-4">Integrates seamlessly with the platforms you need</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {integrationLogos.map((logo, i) => (
                <motion.div
                  key={i}
                  className={`w-12 h-12 rounded-xl ${logo.bg} flex items-center justify-center text-xs font-medium text-foreground/70`}
                  whileHover={{ scale: 1.1 }}
                >
                  {logo.name.slice(0, 2)}
                </motion.div>
              ))}
            </div>
            <p className="text-foreground leading-relaxed">
              <strong>Seamless integrations.</strong> Plug GEO Labs into Google, Maps, and AI platforms. Set up automations and make your systems work smarter together.
            </p>
          </motion.div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6"
            >
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
