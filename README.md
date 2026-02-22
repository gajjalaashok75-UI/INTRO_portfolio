# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # React + TypeScript + Vite — Project

    A responsive single-page React application built with Vite and TypeScript. The app is organized into reusable UI components and content sections (Hero, About, Projects, Skills, Education, Contact, etc.). This README documents how the project works, how it is implemented, and how to run it locally or build for deployment.

    **Working**
    - **Single-page layout:** navigation-driven sections rendered from `src/sections`.
    - **Reusable UI components:** primitives and styled components live in `src/components/ui`.
    - **Interactive elements:** animations, carousels, charts, and forms using libraries included in `package.json`.
    - **Responsive & accessible:** designed for desktop and mobile with accessibility-minded primitives.

    **Implementation**
    - **Stack:** React 19, TypeScript, Vite, Tailwind CSS, Radix UI primitives and a small custom UI layer under `src/components/ui`.
    - **Key folders:**
      - `src/components/ui` — reusable UI building blocks
      - `src/sections` — page sections (Hero, About, Projects, Skills, Education, Contact, Footer, Navigation)
      - `src/hooks` — custom hooks (e.g., `use-mobile`)
      - `src/lib` — utilities
    - **Notable libraries:** `framer-motion` (animations), `recharts` (charts), `embla-carousel-react` (carousels), `react-hook-form` (forms), `sonner` (notifications), `radix-ui` primitives for accessible UI.

    **Usage / How to run**
    1. Clone the repository and open the project folder.
    2. Install dependencies:

    ```bash
    npm install
    ```

    3. Run development server with hot reload:

    ```bash
    npm run dev
    ```

    4. Create a production build:

    ```bash
    npm run build
    ```

    5. Preview the production build locally:

    ```bash
    npm run preview
    ```

    6. Run linters:

    ```bash
    npm run lint
    ```

    Notes:
    - Node.js 18+ is recommended but recent LTS versions should work.
    - Environment-specific variables (if any) can be added to a `.env` file at the project root.

    **Deployment**
    - The `build` output (Vite) can be deployed to static hosts like Vercel, Netlify, or GitHub Pages. For most platforms, connect the repository and use the default build command `npm run build`.

    **Contributing**
    - This README focuses on workings and usage only. If you want contribution guidelines, tests, or CI added, open an issue or add a `CONTRIBUTING.md`.

    **License**
    - Add a `LICENSE` file to declare the repository license if needed.

    ---
    *This README contains implementation, usage, and run instructions only; no personal information is included.*
