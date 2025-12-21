import { motion } from 'framer-motion';
import testimonialFeatured from '@/assets/testimonial-featured.png';
import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';
import testimonial4 from '@/assets/testimonial-4.jpg';
const testimonials = [{
  name: 'Alex R.',
  role: 'Owner, Neighborhood Café',
  quote: 'Our calls from Google and Maps almost doubled within a few months. We\'re finally showing up above chains we could never beat before.',
  image: testimonial1
}, {
  name: 'Monica T.',
  role: 'Founder, Med Spa in LA',
  quote: 'GEO Labs helped us show up in AI-powered search results and local searches. We\'re seeing more booked consultations every week.',
  image: testimonial2
}, {
  name: 'David P.',
  role: 'Home Services Business Owner',
  quote: 'We went from invisible to fully booked weekends. It felt like flipping a switch on our online presence.',
  image: testimonial3
}, {
  name: 'Sarah K.',
  role: 'Owner, Fitness Studio',
  quote: 'Managing our online presence used to mean spreadsheets and missed opportunities. GEO Labs keeps everything tight and our clients impressed.',
  image: testimonial4
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
          }} className="glass-card p-6 rounded-2xl w-80 flex-shrink-0">
                <p className="text-foreground mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
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