import { motion } from 'framer-motion';
import testimonialFeatured from '@/assets/testimonial-featured.png';
import hvacLogo from '@/assets/hvac-logo.png';
import testimonial2 from '@/assets/testimonial-2.jpg';
import mobileDetailLogo from '@/assets/mobile-detail-logo.png';
const testimonials = [{
  name: 'Brandon Routh',
  role: 'HVAC Company Director',
  title: 'Absolutely worth it!',
  quote: "No sugar-coating, just results. They explained exactly why we weren't ranking and what it would take to fix it. Six months later, we're finally getting the business traffic we needed.",
  image: hvacLogo
}, {
  name: 'Juan Hernandez',
  role: 'Clothing Brand Owner',
  title: 'Huge lessons learned',
  quote: 'They identified our biggest visibility gaps, fixed them, and taught us how to keep them fixed. Would definitely recommend',
  image: testimonial2
}, {
  name: 'Bill Williams',
  role: 'Mobile Detail Owner',
  title: 'Real help for small businesses',
  quote: "Honest feedback we actually needed. Our content was mediocre and our local SEO was a mess. They helped fix both, and now we rank where we should have been all along. Profits have increased and I've had more calls consistently ever since.",
  image: mobileDetailLogo
}];
export function Testimonials() {
  return <section className="py-24 bg-background overflow-hidden">
      <div className="section-container">
        {/* Featured Testimonial - Dreelio style */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="glass-card rounded-3xl p-8 md:p-12 mb-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
              "Eudaimonia is by far the best local SEO partner we have ever worked with."
            </p>
            <div>
              <div className="font-semibold text-foreground">Martha P.</div>
              <div className="text-sm text-muted-foreground">VP Marketing, Local Business Network</div>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={testimonialFeatured} alt="Featured testimonial" className="w-64 h-80 object-cover rounded-2xl" />
          </div>
        </motion.div>

        {/* Scrolling Testimonials - Dreelio style */}
        <div className="relative overflow-hidden">
          <motion.div className="flex gap-6 animate-marquee" style={{
          width: 'max-content'
        }}>
            {[...testimonials, ...testimonials].map((testimonial, i) => <motion.div key={i} whileHover={{
            scale: 1.02,
            y: -5
          }} className="glass-card p-6 rounded-2xl w-80 h-72 flex-shrink-0 flex flex-col">
                <h4 className="font-semibold text-foreground text-lg mb-2">{testimonial.title}</h4>
                <p className="text-muted-foreground mb-6 flex-1">{testimonial.quote}</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>)}
          </motion.div>
        </div>
      </div>
    </section>;
}