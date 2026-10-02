import { useEffect, useId, useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

type MermaidApi = (typeof import('mermaid'))['default'];

let mermaidPromise: Promise<MermaidApi> | null = null;

/**
 * Mermaid is roughly a megabyte of parser, so it is only pulled over the wire
 * once a README actually contains a diagram. The promise is cached so sibling
 * diagrams in the same document reuse the one download.
 */
function loadMermaid(): Promise<MermaidApi> {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
        themeVariables: {
          background: '#1A1D24',
          primaryColor: '#111827',
          primaryTextColor: '#E8EAF0',
          primaryBorderColor: '#5B8CFF',
          secondaryColor: '#0E1117',
          tertiaryColor: '#1A1D24',
          lineColor: '#2D3748',
          textColor: '#E8EAF0',
          mainBkg: '#111827',
          nodeBorder: '#5B8CFF',
          clusterBkg: '#0E1117',
          clusterBorder: '#2D3748',
          edgeLabelBackground: '#0E1117',
          titleColor: '#5B8CFF',
        },
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}

export default function Mermaid({ code }: { code: string }) {
  const [svg, setSvg] = useState('');
  const [failed, setFailed] = useState(false);
  // React's useId contains colons, which are invalid inside a CSS/HTML id.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  useEffect(() => {
    let cancelled = false;
    setSvg('');
    setFailed(false);

    (async () => {
      try {
        const mermaid = await loadMermaid();
        const { svg: rendered } = await mermaid.render(`mmd-${uid}`, code);
        if (!cancelled) setSvg(rendered);
      } catch {
        // A parse failure must never blank the section out — fall back to the
        // raw source so the reader still sees the diagram definition.
        if (!cancelled) setFailed(true);
      } finally {
        // mermaid injects a temporary element into <body> per render and
        // leaves it behind when parsing throws.
        document.getElementById(`dmmd-${uid}`)?.remove();
        document.getElementById(`mmd-${uid}`)?.remove();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code, uid]);

  if (failed) {
    return (
      <div className="my-4 rounded-xl border border-destructive/40 bg-destructive/5">
        <div className="flex items-center gap-2 px-4 py-2 text-destructive text-sm">
          <AlertTriangle size={16} className="shrink-0" />
          This diagram could not be rendered. Showing the source instead.
        </div>
        <pre className="bg-black/40 text-white/90 p-4 rounded-b-xl overflow-x-auto text-[13px] leading-relaxed font-mono whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-4 flex items-center justify-center gap-3 rounded-xl border border-dark-border bg-black/40 py-12 text-muted-foreground text-sm">
        <Loader2 size={18} className="animate-spin text-primary" />
        Rendering diagram…
      </div>
    );
  }

  return (
    <div
      className="my-4 overflow-x-auto rounded-xl border border-dark-border bg-black/40 p-4 flex justify-center readme-mermaid"
      // Produced by mermaid's own renderer from the README's own source.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}