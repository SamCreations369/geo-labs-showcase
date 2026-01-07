import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import blog1 from '@/assets/blog-1.png';
import blog2 from '@/assets/blog-2.png';
import blog3 from '@/assets/blog-3.png';
import blog4 from '@/assets/blog-4.png';
const featuredPost = {
  title: 'What is GEO and Why Local Businesses Can\'t Ignore It',
  excerpt: 'Learn how Generative Engine Optimization is changing the game for local search visibility.',
  category: 'Must Read',
  author: 'GEO Labs Team',
  role: 'Head of Marketing',
  image: blog1,
  featured: true
};
const posts = [{
  title: 'How to Show Up in AI Search Results',
  category: 'Tools',
  image: blog2
}, {
  title: '5 Local SEO Moves for More Calls',
  category: 'Insight',
  image: blog3
}, {
  title: 'Understanding Local Rankings',
  category: 'Management',
  image: blog4
}];
export function Blog() {
  return <section id="blog" className="py-24 bg-secondary/30">
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
          <span className="eyebrow">Blog</span>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
            Ideas to level-up your local search game
          </h2>
        </motion.div>

        {/* Blog Grid - Dreelio style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Featured Post - side by side layout */}
          <motion.a href="#" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} whileHover={{
          scale: 1.01
        }} className="md:col-span-3 glass-card rounded-2xl overflow-hidden group cursor-pointer">
            <div className="grid md:grid-cols-2 h-full">
              {/* Image Left */}
              <div className="relative h-64 md:h-80">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
              </div>
              
              {/* Content Right */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-foreground text-background rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{featuredPost.author}</div>
                      <div className="text-xs text-muted-foreground">{featuredPost.role}</div>
                    </div>
                  </div>
                  <div className="bg-[#C85A3B] rounded-full px-4 py-1.5">
                    <span className="text-xs text-white font-semibold uppercase tracking-wide">Featured</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.a>

          {/* Other Posts */}
          {posts.map((post, i) => <motion.a key={post.title} href="#" initial={{
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
        }} className="glass-card rounded-2xl overflow-hidden group cursor-pointer">
              <div className="relative h-40">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs text-muted-foreground">{post.category}</span>
              </div>
            </motion.a>)}
        </div>
      </div>
    </section>;
}