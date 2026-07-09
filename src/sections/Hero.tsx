import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { animate, createAnimatable, createScope, splitText, stagger } from 'animejs';
import { ArrowRight, MapPin, Github, Linkedin, Cpu, Server, Zap } from 'lucide-react';

type Scope = ReturnType<typeof createScope>;

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
    },
  },
};

const valueProps = [
  { icon: Cpu, text: 'Real AI Systems' },
  { icon: Server, text: 'Engineering Depth' },
  { icon: Zap, text: 'Performance First' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scopeRef = useRef<Scope | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    let handlePointerMove: ((e: PointerEvent) => void) | null = null;

    scopeRef.current = createScope({ root }).add(() => {
      // splitText() keeps each word as an atomic wrapper so lines never
      // break mid-word, while still exposing chars for a per-letter stagger.
      const plain = splitText('.hero-name-plain', { chars: true });
      const gradient = splitText('.hero-name-gradient', { chars: true });
      gradient.chars.forEach((el) => {
        el.classList.add(
          'bg-clip-text',
          'text-transparent',
          'bg-gradient-to-r',
          'from-primary',
          'to-secondary'
        );
      });
      const allChars = [...plain.chars, ...gradient.chars];
      allChars.forEach((el) => {
        (el as HTMLElement).style.opacity = '0';
      });

      animate(allChars, {
        opacity: [0, 1],
        translateY: [26, 0],
        rotateX: [-70, 0],
        duration: 900,
        delay: stagger(28, { start: 300 }),
        ease: 'out(4)',
      });

      // Cursor-reactive floating orbs
      const orbA = createAnimatable('.hero-orb-a', { x: 600, y: 600, ease: 'out(3)' });
      const orbB = createAnimatable('.hero-orb-b', { x: 600, y: 600, ease: 'out(3)' });

      handlePointerMove = (e: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        orbA.x(relX * 60);
        orbA.y(relY * 60);
        orbB.x(relX * -40);
        orbB.y(relY * -40);
      };

      root.addEventListener('pointermove', handlePointerMove);
    });

    return () => {
      if (handlePointerMove) root.removeEventListener('pointermove', handlePointerMove);
      scopeRef.current?.revert();
    };
  }, []);

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/70 to-dark" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hero-orb-a absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hero-orb-b absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Value Props - Quick Scan */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {valueProps.map((prop, index) => (
                <motion.div
                  key={prop.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
                >
                  <prop.icon size={16} className="text-primary" />
                  <span className="text-sm font-medium text-white">{prop.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Location Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-dark-border text-sm text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              Kurnool, Andhra Pradesh, India
            </span>
          </motion.div>

          {/* Name — Anime.js splitText() reveal, word-safe wrapping */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4">
            <span className="hero-name-plain">Gajjala </span>
            <span className="hero-name-gradient">Ashok Kumar Reddy</span>
          </h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl text-secondary font-medium mb-6"
          >
            AI Engineer & Full-Stack Developer
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed mb-10"
          >
            I build production-ready AI applications powered by pre-trained open-source LLMs. I design robust FastAPI backends and responsive frontends for intelligent, assistant-style systems. My work focuses on performance, reliability, and creating practical AI tools that solve real-world problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.a
              href="https://ashok75-gakr.hf.space"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-glow hover:shadow-glow-lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Try GAKR AI
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.button
              onClick={() => handleScroll('#projects')}
              className="flex items-center gap-2 px-8 py-4 bg-transparent text-white font-medium rounded-xl border border-dark-border hover:border-primary transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
            <motion.a
              href="https://github.com/gajjalaashok75-UI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Github size={22} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/gajjala-ashok-kumar-reddy-747510353"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-dark-border flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
