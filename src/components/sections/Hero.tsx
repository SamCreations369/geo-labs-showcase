import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, TrendingUp, MapPin, Bot, BarChart3 } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen pt-24 pb-16 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(200 60% 94%) 0%, hsl(40 30% 98%) 50%, hsl(40 30% 98%) 100%)',
      }}
    >
      {/* Cloud decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
          className="absolute top-20 left-10 w-64 h-32 bg-white/60 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
          className="absolute top-40 right-20 w-96 h-48 bg-white/50 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 30]) }}
          className="absolute top-10 right-1/3 w-48 h-24 bg-white/70 rounded-full blur-2xl"
        />
      </div>

      <motion.div style={{ opacity, scale }} className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1] mb-6">
              Get found first in AI and local search.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              GEO Labs helps local businesses in Los Angeles dominate Google, Maps, and generative AI results so more customers find you, call you, and walk through your doors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="btn-primary group">
                Get a FREE GEO Audit
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#features" className="btn-secondary">
                See How It Works
              </a>
            </div>
          </motion.div>

          {/* Right - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ y }}
            className="relative perspective-1000"
          >
            <div className="relative">
              {/* Main Dashboard Card */}
              <motion.div
                whileHover={{ rotateY: -2, rotateX: 2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-card p-6 rounded-3xl shadow-card"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-semibold text-foreground">GEO Labs</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="chip text-xs">Google</div>
                    <div className="chip text-xs">Maps</div>
                    <div className="chip text-xs">AI Results</div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <TrendingUp className="w-3 h-3" />
                      Visibility Score
                    </div>
                    <div className="text-2xl font-bold text-foreground">87%</div>
                    <div className="text-xs text-chart-up font-medium">+24%</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <MapPin className="w-3 h-3" />
                      Map Views
                    </div>
                    <div className="text-2xl font-bold text-foreground">2.4K</div>
                    <div className="text-xs text-chart-up font-medium">+18%</div>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Bot className="w-3 h-3" />
                      AI Mentions
                    </div>
                    <div className="text-2xl font-bold text-foreground">156</div>
                    <div className="text-xs text-chart-up font-medium">+42%</div>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-secondary/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-foreground">Search Performance</span>
                    <span className="text-xs text-muted-foreground">Last 30 days</span>
                  </div>
                  <div className="h-32 flex items-end gap-1">
                    {[40, 45, 35, 55, 60, 50, 70, 65, 75, 80, 70, 85, 90, 88, 95].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                        className="flex-1 bg-accent/80 rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating Mini Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 top-1/4 glass-card p-4 rounded-xl shadow-lg animate-float"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-chart-up/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-chart-up" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Calls Today</div>
                    <div className="text-lg font-bold text-foreground">+12</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
