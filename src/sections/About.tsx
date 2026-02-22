import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Award, BookOpen, Code2, Trophy, Cpu, Server, Globe } from 'lucide-react';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { icon: Code2, value: 15, suffix: '+', label: 'Projects Built' },
  { icon: Award, value: 7.5, suffix: '', label: 'CGPA' },
  { icon: BookOpen, value: 5, suffix: '+', label: 'Technologies' },
  { icon: Trophy, value: 100, suffix: '%', label: 'Commitment' },
];

const expertiseAreas = [
  { icon: Cpu, title: 'AI Systems', desc: 'Real deployments, not tutorials' },
  { icon: Server, title: 'Backend Engineering', desc: 'FastAPI, infrastructure, performance' },
  { icon: Globe, title: 'Frontend Craft', desc: 'Clean, responsive, quality-focused' },
];

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Expertise Areas - Quick Scan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
        >
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <area.icon size={24} />
              </div>
              <div>
                <div className="text-white font-semibold">{area.title}</div>
                <div className="text-sm text-muted-foreground">{area.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Text Content */}
          <div>
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-primary font-mono text-sm">01. About Me</span>
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8"
            >
              Building <span className="text-gradient">real AI systems</span> that scale
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-white/90 text-lg">
                I have hands-on experience working with AI applications powered by pre-trained open-source LLMs.
                I design robust FastAPI backends and responsive frontends for intelligent, assistant-style systems. My work focuses on performance, 
                reliability, and creating practical AI tools that solve real-world problems.
              </p>
              
              <p>
                My work emphasizes <span className="text-white font-medium">performance, clarity, and reliability</span>. 
I enjoy solving non-trivial problems — optimizing inference workflows, managing model loading strategies, 
designing AI-powered tools for practical use, and building developer-friendly systems that are easy to extend and maintain.
              </p>
              
              <p>
                I'm interested in <span className="text-white font-medium">AI-driven products</span>, and working on research-to-production workflows. I enjoy transforming ideas and models into practical systems that deliver real value. My focus is on creating tools that are genuinely useful in education, organizations, 
                and everyday work — not just experiments, but solutions that scale and make an impact.
              </p>

              <p>
                Currently pursuing B.Tech in Computer Science (Data Science) at G. Pulla Reddy Engineering College, 
                Kurnool with a <span className="text-white font-medium">7.5 CGPA</span>. My academic journey started with 
                a perfect <span className="text-white font-medium">10/10 GPA</span> in 10th grade and <span className="text-white font-medium">948/1000</span> in Intermediate.
              </p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <stat.icon size={24} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value % 1 === 0 ? (
                    <Counter end={stat.value} suffix={stat.suffix} />
                  ) : (
                    <>{stat.value}{stat.suffix}</>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
