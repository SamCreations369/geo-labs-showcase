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
  description: 'We don\'t chase algorithm hacks or short-term ranking wins. We build search presence that compounds over time through quality content and technical optimization. Rankings that stick after updates, authority that grows, visibility that lasts.'
}, {
  title: 'Transparency',
  description: 'You\'ll always know what we\'re doing, why we\'re implementing specific optimizations, and how your rankings are performing. Clear monthly reporting, regular strategy updates, and honest conversations about what\'s working and what needs adjustment.'
}, {
  title: 'Custom SEO Strategy',
  description: 'No templates. No cookie-cutter SEO approaches. Every technical audit, optimization plan, and content strategy is built around your business goals, your industry, and your specific competitive landscape in the LA market.'
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
            
            <div className="bg-white rounded-xl p-4 mb-6 inline-block">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#5C4033] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-400"></div>
                <div className="w-8 h-8 rounded-full bg-green-400"></div>
                <div className="w-8 h-8 rounded-full bg-cyan-400"></div>
                <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                <div className="w-6 h-6 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border border-muted-foreground"></div>
                </div>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-5 bg-green-500 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-sm text-foreground">Hide branding</span>
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
        }} className="glass-card p-6 rounded-2xl transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}