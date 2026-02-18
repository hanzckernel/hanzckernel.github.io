# Technical Design Document: Personal Website Redesign

## 1. Executive Summary
This document outlines the technical architecture and UX strategy for rebuilding the personal website of Zhicheng Han. The redesign aims to transition from a legacy Jekyll/Cayman-based static site to a modern, performance-first architecture using **Astro**. The core focus is on preserving aesthetic continuity ("Swan" & "Viewcard" vibes) while introducing a robust Markdown-based content system, an interactive "Arcade" for webapps, a minimalist "Gallery" for academic work, and professional-grade SEO and CI/CD.

---

## 2. Technology Stack Selection
To ensure a lightweight, fast, and scalable site, we will utilize the following stack:

*   **Core Framework**: [Astro](https://astro.build/)
    *   *Why*: Best-in-class performance (Zero JS by default), Content Collections for type-safe Markdown, and "Islands" architecture for selective interactivity.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Interactivity**: [Framer Motion](https://www.framer.com/motion/)
*   **Search**: [Pagefind](https://pagefind.app/)
*   **Deployment**: [GitHub Actions](https://github.com/features/actions) for automated deployment to **GitHub Pages**.

---

## 3. Visual Strategy & Asset Integration
The redesign will honor the "Swan" and "Viewcard" aesthetics through modern CSS techniques.

### 3.1 The "Swan" Background (Atmospheric Continuity)
*   **Implementation**: Use the legacy `index.jpg` (or `background.jpg`) with a subtle Parallax effect.
*   **Modernization**: Grainy Glassmorphism overlay for text containers.

### 3.2 "Viewcard" Vibe (Card Design)
*   **Implementation**: Interactive cards with 3D tilt effects and revealed metadata on hover.

---

## 4. Project Showcase Architecture

### 4.1 The Arcade (Webapps)
*   **Technical Implementation**: Embed apps via Responsive iFrames with a "Launch App" preview mode to optimize performance.

### 4.2 The Gallery (Mathematics)
*   **Technical Implementation**: Masonry Grid for PDF/TeX assets with MathJax/KaTeX integration for rendering formulas.

---

## 5. Content Management, Search & SEO

### 5.1 Markdown System (The Wiki/Blog)
*   Astro Content Collections with MDX support for interactive components.

### 5.2 Search Logic
*   Client-side search using Pagefind, indexed during the build process.

### 5.3 SEO & Metadata (Searchability)
*   **Metadata**: Comprehensive meta tags for every page (Title, Description, Canonical URL).
*   **Social**: OpenGraph (OG) and Twitter Card tags for rich previews.
*   **Sitemap**: Automatic sitemap generation using `@astrojs/sitemap`.
*   **Structured Data**: Implement `Schema.org` JSON-LD (Person, CreativeWork) to help Google understand the site's hierarchy and authorship.

---

## 6. CI/CD Pipeline (GitHub Pages)
*   **Workflow**: A GitHub Actions script will trigger on every push to `main`.
*   **Process**:
    1.  Install dependencies.
    2.  Build the Astro site (generating static files).
    3.  Run Pagefind indexing.
    4.  Deploy the `dist/` folder to the `gh-pages` branch or via GitHub Actions deployment.

---

## 7. Implementation Roadmap (Phases)

1.  **Phase 0: Project Initiation**
    *   Save this plan to the project root as `PLANS.md`.
2.  **Phase 1: Foundation & CI/CD (Week 1)**
    *   Scaffold Astro project.
    *   Set up GitHub Actions for GitHub Pages deployment.
    *   Integrate Tailwind CSS and basic Layouts.
3.  **Phase 2: SEO & Content Collections (Week 1-2)**
    *   Set up SEO components and sitemap.
    *   Configure Content Collections for "Projects" and "Blog."
    *   Migrate existing HTML content to Markdown.
4.  **Phase 3: The Arcade & Gallery (Week 2)**
    *   Build interactive "Viewcards."
    *   Implement iFrame logic for Arcade and Masonry for Gallery.
5.  **Phase 4: Search & Performance (Week 3)**
    *   Integrate Pagefind search.
    *   Add Framer Motion animations and conduct performance audits.

---

## 8. Performance Targets
*   **Lighthouse Score**: 95+ in all categories.
*   **First Contentful Paint**: < 0.8s on 4G.
