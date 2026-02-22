import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  MessageCircle,
  Instagram,
  Youtube,
  ExternalLink
} from 'lucide-react';

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/gajjala-ashok-kumar-reddy-747510353', color: 'hover:text-[#0077B5]' },
  { name: 'GitHub', icon: Github, url: 'https://github.com/239x1a3242-maker', color: 'hover:text-white' },
  { name: 'Hugging Face', icon: ExternalLink, url: 'https://huggingface.co/Ashok75', color: 'hover:text-[#FFD21E]' },
  { name: 'Twitter/X', icon: Twitter, url: 'https://x.com/AGajjala56550', color: 'hover:text-white' },
  { name: 'Telegram', icon: MessageCircle, url: 'https://t.me/Heisenberg7582', color: 'hover:text-[#0088cc]' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/gajjala_ashok_7555', color: 'hover:text-[#E4405F]' },
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@ashokgajjala-j3q', color: 'hover:text-[#FF0000]' },
];

const contactInfo = [
  { icon: Mail, label: 'Personal Email', value: 'gajjalaashok75@gmail.com', href: 'mailto:gajjalaashok75@gmail.com' },
  { icon: Mail, label: 'Work Email', value: '239X1A3242@gprec.ac.in', href: 'mailto:239X1A3242@gprec.ac.in' },
  { icon: Phone, label: 'Phone', value: '+91 8897490597', href: 'tel:+918897490597' },
  { icon: MapPin, label: 'Location', value: 'Kurnool, Andhra Pradesh, India', href: null },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOutExpo,
    },
  },
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">05. Contact</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants} className="text-xl font-semibold text-white mb-6">
              Get in Touch
            </motion.h3>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-8 leading-relaxed">
              Whether you have a question, want to collaborate, or just want to say hi, 
              I'll try my best to get back to you!
            </motion.p>

            {/* Contact Details */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-card border border-dark-border hover:border-primary transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-white">{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 variants={itemVariants} className="text-xl font-semibold text-white mb-6">
              Find Me Online
            </motion.h3>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-8 leading-relaxed">
              Connect with me on social media and explore my work across different platforms
            </motion.p>

            {/* Social Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  variants={itemVariants}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center gap-3 p-5 rounded-xl bg-dark-card border border-dark-border hover:border-primary transition-all duration-300 ${social.color}`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <social.icon size={28} className="text-muted-foreground group-hover:text-current transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-current transition-colors">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Quick Message */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
            >
              <p className="text-white text-center">
                <span className="text-primary font-semibold">Open for opportunities!</span>{' '}
                <span className="text-muted-foreground">
                  Currently looking for internships and collaborative projects in AI/ML and full-stack development.
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
