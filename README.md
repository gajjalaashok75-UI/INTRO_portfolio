# 🚀 Gajjala Ashok Kumar Reddy - Portfolio Website

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://gajjalaashok75-ui.github.io/INTRO_portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/gajjalaashok75-UI/INTRO_portfolio)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

> **A modern, responsive portfolio website showcasing AI engineering expertise and full-stack development skills**

## 👨‍💻 About

This is the personal portfolio website of **Gajjala Ashok Kumar Reddy**, an AI Engineer & Full-Stack Developer from Kurnool, Andhra Pradesh, India. The portfolio showcases real AI systems, engineering depth, and performance-first development approach.

### 🎯 Key Highlights
- **Real AI Systems** - Production-ready applications, not just demos
- **Engineering Depth** - Robust FastAPI backends and responsive frontends  
- **Performance First** - Optimized for speed and reliability

## 🌟 Features

### ✨ Modern Design
- **Responsive Design** - Optimized for all devices and screen sizes
- **Dark Theme** - Professional dark mode with custom color scheme
- **Smooth Animations** - Framer Motion powered animations and transitions
- **Interactive Elements** - Hover effects, scroll animations, and micro-interactions

### 🎨 UI/UX Excellence
- **Component Library** - 53+ custom UI components built with Radix UI
- **Typography** - Inter font family with JetBrains Mono for code
- **Accessibility** - WCAG compliant design patterns
- **Performance** - Optimized loading and rendering

### 📱 Sections
1. **Hero** - Introduction with value propositions and social links
2. **About** - Professional summary with statistics and expertise areas
3. **Skills** - Technical skills organized by categories
4. **Projects** - Featured projects with live demos and source code
5. **Education** - Academic journey with timeline visualization
6. **Contact** - Multiple contact methods and social media links

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.2.4** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Framer Motion 12.29.2** - Animation library
- **Lucide React** - Beautiful icon library

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **TypeScript ESLint** - TypeScript-specific linting rules

### Additional Libraries
- **Class Variance Authority** - Component variant management
- **clsx & tailwind-merge** - Conditional CSS classes
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date manipulation

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gajjalaashok75-UI/INTRO_portfolio.git
   cd INTRO_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 📁 Project Structure

```
INTRO_portfolio/
├── public/                 # Static assets
│   ├── hero-bg.jpg        # Hero section background
│   ├── project-*.jpg      # Project showcase images
│   └── ...
├── src/
│   ├── components/        # Reusable UI components
│   │   └── ui/           # 53+ Radix UI components
│   ├── sections/         # Main page sections
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── components.json        # Shadcn/ui configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Customization

### Colors & Theme
The color scheme is defined in `tailwind.config.js` and `src/index.css`:

```css
:root {
  --primary: 217 91% 67%;     /* #5B8CFF - Primary blue */
  --secondary: 199 89% 48%;   /* #38BDF8 - Secondary cyan */
  --accent: 187 85% 53%;      /* #22D3EE - Accent teal */
  --background: 220 18% 7%;   /* #0E1117 - Dark background */
}
```

### Content Updates
- **Personal Info**: Update contact details in `src/sections/Contact.tsx`
- **Projects**: Modify project data in `src/sections/Projects.tsx`
- **Skills**: Update skill categories in `src/sections/Skills.tsx`
- **About**: Edit professional summary in `src/sections/About.tsx`

### Images
Replace images in the `public/` directory:
- `hero-bg.jpg` - Hero section background
- `project-*.jpg` - Project showcase images

## 🌐 Deployment

### Netlify (Recommended)
1. **Connect repository** to Netlify
2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy** automatically on push

`public/_redirects` contains `/*    /index.html   200`, which provides the SPA
fallback so client-side routes such as `/resume` survive direct navigation and
browser refresh. Existing static files (e.g. `/resume.pdf`, `/assets/*`) are
still served normally.

### Vercel
1. **Connect repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy** automatically on push

### GitHub Pages
Not supported with the current root deployment config (`base: '/'` and
client-side routing). Serve `dist/` from a root domain instead.

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size**: Optimized with Vite's tree-shaking
- **Loading Speed**: Fast initial load with code splitting
- **Responsive**: Mobile-first design approach

## 🔧 Configuration Files

### Vite Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Tailwind Configuration (`tailwind.config.js`)
- Custom color palette
- Extended animations and keyframes
- Custom font families (Inter, JetBrains Mono)
- Responsive breakpoints

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Gajjala Ashok Kumar Reddy**
- 📧 Email: [gajjalaashok75@gmail.com](mailto:gajjalaashok75@gmail.com)
- 💼 LinkedIn: [gajjala-ashok-kumar-reddy](https://www.linkedin.com/in/gajjala-ashok-kumar-reddy-747510353)
- 🐙 GitHub: [239x1a3242-maker](https://github.com/239x1a3242-maker)
- 🤗 Hugging Face: [Ashok75](https://huggingface.co/Ashok75)
- 🌐 Portfolio: [Live Demo](https://gajjalaashok75-ui.github.io/INTRO_portfolio/)

## 🎯 Featured Projects

### 🤖 GAKR AI Chatbot
Production-ready AI chatbot with FastAPI backend and responsive frontend.
- **Live Demo**: [ashok75-gakr.hf.space](https://ashok75-gakr.hf.space)
- **Tech**: FastAPI, Python, LLM, Streaming, GGUF, llama.cpp

### 🧠 AI/ML Model Deployments  
Machine learning models deployed on Hugging Face Spaces.
- **Profile**: [huggingface.co/Ashok75](https://huggingface.co/Ashok75)
- **Tech**: Python, Hugging Face, Qwen, DeepSeek, TensorFlow

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Gajjala Ashok Kumar Reddy](https://github.com/gajjalaashok75-UI)

</div>
