import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Resume() {
  return (
    <div className="min-h-screen bg-dark text-foreground flex flex-col">
      {/* Top bar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="shrink-0 bg-dark/90 backdrop-blur-xl border-b border-dark-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] gap-4">
            <Link
              to="/"
              className="gakr-logo flex items-center gap-2 shrink-0 text-lg sm:text-xl font-bold text-white tracking-tight transition-colors hover:text-primary"
            >
              <img
                src="/logo.svg"
                alt="GAKR logo"
                width={30}
                height={30}
                className="gakr-logo-mark w-7 h-7 sm:w-[30px] sm:h-[30px] shrink-0"
              />
              <span className="text-primary">GA</span>KR
            </Link>

            <span className="hidden sm:block text-sm text-muted-foreground font-mono truncate">
              Resume
            </span>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                <ExternalLink size={16} />
                <span className="hidden sm:inline">Open PDF</span>
              </a>
              <a
                href="/resume.pdf"
                download="Ashok_Kumar_Reddy_Resume.pdf"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm text-white font-medium rounded-lg border border-dark-border hover:border-primary transition-all duration-200"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Download</span>
              </a>
              <Link
                to="/"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm text-white font-medium rounded-lg bg-primary hover:bg-primary/90 transition-all duration-200 shadow-glow"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back to Portfolio</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-page native PDF viewer */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: easeOutExpo }}
        className="flex-1 min-h-0 p-4 sm:p-6"
      >
        <iframe
          src="/resume.pdf"
          title="Ashok Kumar Reddy Resume"
          className="w-full h-full min-h-[calc(100vh-72px-4rem)] rounded-2xl border border-dark-border bg-dark-card"
        />
      </motion.main>
    </div>
  );
}