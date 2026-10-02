interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function collectText(node: HastNode): string {
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(collectText).join('');
}

/**
 * Mirrors GitHub's heading anchors so in-README table-of-contents links
 * (`[Setup](#setup)`) resolve to a real element.
 *
 * react-markdown emits headings without ids, so without this every `#anchor`
 * link in a README points at nothing. Runs after rehype-raw so headings that
 * came from embedded HTML are covered too.
 */
export function rehypeGithubSlugs() {
  const seen = new Map<string, number>();

  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      const tag = node.tagName;
      if (tag && HEADING_TAGS.has(tag) && node.properties) {
        // An explicit id in the README always wins.
        if (!node.properties.id) {
// Matches GitHub exactly: strip punctuation, then turn every
            // individual space into a hyphen. Collapsing runs of whitespace
            // (with \s+) instead would break headings like "Global Help &
            // Version", whose slug on GitHub is "global-help--version".
            const base = collectText(node)
              .trim()
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s/g, '-');

          if (base) {
            const count = seen.get(base) ?? 0;
            seen.set(base, count + 1);
            node.properties.id = count === 0 ? base : `${base}-${count}`;
          }
        } else {
          const base = String(node.properties.id);
          const count = seen.get(base) ?? 0;
          seen.set(base, count + 1);
        }
      }
      node.children?.forEach(walk);
    };

    walk(tree);
    return tree;
  };
}