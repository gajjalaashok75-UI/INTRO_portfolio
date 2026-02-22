import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, MessageCircle, Instagram, Youtube, ExternalLink, Heart, ArrowUp } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/239x1a3242-maker', color: 'hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/gajjala-ashok-kumar-reddy-747510353', color: 'hover:text-[#0A66C2] hover:shadow-[0_0_20px_#0A66C2]' },
  { name: 'Twitter/X', icon: Twitter, url: 'https://x.com/AGajjala56550', color: 'hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]' },
  { name: 'Telegram', icon: MessageCircle, url: 'https://t.me/Heisenberg7582', color: 'hover:text-[#0088cc] hover:shadow-[0_0_20px_#0088cc]' },
  { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/gajjala_ashok_7555', color: 'hover:text-[#E4405F] hover:shadow-[0_0_20px_#E4405F]' },
  { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@ashokgajjala-j3q', color: 'hover:text-[#FF0000] hover:shadow-[0_0_20px_#FF0000]' },
];

export default function Footer() {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Animated Border Background */}
      <div className="absolute inset-0 rounded-t-2xl p-[3px] bg-gradient-to-r from-[#ff4ec6] via-[#a048ff] to-[#4ac6ff] bg-[length:400%_400%] animate-[liquid-border_6s_ease_infinite]">
        <div className="absolute inset-[3px] bg-[#12121b] rounded-t-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll('#home');
                }}
                className="inline-block text-3xl font-bold mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <span className="bg-gradient-to-r from-[#ff4ec6] via-[#a048ff] to-[#4ac6ff] bg-clip-text text-transparent animate-[gradient-flow_3s_linear_infinite] bg-[length:200%_auto]">
                  GAKR
                </span>
              </motion.a>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building real AI systems that scale. Focused on performance, clarity, and reliability in every project.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-[#ff4ec6] via-[#a048ff] to-[#4ac6ff] bg-clip-text text-transparent animate-[gradient-flow_3s_linear_infinite] bg-[length:200%_auto]">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScroll(link.href);
                      }}
                      className="text-gray-400 hover:text-white transition-all duration-300 relative group"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff4ec6] via-[#a048ff] to-[#4ac6ff] group-hover:w-full transition-all duration-300" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-[#ff4ec6] via-[#a048ff] to-[#4ac6ff] bg-clip-text text-transparent animate-[gradient-flow_3s_linear_infinite] bg-[length:200%_auto]">
                Projects
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://ashok75-gakr.hf.space"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="relative">
                      GAKR AI Chatbot
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff4ec6] via-[#a048ff] to-[#4ac6ff] group-hover:w-full transition-all duration-300" />
                    </span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://huggingface.co/Ashok75"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="relative">
                      AI/ML Models
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff4ec6] via-[#a048ff] to-[#4ac6ff] group-hover:w-full transition-all duration-300" />
                    </span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/239x1a3242-maker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="relative">
                      GitHub Repositories
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ff4ec6] via-[#a048ff] to-[#4ac6ff] group-hover:w-full transition-all duration-300" />
                    </span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-[#ff4ec6] via-[#a048ff] to-[#4ac6ff] bg-clip-text text-transparent animate-[gradient-flow_3s_linear_infinite] bg-[length:200%_auto]">
                Connect
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-gray-400 transition-all duration-300 ${social.color}`}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-gray-500 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Gajjala Ashok Kumar Reddy. All rights reserved.
              </p>

              {/* Tagline */}
              <p className="text-gray-500 text-sm flex items-center gap-1">
                Crafted with <Heart size={14} className="text-[#ff4ec6] fill-[#ff4ec6]" /> for real AI systems
              </p>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 hover:border-[#a048ff] transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Back to top"
              >
                <ArrowUp size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes liquid-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </footer>
  );
}
