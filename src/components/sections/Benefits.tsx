import { motion } from 'framer-motion';
import customizationFeature from '@/assets/customization-feature.svg';
import googleMapsLogo from '@/assets/google-maps-logo.png';
import youtubeLogo from '@/assets/youtube-logo.jpg';
import chatgptLogo from '@/assets/chatgpt-logo.png';
import copilotLogo from '@/assets/copilot-logo.jpg';

const integrationLogos = [{
  name: 'Google Maps',
  logo: googleMapsLogo
}, {
  name: 'YouTube',
  logo: youtubeLogo
}, {
  name: 'ChatGPT',
  logo: chatgptLogo
}, {
  name: 'Copilot',
  logo: copilotLogo
}];

const features = [{
  title: 'Visibility that compounds',
  description: 'Keep every conversation in sync use comments, messages, and project chats to stay on the same page.'
}, {
  title: 'Speaks your language',
  description: 'Set your language, currency, time, and date preferences for a seamless experience that feels truly local.'
}, {
  title: 'View things your way',
  description: 'Easily toggle between various views, including Kanban, cards, list, table, timeline, and calendar.'
}];

export function Benefits() {
  return <section id="benefits" className="py-24 bg-secondary/30">
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
          <span className="eyebrow">Features</span>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-2">
            Built for businesses that understand customers can't buy what they can't find
          </h2>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground leading-tight mb-6">
            powered by simplicity
          </h2>
          <p className="text-lg text-muted-foreground">
            Smart, flexible, and built around your business workflow
          </p>
        </motion.div>

        {/* Feature Cards Grid - Dreelio style */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Customization Card */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} whileHover={{
          scale: 1.02,
          rotateY: 2
        }} className="glass-card p-8 rounded-2xl">
            <img src={customizationFeature} alt="Customization options" className="mb-6 h-16" />
            <p className="text-foreground">
              <strong>Custom because cookie-cutter doesn't work.</strong> Your industry is different. Your competitors are specific. Your customers search differently. We build strategy around your actual situation, not a recycled framework

            </p>
          </motion.div>

          {/* Integrations Card */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1
        }} whileHover={{
          scale: 1.02,
          rotateY: -2
        }} className="glass-card p-8 rounded-2xl">
            <p className="text-sm mb-4 text-secondary-foreground">Works with what you already have
          </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {integrationLogos.map((logo, i) => <div key={i} className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  <img src={logo.logo} alt={logo.name} className="w-10 h-10 object-contain" />
                </div>)}
            </div>
            <p className="text-foreground">Real integrations with real tools, your analytics, your business listings, your content systems. We plug into what you use instead of forcing you into ours.<strong>Real integrations with real tools
            </strong> Your analytics, your business listings, your content systems. We plug into what you use instead of forcing you into ours.

            </p>
          </motion.div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => <motion.div key={feature.title} initial={{
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
        }} className="glass-card p-6 rounded-2xl">
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}
