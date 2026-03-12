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
  author: 'Eudaimonia Team',
  role: 'Head of Marketing',
  image: blog1,
  featured: true,
};

const posts = [
  {
    title: 'How to Show Up in AI Search Results',
    category: 'Tools',
    image: blog2,
  },
  {
    title: '5 Local SEO Moves for More Calls',
    category: 'Insight',
    image: blog3,
  },
  {
    title: 'Understanding Local Rankings',
    category: 'Management',
    image: blog4,
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="eyebrow">Blog</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
            Ideas to level-up your local search game
          </h2>
        </motion.div>

        {/* Blog Grid */}
        <div className="space-y-6">
          {/* Featured Post - full width on top */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            className="block glass-card rounded-2xl overflow-hidden group cursor-pointer"
          >
            <div className="relative h-64 md:h-80">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-medium mb-3">
                  {featuredPost.category}
                </span>
                <h3 className="text-xl font-semibold mb-2 group-hover:underline">
                  {featuredPost.title}
                </h3>
                <p className="text-sm text-white/80 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-3">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L2 21L12 16Z" fill="#B8860B" />
                    <path d="M12 3L22 21L12 16Z" fill="#DAA520" />
                    <path d="M2 21L22 21L12 16Z" fill="#FFD700" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium">{featuredPost.author}</div>
                    <div className="text-xs text-white/60">{featuredPost.role}</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-white font-medium px-2">Featured</span>
              </div>
            </div>
          </motion.a>

          {/* Other Posts - 3 columns side by side */}
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.a
                key={post.title}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
              >
              <div className="relative h-40">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs text-muted-foreground">{post.category}</span>
              </div>
            </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
