import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, School, BookOpen, Award } from 'lucide-react';

const educationData = [
  {
    degree: 'B.Tech in Computer Science (Data Science)',
    institution: 'G. Pulla Reddy Engineering College, Kurnool',
    duration: '2023 — 2027',
    details: 'CGPA: 7.5/10 | Focus: AI/ML, Data Science, Full-Stack Development',
    icon: GraduationCap,
    highlight: 'Pursuing',
  },
  {
    degree: 'Intermediate (MPC)',
    institution: 'Narayana Junior College, Pulivendula',
    duration: '2021 — 2023',
    details: 'Mathematics, Physics, Chemistry | Score: 948/1000',
    icon: BookOpen,
    highlight: '94.8%',
  },
  {
    degree: 'Secondary School (1st to 10th)',
    institution: 'Raviteja Concept High School',
    duration: '— 2021',
    details: '10/10 GPA | 586/600 Marks | Perfect Score',
    icon: School,
    highlight: 'Perfect 10 GPA',
  },
];

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
};

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-24 md:py-32 bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">04. Education</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Education & <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and continuous learning path
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-dark-border md:-translate-x-px" />

          {/* Education Items */}
          <div className="space-y-12">
            {educationData.map((item, index) => (
              <motion.div
                key={item.degree}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-dark-light md:-translate-x-1/2 translate-y-6 z-10">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                </div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="group p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-primary transition-all duration-300 hover:-translate-y-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <item.icon size={24} />
                      </div>
                      {item.highlight && (
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          {item.highlight}
                        </span>
                      )}
                    </div>

                    {/* Degree */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {item.degree}
                    </h3>

                    {/* Institution */}
                    <p className="text-muted-foreground mb-2">
                      {item.institution}
                    </p>

                    {/* Duration */}
                    <p className="text-sm text-primary font-mono mb-3">
                      {item.duration}
                    </p>

                    {/* Details */}
                    <p className="text-sm text-muted-foreground">
                      {item.details}
                    </p>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-dark-card border border-dark-border">
            <Award className="text-primary" size={28} />
            <div className="text-left">
              <div className="text-white font-semibold">Academic Excellence</div>
              <div className="text-sm text-muted-foreground">Consistently maintained top performance</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
