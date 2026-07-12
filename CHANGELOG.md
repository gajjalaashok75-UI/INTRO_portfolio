# Changelog

## [1.2.3] - 2026-07-12

### Added
- Devit Real-Time Internship offer letter to Certificates section
- `devit-offer-letter.jpg` asset

### Changed
- About section bio rewritten — removed FastAPI-specific language, generalized to CLI/integration/developer tools focus
- Hero section CTA: link updated from `ashok75-gakr.hf.space` to `gakrcli.netlify.app`, button text from "Try GAKR AI" to "Try GakrCLI"
- Hero description expanded with GakrCLI and scout-it project highlights and internship context

## [1.2.2] - 2026-07-12

### Added
- InternPe AI/ML Internship offer letter and completion certificate to Certificates section
- `internpe-offer-letter.png` and `internpe-completion-certificate.png` assets

## [1.2.1] - 2026-07-09

### Changed
- Footer: replaced "GAKR AI Chatbot" and "AI/ML Models" with "gakrcli" and "scout-it" linked to their GitHub repos
- GitHub profile URL updated from `239x1a3242-maker` to `gajjalaashok75-UI` across Footer, Hero, Contact, and Projects sections

## [1.2.0] - 2026-07-08

### Added
- `Certificates` section — 12 certificates displayed in a responsive 2–4 column grid with hover shine effect, "Show all" toggle (shows 6 initially), and a full-screen lightbox with keyboard navigation (arrow keys + Escape), prev/next buttons, and open/close animations via Anime.js
- `logo.svg` — SVG favicon/logo replacing the emoji data-URI favicon
- Certificate images — 12 certificate assets under `public/certificates/`
- `xs: 400px` breakpoint in Tailwind config for tighter screen handling
- `splitText()` integration in Hero — replaces manual `SplitLetters` component with Anime.js v4's `splitText()` for word-safe per-character reveal
- Clock hover shine sweep animation (`shine` method) triggered on pointer enter

### Changed
- Navigation: CSS grid layout reverted to flex for better responsive behavior; added inline SVG logo mark; desktop nav breakpoint bumped from `md` to `lg` to prevent overlap with the clock; Certificates link added; mobile menu breakpoint also bumped to `lg`
- LiveClock: shine effect on hover; seconds/colon breakpoint relaxed from `md` to `sm`; city label breakpoint tightened from `lg` to `md` with truncation; max-width increased to `52vw` on smallest screens
- Projects: reordered — GakrCLI moved to first position (featured), scout-it promoted to featured, GAKR AI Chatbot demoted to non-featured
- Contact section number: `05.` → `06.` (Certificates inserted before Contact)
- Hero: removed `SplitLetters` manual component in favor of `splitText()` API with cleaner gradient class handling
- `package-lock.json`: dependency resolution updates (caniuse-lite, baseline-browser-mapping)

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
