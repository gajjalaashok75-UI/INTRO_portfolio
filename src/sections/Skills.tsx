import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  Terminal, 
  Layers,
  GitBranch,
  Box
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: ['Python', 'Java', 'HTML/CSS', 'JavaScript ','SQL', 'Bash', 'C'],
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'AI & Data Science',
    icon: Cpu,
    skills: ['Machine Learning', 'Data Analysis (NumPy, Pandas)', 'Model Integration & Inference', 'Hugging Face Transformers'],
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    title: 'Tools & Platforms',
    icon: Terminal,
    skills: ['Git & GitHub', 'VS Code', 'Jupyter Notebook', 'Docker (Basic)', 'Hugging Face Hub','Kaggle', 'Google Colab'],
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'Web Development',
    icon: Globe,
    skills: ['Frontend (HTML, CSS, JavaScript)', 'Responsive Design', 'REST APIs Integration', 'Flask', 'FastAPI', 'Basic React'],
    color: 'from-green-500/20 to-emerald-500/20',
  },
];

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">02. Skills</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="group relative p-6 md:p-8 rounded-2xl bg-dark-card border border-dark-border hover:border-primary transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <category.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-lg bg-white/5 text-sm text-muted-foreground border border-dark-border group-hover:border-primary/30 group-hover:text-white transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: GitBranch, label: 'Version Control', value: 'Git' },
            { icon: Database, label: 'Data Handling', value: 'Pandas/NumPy' },
            { icon: Layers, label: 'Frameworks', value: 'Flask/Basic' },
            { icon: Box, label: 'Deployment', value: 'Hugging Face' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center p-4"
            >
              <item.icon className="mx-auto mb-2 text-primary" size={24} />
              <div className="text-white font-medium">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
