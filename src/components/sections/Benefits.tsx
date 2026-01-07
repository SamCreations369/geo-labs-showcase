import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import seoAuditIcon from '@/assets/seo-audit-icon.png';
import geoVisibilityIcon from '@/assets/geo-visibility-icon.png';
import googleMapsLogo from '@/assets/google-maps-logo.png';
import youtubeLogo from '@/assets/youtube-logo.jpg';
import chatgptLogo from '@/assets/chatgpt-logo.png';
import copilotLogo from '@/assets/copilot-logo.jpg';

const platformLogos = [{
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
  title: 'Clear Diagnosis',
  description: 'Our audits reveal exactly where you\'re losing visibility and why. No guesswork, just a clear roadmap built on real competitive data.'
}, {
  title: 'Stronger Foundations',
  description: 'We fix the structural issues that keep algorithms from trusting your site, then optimize elements that make search engines choose you.'
}, {
  title: 'Scalable Visibility',
  description: 'Build content strategies that expand your keyword coverage and create momentum that keeps working long after we publish.'
}];

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
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
          <span className="eyebrow">How We Help</span>
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
            Built for today's search landscape: Local SEO, AI optimization, and Google's latest algorithms
          </h2>
          <p className="text-muted-foreground text-lg">
            Your customers find businesses through Google, ChatGPT, Maps, voice assistants, and AI overviews. We make sure you're visible across all of them.
          </p>
        </motion.div>

        {/* Feature Cards Grid - Two column layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Left Card - SEO Audit */}
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
              You can't fix what you can't see. Our SEO audits reveal where you're losing visibility.
            </h3>
            
            <div className="flex justify-center mb-6">
              <img 
                src={seoAuditIcon} 
                alt="SEO Audit" 
                className="w-32 h-32 object-contain rounded-xl"
              />
            </div>

            <p className="text-foreground">
              <strong>Complete visibility diagnosis.</strong> We measure your performance across traditional search, local results, and AI-powered platforms, then show you the specific gaps between where you rank now and where you need to be.
            </p>
          </motion.div>

          {/* Right Card - Geo Visibility */}
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
              Increased visibility where your customers are actually searching
            </h3>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex gap-4">
                {platformLogos.map((logo, i) => (
                  <motion.div 
                    key={i} 
                    style={{ y: parallaxValues[i] }}
                    className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center overflow-hidden"
                  >
                    <img src={logo.logo} alt={logo.name} className="w-12 h-12 object-contain" />
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="text-foreground">
              <strong>Multi-platform optimization.</strong> Get discovered on Google, Bing, ChatGPT, Maps, and AI overviews. We close the visibility gap that's costing you customers every day.
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
