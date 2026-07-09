import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { animate, createLayout } from 'animejs';
import { Award, ChevronLeft, ChevronRight, X, Maximize2, LayoutGrid } from 'lucide-react';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

const certificates: Certificate[] = [
  {
    title: 'Basics of Python',
    issuer: 'Infosys Springboard',
    date: 'Jul 2025',
    image: '/certificates/infosys-basics-of-python.jpg',
  },
  {
    title: 'Introduction to Data Science',
    issuer: 'Infosys Springboard',
    date: 'Mar 2026',
    image: '/certificates/infosys-data-science.jpg',
  },
  {
    title: 'Introduction to Natural Language Processing',
    issuer: 'Infosys Springboard',
    date: 'Mar 2026',
    image: '/certificates/infosys-nlp.jpg',
  },
  {
    title: 'Quantum Fundamentals Program',
    issuer: 'Amaravati Quantum Valley · Qubitech · WISER',
    date: '2025 – 2026',
    image: '/certificates/quantum-fundamentals.jpg',
  },
  {
    title: 'Real-Time Internship Program',
    issuer: 'Devit',
    date: 'May – Jun 2026',
    image: '/certificates/devit-internship.jpg',
  },
  {
    title: 'NPTEL — Entrepreneurship',
    issuer: 'IIT Madras · Skill India',
    date: 'Jul – Oct 2025',
    image: '/certificates/nptel-entrepreneurship.jpg',
  },
  {
    title: 'Intro to Machine Learning',
    issuer: 'Kaggle',
    date: 'Mar 2026',
    image: '/certificates/kaggle-intro-ml.jpg',
  },
  {
    title: 'Intro to AI Ethics',
    issuer: 'Kaggle',
    date: 'Mar 2026',
    image: '/certificates/kaggle-ai-ethics.jpg',
  },
  {
    title: 'Python Coder Badge',
    issuer: 'Kaggle',
    date: '2024',
    image: '/certificates/kaggle-python-coder.jpg',
  },
  {
    title: 'Java Training',
    issuer: 'Spoken Tutorial · IIT Bombay',
    date: 'Nov 2024',
    image: '/certificates/spoken-tutorial-java.jpg',
  },
  {
    title: 'Python 3.4.3 Training',
    issuer: 'Spoken Tutorial · IIT Bombay',
    date: 'Mar 2025',
    image: '/certificates/spoken-tutorial-python.jpg',
  },
  {
    title: 'OutSysLayer Hackathon — Participation',
    issuer: 'ByondCampuz · GPREC',
    date: '2026',
    image: '/certificates/outsyslayer-hackathon.jpg',
  },
];

const VISIBLE_COUNT = 6;
const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.94 },
  visible: (dimmed: boolean) => ({
    opacity: dimmed ? 0.45 : 1,
    y: 0,
    scale: dimmed ? 0.94 : 1,
    filter: dimmed ? 'blur(2px) grayscale(60%)' : 'blur(0px) grayscale(0%)',
    transition: { duration: 0.5, ease: easeOutExpo },
  }),
};

/**
 * A certificate card with a shine sweep on hover and a data-layout-id
 * for Anime.js Layout to morph into the dialog on click.
 */
