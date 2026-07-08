import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { animate, createScope } from 'animejs';
import LiveClock from '../components/LiveClock';

type Scope = ReturnType<typeof createScope>;

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRootRef = useRef<HTMLElement | null>(null);
  const navScopeRef = useRef<Scope | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Anime.js: logo playful ping, scoped to the header for auto cleanup
  useEffect(() => {
    const root = navRootRef.current;
    if (!root) return;
    navScopeRef.current = createScope({ root }).add((self) => {
      self.add('pingLogo', () => {
        animate('.gakr-logo', {
          rotate: [0, -6, 6, 0],
          scale: [1, 1.08, 1],
          duration: 550,
          ease: 'out(3)',
        });
      });
    });
    return () => navScopeRef.current?.revert();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
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
    <>
      <motion.header
        ref={navRootRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark/90 backdrop-blur-xl border-b border-dark-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] gap-2">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              onMouseEnter={() => navScopeRef.current?.methods.pingLogo?.()}
              className="gakr-logo flex items-center gap-2 shrink-0 text-lg sm:text-xl font-bold text-white tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/logo.svg"
                alt="GAKR logo"
                width={30}
                height={30}
                className="gakr-logo-mark w-7 h-7 sm:w-[30px] sm:h-[30px] shrink-0"
              />
              <span className="text-primary">GA</span>KR
            </motion.a>

            {/* Live Clock — centered in the remaining space between logo and nav/menu */}
            <div className="flex-1 min-w-0 flex justify-center overflow-hidden">
              <LiveClock />
            </div>

            {/* Desktop Navigation — only from lg up, where there's guaranteed room
                next to the logo + clock without ever overlapping either */}
            <div className="hidden lg:flex items-center gap-1 shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 rounded-lg hover:bg-white/5 whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden shrink-0 p-2 text-white hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-[280px] bg-dark-card border-l border-dark-border p-6 pt-24"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-3 text-lg text-muted-foreground hover:text-primary hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
