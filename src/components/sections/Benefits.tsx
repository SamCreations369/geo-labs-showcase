import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const sectionRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Create different parallax speeds for each icon
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y4 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const parallaxValues = [y1, y2, y3, y4];
  return <section ref={sectionRef} id="benefits" className="py-24 bg-secondary/30">
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
            Built for businesses that understand customers can't buy what they can't find
          </h2>
        </motion.div>

        {/* Feature Cards Grid - Two column layout matching reference */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Left Card - Customization */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} whileHover={{
          scale: 1.02
        }} className="bg-secondary/50 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Smart, flexible, and built around your business workflow
            </h3>
            
            <div className="bg-white rounded-xl p-4 mb-6 inline-block shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">Layout Settings</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-8">
                  <span className="text-xs text-muted-foreground">Kanban View</span>
                  <div className="w-8 h-4 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-8">
                  <span className="text-xs text-muted-foreground">Timeline</span>
                  <div className="w-8 h-4 bg-muted rounded-full relative">
                    <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-foreground">
              <strong>Personalize every detail,</strong> From branding and interface layout to colors and menus, so your presence feels like an extension of your brand.
            </p>
          </motion.div>

          {/* Right Card - Integrations */}
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
          scale: 1.02
        }} className="bg-secondary/50 p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Integrates seamlessly with the tools you already use
            </h3>
            
            <div className="flex items-center gap-4 mb-6">
              
              <div className="flex gap-4">
                {integrationLogos.map((logo, i) => <motion.div key={i} style={{
                y: parallaxValues[i]
              }} className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden">
                    <img src={logo.logo} alt={logo.name} className="w-12 h-12 object-contain" />
                  </motion.div>)}
              </div>
              
            </div>

            <p className="text-foreground">
              <strong>Seamless integrations.</strong> Plug into the tools you love. Set up automations, sync your data, and make your systems work smarter together.
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