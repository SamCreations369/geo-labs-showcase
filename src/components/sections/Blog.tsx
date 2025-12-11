import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const posts = [
  {
    title: 'What is GEO and Why Local Businesses Can\'t Ignore It',
    excerpt: 'Learn how Generative Engine Optimization is changing the game for local search visibility.',
    category: 'Must Read',
    readTime: '5 min',
  },
  {
    title: 'How to Show Up in AI Search Results Before Your Competitors',
    excerpt: 'Practical strategies to get your business mentioned by ChatGPT, Gemini, and other AI tools.',
    category: 'Strategy',
    readTime: '7 min',
  },
  {
    title: '5 Local SEO Moves to Get More Calls This Month',
    excerpt: 'Quick wins you can implement today to boost your Google Business Profile and local rankings.',
    category: 'Tactics',
    readTime: '4 min',
  },
];

function BlogCard({ post, index }: { post: typeof posts[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        rotateX: -2, 
        rotateY: index === 0 ? 2 : index === 2 ? -2 : 0, 
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300 }
      }}
      className="group glass-card rounded-2xl overflow-hidden shadow-soft cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Thumbnail placeholder */}
      <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-card/80 backdrop-blur flex items-center justify-center">
            <span className="font-serif text-2xl text-accent">GEO</span>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="chip text-xs">{post.category}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Clock className="w-3 h-3" />
          {post.readTime} read
        </div>
        <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
        <span className="inline-flex items-center text-sm font-medium text-accent group-hover:gap-2 transition-all">
          Read article <ArrowRight className="w-4 h-4 ml-1" />
        </span>
      </div>
    </motion.article>
  );
}

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="eyebrow">Blog</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight">
            GEO & SEO Insights
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
