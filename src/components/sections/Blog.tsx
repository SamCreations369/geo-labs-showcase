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

        {/* Blog Grid - 3 equal cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <span className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold text-white ${
                  post.category === 'Tools' ? 'bg-blue-500' :
                  post.category === 'Insight' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}>
                  {post.category.toUpperCase()}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
