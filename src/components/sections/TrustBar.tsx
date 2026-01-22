import { motion } from 'framer-motion';
import { useState } from 'react';

const trustLogos = ['Google', 'Copilot', 'ChatGPT', 'YouTube', 'Google Maps', 'Google', 'Copilot', 'ChatGPT', 'YouTube', 'Google Maps'];

export function TrustBar() {
  const [isHovered, setIsHovered] = useState(false);
  
  return <section className="py-16 bg-background">
      <motion.div initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} viewport={{
      once: true
    }} className="text-center mb-8">
        <p className="text-sm text-muted-foreground">
          
          Increased visibility where customers are searching 
         
        </p>
      </motion.div>

      <div 
        className="relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex w-max">
          <motion.div 
            className="flex"
            animate={{ x: isHovered ? undefined : [0, -50 * trustLogos.length * 2] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
          >
            {[...trustLogos, ...trustLogos, ...trustLogos, ...trustLogos].map((logo, i) => (
              <div key={i} className="flex-shrink-0 mx-4 px-6 py-3 rounded-full bg-secondary/50 text-muted-foreground text-sm font-medium">
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>;
}