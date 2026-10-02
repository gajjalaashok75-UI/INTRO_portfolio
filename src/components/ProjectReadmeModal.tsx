import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { X, Github, Loader2, FileQuestion, RotateCw } from 'lucide-react';
import { rehypeResolveRepoUrls } from '../lib/rehypeRepoUrls';
import { rehypeGithubSlugs } from '../lib/rehypeGithubSlugs';

export interface ReadmeTarget {
  title: string;
  repo: string;
  repoUrl: string;
}

const README_FILENAMES = ['README.md', 'README.MD', 'README', 'readme.md', 'Readme.md'];

function headingId(node: unknown): string | undefined {
  return (node as { properties?: { id?: string } } | undefined)?.properties?.id;
}

/**
 * Pulls the README straight from GitHub's raw CDN. CORS is allowed there, so
 * no token and no server proxy are needed. Each filename candidate is probed
 * in turn because repos are inconsistent about casing and extension.
 */
async function fetchReadme(repo: string): Promise<string> {
  for (const file of README_FILENAMES) {
    const res = await fetch(`https://raw.githubusercontent.com/${repo}/HEAD/${file}`, {
      headers: { Accept: 'text/plain' },
    });
    if (res.ok) {
      const text = await res.text();
      if (text.trim()) return text;
    }
  }
  throw new Error('README not found');
}

