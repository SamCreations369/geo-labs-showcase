import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
const navLinks = [{
  name: 'Features',
  href: '#features'
}, {
  name: 'Benefits',
  href: '#benefits'
}, {
  name: 'Pricing',
  href: '#pricing'
}, {
  name: 'Blog',
  href: '#blog'
}, {
  name: 'Contact Us',
  href: '#contact'
}];
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [8, 16]);
  
  return <motion.nav initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.4
  }} className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="section-container">
        <motion.div 
          style={{ 
            backgroundColor: useTransform(backgroundOpacity, (v) => `hsl(0 0% 100% / ${v})`),
            backdropFilter: useTransform(blur, (v) => `blur(${v}px)`)
          }}
          className="flex items-center justify-between h-14 rounded-full px-6 shadow-lg border border-white/20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {/* Left face - darker */}
              <path d="M12 3L2 21L12 16Z" fill="#B8860B" />
              {/* Right face - medium */}
              <path d="M12 3L22 21L12 16Z" fill="#DAA520" />
              {/* Bottom face - lightest */}
              <path d="M2 21L22 21L12 16Z" fill="#FFD700" />
            </svg>
            Eudaimonia
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <a key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.name}
              </a>)}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="#contact" className="btn-primary text-sm">
              Get Your Visibility Audit
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-secondary">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-background border-t border-border">
            <div className="section-container py-4 space-y-4">
              {navLinks.map(link => <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block py-2 text-foreground">
                  {link.name}
                </a>)}
              <a href="#contact" className="btn-primary text-sm w-full text-center">
                Get a FREE GEO Audit
              </a>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
}