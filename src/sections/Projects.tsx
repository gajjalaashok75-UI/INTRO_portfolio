import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, ArrowUpRight, Bot, Sparkles } from 'lucide-react';

const projects = [
  {
    title: 'GAKR AI Chatbot',
    description: 'A production-ready AI chatbot built with FastAPI backend and responsive frontend. Features real-time streaming responses, Markdown rendering, code block syntax highlighting, and optimized inference for CPU-only environments. Deployed with llama.cpp and GGUF models.',
    image: '/project-ai.jpg',
    tech: ['FastAPI', 'Python', 'LLM', 'Streaming', 'GGUF', 'llama.cpp'],
    links: {
      demo: 'https://ashok75-gakr.hf.space',
      source: 'https://github.com/239x1a3242-maker',
    },
    featured: true,
    badge: 'Live Project',
  },
  {
    title: 'AI/ML Model Deployments',
    description: 'Machine learning models and AI applications deployed on Hugging Face Spaces. Exploring Qwen, DeepSeek variants, and custom fine-tuned models with optimized inference pipelines.',
    image: '/project-data.jpg',
    tech: ['Python', 'Hugging Face', 'Qwen', 'DeepSeek', 'TensorFlow'],
    links: {
      demo: 'https://huggingface.co/Ashok75',
      source: 'https://github.com/239x1a3242-maker',
    },
    featured: false,
    badge: null,
  },
  {
    title: 'Web Development Projects',
    description: 'Full-stack web applications showcasing frontend and backend skills. Responsive designs with modern UI/UX principles and clean code architecture.',
    image: '/project-web.jpg',
    tech: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask'],
    links: {
      demo: 'https://ashok75-gakr.hf.space',
      source: 'https://github.com/239x1a3242-maker',
    },
    featured: false,
    badge: null,
  },
  {
    title: 'Data Science & Analysis',
    description: 'Data analysis and visualization projects using Python libraries. Extracting insights from complex datasets with performance-optimized pipelines.',
    image: '/project-academic.jpg',
    tech: ['Python', 'Pandas', 'Matplotlib', 'NumPy', 'Seaborn'],
    links: {
      source: 'https://github.com/239x1a3242-maker',
    },
    featured: false,
    badge: null,
  },
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

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">03. Projects</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real systems that scale—not just demos. Production-ready AI applications with performance in mind.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className={`group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-primary transition-all duration-300 ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Badge */}
              {project.badge && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-white text-sm font-medium">
                  <Sparkles size={14} />
                  {project.badge}
                </div>
              )}

              {/* Image */}
              <div className={`relative overflow-hidden ${project.featured ? 'h-64 md:h-80' : 'h-48'}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {project.title === 'GAKR AI Chatbot' && (
                      <Bot size={28} className="text-primary" />
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    {project.links.source && (
                      <motion.a
                        href={project.links.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View Source"
                      >
                        <Github size={18} />
                      </motion.a>
                    )}
                    {project.links.demo && (
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View Demo"
                      >
                        <ExternalLink size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/239x1a3242-maker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 border border-dark-border hover:border-primary transition-all duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects on GitHub
            <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