export default function ProjectReadmeModal({
  target,
  onClose,
}: {
  target: ReadmeTarget | null;
  onClose: () => void;
}) {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /**
   * Table-of-contents links inside a README point at `#some-heading`. Left
   * alone the browser would jump the whole document — which reads as the page
   * shooting to the top — because the anchor lives inside a scroll container,
   * not the document. Scroll the modal body instead, and swallow the click
   * when no such heading exists.
   */
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href') ?? '';
    const isAnchor = href === '' || href === '#' || href.startsWith('#');
    if (!isAnchor) return;

    e.preventDefault();

    const container = scrollRef.current;
    if (!container) return;

    const id = href.startsWith('#') ? decodeURIComponent(href.slice(1)) : '';
    if (!id || id === 'top') {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = container.querySelector(`#${CSS.escape(id)}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const load = useCallback(async () => {
    if (!target) return;
    setLoading(true);
    setError(null);
    setMarkdown('');
    try {
      setMarkdown(await fetchReadme(target.repo));
    } catch {
      setError('Could not load the README from GitHub. It may be private or temporarily unreachable.');
    } finally {
      setLoading(false);
    }
  }, [target]);

  useEffect(() => {
    load();
  }, [load, attempt]);

  // Reset the scroll position each time a different project is opened
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [target, loading]);

  // Escape to close, and lock background scroll while the modal is up
  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [target, onClose]);

  return (
    <AnimatePresence>
      {target && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${target.title} README`}
        >
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl bg-dark-card border border-dark-border overflow-hidden shadow-glow-lg"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 md:px-6 h-16 shrink-0 border-b border-dark-border">
              <Github size={20} className="text-primary shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-white font-semibold truncate">{target.title}</p>
                <p className="text-xs text-muted-foreground font-mono truncate">{target.repo}</p>
              </div>

              <a
                href={target.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm text-white font-medium rounded-lg border border-dark-border hover:border-primary transition-colors shrink-0"
              >
                View on GitHub
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-lg text-white hover:text-primary hover:bg-white/5 transition-colors shrink-0"
                aria-label="Close README"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-8 py-6">
              {loading && (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
                  <Loader2 size={28} className="animate-spin text-primary" />
                  <p className="text-sm">Loading README from GitHub…</p>
                </div>
              )}

              {!loading && error && (
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                  <FileQuestion size={32} className="text-primary" />
                  <p className="text-muted-foreground max-w-sm text-sm">{error}</p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setAttempt((a) => a + 1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-glow hover:shadow-glow-lg"
                    >
                      <RotateCw size={16} />
                      Retry
                    </button>
                    <a
                      href={target.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-white border border-dark-border hover:border-primary transition-colors"
                    >
                      <Github size={16} />
                      Open on GitHub
                    </a>
                  </div>
                </div>
              )}

              {!loading && !error && (
                <div className="readme-body text-sm md:text-base text-muted-foreground leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                      // Embedded HTML blocks must be parsed before URLs can be
                      // rewritten inside them.
                      rehypeRaw,
                      [rehypeResolveRepoUrls, { repo: target.repo }],
                      rehypeGithubSlugs,
                    ]}
                    components={{
                      h1: ({ children, node }) => (
                        <h1 id={headingId(node)} className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4 scroll-mt-2">
                          {children}
                        </h1>
                      ),
                      h2: ({ children, node }) => (
                        <h2
                          id={headingId(node)}
                          className="text-xl md:text-2xl font-bold text-white mt-8 mb-3 pb-2 border-b border-dark-border scroll-mt-2"
                        >
                          {children}
                        </h2>
                      ),
                      h3: ({ children, node }) => (
                        <h3 id={headingId(node)} className="text-lg font-semibold text-white mt-6 mb-2 scroll-mt-2">
                          {children}
                        </h3>
                      ),
                      h4: ({ children, node }) => (
                        <h4 id={headingId(node)} className="text-base font-semibold text-white mt-5 mb-2 scroll-mt-2">
                          {children}
                        </h4>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleAnchorClick}
                          className="text-primary hover:underline underline-offset-2 break-words"
                        >
                          {children}
                        </a>
                      ),
                      ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1.5">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1.5">{children}</ol>,
                      li: ({ children }) => <li className="pl-1">{children}</li>,
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-primary pl-4 py-1 mb-4 text-muted-foreground/80 italic">
                          {children}
                        </blockquote>
                      ),
                      hr: () => <hr className="border-dark-border my-8" />,
                      code: ({ children, className }) => {
                        const isBlock = className?.includes('language-');
                        if (isBlock) {
                          return (
                            <code className={`block font-mono text-[13px] leading-relaxed bg-black/40 text-white/90 p-4 rounded-xl overflow-x-auto my-4 ${className}`}>
                              {children}
                            </code>
                          );
                        }
                        return (
                          <code className="font-mono text-[13px] bg-white/10 text-primary px-1.5 py-0.5 rounded">
                            {children}
                          </code>
                        );
                      },
                      pre: ({ children }) => (
                        <pre className="bg-black/40 rounded-xl overflow-x-auto my-4 border border-dark-border">
                          {children}
                        </pre>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-4">
                          <table className="w-full border-collapse text-sm">{children}</table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="border border-dark-border bg-white/5 px-3 py-2 text-left text-white font-semibold">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-dark-border px-3 py-2 align-top">{children}</td>
                      ),
                      img: ({ src, alt }) => (
                        <img src={src} alt={alt ?? ''} loading="lazy" className="max-w-full rounded-xl my-4" />
                      ),
                      // Embedded HTML in READMEs (centred logos, badge blocks)
                      // becomes real DOM after rehype-raw, so it needs the same
                      // treatment as markdown-authored elements.
                      div: ({ children, node }) => {
                        const align = (node?.properties as { align?: string } | undefined)?.align;
                        return align === 'center' ? (
                          <div className="text-center my-6 flex flex-col items-center">{children}</div>
                        ) : (
                          <div className="my-2">{children}</div>
                        );
                      },
                      p: ({ children, node }) => {
                        const align = (node?.properties as { align?: string } | undefined)?.align;
                        return align === 'center' ? (
                          <p className="text-center mb-4 flex flex-wrap items-center justify-center gap-2">
                            {children}
                          </p>
                        ) : (
                          <p className="mb-4">{children}</p>
                        );
                      },
                      strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                      kbd: ({ children }) => (
                        <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-dark-border font-mono text-[13px] text-primary">
                          {children}
                        </kbd>
                      ),
                      details: ({ children }) => (
                        <details className="border border-dark-border rounded-xl p-4 my-4">{children}</details>
                      ),
                      summary: ({ children }) => (
                        <summary className="cursor-pointer text-white font-semibold">{children}</summary>
                      ),
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}