function CertCard({
  cert,
  dimmed,
  onOpen,
  index,
}: {
  cert: Certificate;
  dimmed: boolean;
  onOpen: () => void;
  index: number;
}) {
  const shineRef = useRef<HTMLSpanElement | null>(null);

  const handleEnter = () => {
    if (!shineRef.current) return;
    animate(shineRef.current, {
      left: ['-60%', '140%'],
      duration: 650,
      ease: 'inOut(2)',
    });
  };

  return (
    <motion.button
      data-layout-id={`cert-${index}`}
      custom={dimmed}
      variants={cardVariants}
      whileHover={{ opacity: 1, scale: 1.04, filter: 'blur(0px) grayscale(0%)' }}
      onClick={onOpen}
      onPointerEnter={handleEnter}
      className="group relative rounded-xl overflow-hidden bg-dark-card border border-dark-border text-left will-change-transform"
      style={{ aspectRatio: '4 / 3' }}
      aria-label={`Open certificate: ${cert.title}`}
    >
      <img
        src={cert.image}
        alt={cert.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <span
        ref={shineRef}
        className="pointer-events-none absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        style={{ left: '-60%' }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <p className="text-white text-xs md:text-sm font-semibold leading-snug line-clamp-2">
          {cert.title}
        </p>
        <p className="text-white/60 text-[11px] md:text-xs mt-0.5">{cert.issuer}</p>
      </div>
      <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <Maximize2 size={14} />
      </div>
    </motion.button>
  );
}

export default function Certificates() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const layoutRef = useRef<ReturnType<typeof createLayout> | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const openAnimationDoneRef = useRef(false);

  // Keep ref in sync with state for use inside stable callbacks
  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = useCallback(() => {
    const dialog = dialogRef.current;
    const layout = layoutRef.current;
    if (!dialog) return;

    if (layout) {
      const idx = activeIndexRef.current;
      layout.update(() => {
        dialog.close();
        if (idx !== null) {
          document.querySelector(`[data-layout-id="cert-${idx}"]`)?.classList.remove('is-open');
        }
      }).then(() => {
        setActiveIndex(null);
        layoutRef.current = null;
        openAnimationDoneRef.current = false;
      });
    }
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev + dir + certificates.length) % certificates.length;
    });
  }, []);

  // Sync is-open class on grid cards with active index
  useEffect(() => {
    document.querySelectorAll('[data-layout-id^="cert-"]').forEach((el) => {
      const card = el as HTMLElement;
      if (activeIndex !== null && card.dataset.layoutId === `cert-${activeIndex}`) {
        card.classList.add('is-open');
      } else {
        card.classList.remove('is-open');
      }
    });
  }, [activeIndex]);

  // Open animation via Anime.js Layout — runs once when dialog first opens
  useEffect(() => {
    if (activeIndex === null) {
      openAnimationDoneRef.current = false;
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog || openAnimationDoneRef.current) return;

    openAnimationDoneRef.current = true;

    const card = document.querySelector(`[data-layout-id="cert-${activeIndex}"]`);

    const layout = createLayout(dialog, {
      duration: 900,
      ease: 'out(4)',
      properties: ['--overlay-alpha'],
    });

    layoutRef.current = layout;

    layout.update(() => {
      dialog.showModal();
      if (card) card.classList.add('is-open');
    });
  }, [activeIndex]);

  // Dialog event listeners (cancel + backdrop click) — stable, no deps issue
  useEffect(() => {
    if (activeIndex === null) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCancel = (e: Event) => { e.preventDefault(); closeLightbox(); };
    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) closeLightbox();
    };

    dialog.addEventListener('cancel', onCancel);
    dialog.addEventListener('click', onBackdropClick);

    return () => {
      dialog.removeEventListener('cancel', onCancel);
      dialog.removeEventListener('click', onBackdropClick);
    };
  }, [activeIndex, closeLightbox]);

  // Keyboard navigation (arrow keys)
  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, step]);

  const handleShowAll = () => setShowAll(true);

  const active = activeIndex !== null ? certificates[activeIndex] : null;

  return (
    <section id="certificates" className="relative py-24 md:py-32 bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">05. Certificates</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Coursework, hackathons, and training completed along the way. Hover a card for a closer look, or click to open it full size.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="cert-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {certificates.map((cert, index) => (
            <CertCard
              key={cert.title}
              cert={cert}
              dimmed={!showAll && index >= VISIBLE_COUNT}
              onOpen={() => openLightbox(index)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Show all toggle */}
        {!showAll && certificates.length > VISIBLE_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
            <button
              onClick={handleShowAll}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 border border-dark-border hover:border-primary transition-all duration-300"
            >
              <LayoutGrid size={18} />
              Show all {certificates.length} certificates
            </button>
          </motion.div>
        )}

        {/* Summary badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-dark-card border border-dark-border">
            <Award className="text-primary" size={28} />
            <div className="text-left">
              <div className="text-white font-semibold">{certificates.length} Certifications Earned</div>
              <div className="text-sm text-muted-foreground">Across AI/ML, programming, and professional training</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        className="cert-dialog"
      >
        {active && (
          <div
            data-layout-id={`cert-${activeIndex}`}
            className="relative z-10 max-w-4xl w-full flex flex-col items-center p-4 md:p-8"
          >
            <img
              src={active.image}
              alt={active.title}
              className="w-full max-h-[75vh] object-contain rounded-xl bg-dark-card border border-dark-border"
            />
            <div className="mt-4 flex items-center justify-between gap-4 text-center sm:text-left flex-col sm:flex-row w-full">
              <div>
                <p className="text-white font-semibold">{active.title}</p>
                <p className="text-muted-foreground text-sm">
                  {active.issuer} · {active.date}
                </p>
              </div>
              <p className="text-muted-foreground text-xs font-mono">
                {activeIndex! + 1} / {certificates.length}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-1 right-1 sm:top-0 sm:-right-14 p-2.5 rounded-full bg-dark-card border border-dark-border text-white hover:text-primary hover:border-primary transition-colors z-20"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Prev / Next */}
            <button
              onClick={() => step(-1)}
              className="absolute top-1/3 -left-2 sm:-left-16 p-2.5 rounded-full bg-dark-card border border-dark-border text-white hover:text-primary hover:border-primary transition-colors z-20"
              aria-label="Previous certificate"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => step(1)}
              className="absolute top-1/3 -right-2 sm:-right-16 p-2.5 rounded-full bg-dark-card border border-dark-border text-white hover:text-primary hover:border-primary transition-colors z-20"
              aria-label="Next certificate"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
