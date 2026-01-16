import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Building2, Globe, MapPin, Mail } from 'lucide-react';
import { useState, useRef } from 'react';
import { z } from 'zod';

const contactSchema = z.object({
  businessName: z.string().trim().min(1, 'Business name is required').max(100, 'Business name must be less than 100 characters'),
  website: z.string().trim().url('Please enter a valid URL').max(255, 'URL must be less than 255 characters').or(z.literal('')),
  city: z.string().trim().min(1, 'City is required').max(100, 'City must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end']
  });

  // Cloud parallax transforms for bottom section
  const cloud1Y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const cloud3Y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const cloud4Y = useTransform(scrollYProgress, [0, 1], [120, 0]);

  const [formData, setFormData] = useState<ContactFormData>({
    businessName: '',
    website: '',
    city: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate submission - replace with actual API call when backend is added
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ businessName: '', website: '', city: '', email: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 500);
  };

  return (
    <section ref={ref} id="contact" className="relative py-24 sky-gradient-bottom overflow-hidden">
      {/* Animated Cloud decorations with parallax - at bottom */}
      <motion.div 
        className="cloud cloud-large cloud-animate-1"
        style={{ bottom: 40, left: '-5%', y: cloud1Y }}
      />
      <motion.div 
        className="cloud cloud-large cloud-animate-2"
        style={{ bottom: 60, right: '-5%', y: cloud2Y }}
      />
      <motion.div 
        className="cloud cloud-medium cloud-animate-3"
        style={{ bottom: 20, left: '25%', y: cloud3Y }}
      />
      <motion.div 
        className="cloud cloud-medium cloud-animate-1"
        style={{ bottom: 100, right: '20%', y: cloud4Y }}
      />
      <motion.div 
        className="cloud cloud-small cloud-animate-2"
        style={{ bottom: 150, left: '45%', y: cloud3Y }}
      />
      <motion.div 
        className="cloud cloud-small cloud-animate-3"
        style={{ bottom: 80, left: '60%', y: cloud1Y }}
      />
      <motion.div 
        className="cloud cloud-medium cloud-animate-1"
        style={{ bottom: 30, left: '70%', y: cloud2Y }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Get started</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
            Ready to show up first
            <br />
            <span className="text-muted-foreground">where it counts?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tell us about your business and we'll schedule a GEO + SEO visibility audit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl shadow-card">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Business Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border ${errors.businessName ? 'border-destructive' : 'border-border'} focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground`}
                    placeholder="Your Business Name"
                    maxLength={100}
                  />
                </div>
                {errors.businessName && <p className="text-sm text-destructive mt-1">{errors.businessName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border ${errors.website ? 'border-destructive' : 'border-border'} focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground`}
                    placeholder="https://yourbusiness.com"
                    maxLength={255}
                  />
                </div>
                {errors.website && <p className="text-sm text-destructive mt-1">{errors.website}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  City / Neighborhood
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border ${errors.city ? 'border-destructive' : 'border-border'} focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground`}
                    placeholder="e.g., Beverly Hills, LA"
                    maxLength={100}
                  />
                </div>
                {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border ${errors.email ? 'border-destructive' : 'border-border'} focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground`}
                    placeholder="you@email.com"
                    maxLength={255}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="group w-full inline-flex items-center justify-center px-7 py-4 rounded-full font-medium text-base transition-all duration-200 overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
              >
                <span className="relative inline-flex items-center overflow-hidden h-[1.5em]">
                  <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full flex items-center">
                    {isSubmitting ? 'Submitting...' : submitSuccess ? 'Thank you!' : 'Get Your Visibility Audit'}
                    {!isSubmitting && !submitSuccess && <Send className="ml-2 w-4 h-4" />}
                  </span>
                  <span 
                    className="absolute top-full transition-transform duration-300 ease-out group-hover:-translate-y-full flex items-center" 
                    aria-hidden="true"
                  >
                    {isSubmitting ? 'Submitting...' : submitSuccess ? 'Thank you!' : 'Get Your Visibility Audit'}
                    {!isSubmitting && !submitSuccess && <Send className="ml-2 w-4 h-4" />}
                  </span>
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}