# Changelog

## [1.1.0] - 2026-07-08

### Added
- `animejs` dependency — powers per-letter text reveals, cursor-reactive orbs, 3D card tilt, timeline draw, and nav logo ping
- `LiveClock` component — live clock with second-precision tick, colon blink, seconds pulse, and geolocation-based city name via reverse geocode
- `useScrollReveal` hook — reusable IntersectionObserver + Anime.js stagger for scroll-triggered fade/rise animations
- Hero section: per-character name reveal with stagger, 3D rotation, and pointer-reactive floating orbs
- Navigation: logo ping animation on hover with Anime.js scoped animation
- Education: timeline line draw animation triggered on scroll into view
- Projects: 3D tilt effect on project cards (TiltSurface component), two new projects (GakrCLI, scout-it), per-project icons, improved card layout with truncation
- Skills: TypeScript, AI Agent / CLI Tooling, MCP Integration, Node.js / Bun, Web Scraping & Automation, React entries
- Project images: `project-gakrcli.jpg`, `project-scoutit.jpg`

### Changed
- Hero: name heading rewritten from framer-motion variant to Anime.js per-character split reveal; floating orbs switched from y-axis framer-motion to Anime.js pointer-reactive positioning
- Navigation: layout switched from flex to CSS grid (`grid-cols-[auto_1fr_auto]`) to center LiveClock; desktop nav links use `whitespace-nowrap` and responsive padding
- Projects: project card content wrapped in TiltSurface; description copy revised for all projects; tech stack, GitHub link, and demo link moved to structured layout with icons; "View All" GitHub link updated to `gajjalaashok75-UI`
- Skills: expanded programming languages, AI/DS, tools, and web dev skill lists

## [1.0.0] - 2026-07-08

### Added
- `.gitignore` — ignores `node_modules/`, `dist/`, `resume.md`, `.env`, OS files, and logs
- `resume.md` — personal resume file (gitignored)

### Removed
- `dist/` — removed from git tracking; build output should not be versioned
