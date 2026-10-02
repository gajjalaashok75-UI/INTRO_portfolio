interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

const ABSOLUTE_RE = /^[a-z][a-z0-9+.-]*:/i;
const PROTOCOL_RELATIVE_RE = /^\/\//;
const RAW_TAGS = new Set(['img', 'video', 'audio', 'source', 'track']);

/**
 * A README is written with URLs relative to the repository, so on its own
 * `assets/logo.png` or `CONTRIBUTING.md` would resolve against the portfolio
 * origin and 404. This rewrites those to absolute GitHub URLs:
 *
 *   <img src="assets/logo.png">  -> raw.githubusercontent.com/<repo>/HEAD/assets/logo.png
 *   [docs](docs/guide.md)        -> github.com/<repo>/blob/HEAD/docs/guide.md
 *
 * Absolute (http/https/mailto), protocol-relative (`//`) and in-page anchor
 * (`#section`) URLs are left untouched.
 *
 * Must run *after* rehype-raw so that URLs inside embedded HTML blocks are
 * rewritten too, not just the ones authored in markdown syntax.
 */
export function rehypeResolveRepoUrls(options: { repo: string }) {
  const { repo } = options;
  const blobBase = `https://github.com/${repo}/blob/HEAD/`;
  const rawBase = `https://raw.githubusercontent.com/${repo}/HEAD/`;

  const resolve = (value: string, base: string): string | null => {
    if (!value) return null;
    if (value.startsWith('#')) return null;
    if (ABSOLUTE_RE.test(value)) return null;
    if (PROTOCOL_RELATIVE_RE.test(value)) return null;

    // Strip the query/hash off, join it back on after resolving the path.
    const hashIndex = value.search(/[#?]/);
    const hash = hashIndex === -1 ? '' : value.slice(hashIndex);
    const path = (hashIndex === -1 ? value : value.slice(0, hashIndex))
      .replace(/^\.?\//, '')
      .replace(/^\/+/, '');

    if (!path) return null;
    return base + path + hash;
  };

  const walk = (node: HastNode) => {
    const tag = node.tagName;
    if (tag) {
      const props = node.properties;
      if (props) {
        const attr = RAW_TAGS.has(tag) ? 'src' : tag === 'a' ? 'href' : null;
        if (attr && typeof props[attr] === 'string') {
          const resolved = resolve(props[attr], RAW_TAGS.has(tag) ? rawBase : blobBase);
          if (resolved) props[attr] = resolved;
        }
      }
    }
    node.children?.forEach(walk);
  };

  return (tree: HastNode) => {
    walk(tree);
    return tree;
  };
}