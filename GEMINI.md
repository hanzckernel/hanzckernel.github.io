# Web Architectural Standards & Redesign Strategy (Astro)

## 0. Core Protocol
*   **Mandatory Cognitive Architecture:**
    *   Before executing any technical tasks, you **MUST** read and internalize the cognitive architecture defined in `AGENT_WORKFLOW.md`.
    *   This file dictates *how* you think, reason, and communicate, acting as the "Operating System" for your actions.
*   **Scope of Application:**
    *   This applies to **ALL** interactions, including:
        *   New project initializations.
        *   Complex refactoring or architectural changes.
        *   Debugging sessions and bug fixes.
        *   Feature implementations.

## 1. Core Technical Protocol
*   **Framework:** [Astro](https://astro.build/) (Static Site Generation).
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first).
*   **Interactivity:** [Framer Motion](https://www.framer.com/motion/) for animations within React islands.
*   **Search:** [Pagefind](https://pagefind.app/) for static, client-side search.
*   **Deployment:** GitHub Actions to GitHub Pages.

## 2. Visual & UX Standards
*   **Aesthetic Continuity:**
    *   **The "Swan" Background:** Full-bleed background (`index.jpg`) with a subtle Parallax effect and Grainy Glassmorphism overlays (`backdrop-filter: blur()`) for content containers.
    *   **The "Viewcard" Vibe:** High-quality project cards with 3D tilt effects and revealed metadata (tags, dates) on hover.
*   **Transitions:** Use Astro's View Transitions API for seamless navigation between pages.
*   **Performance:** Target < 50KB initial JS payload and 95+ Lighthouse scores.

## 3. Testing Protocols
*   **Unit Tests (Jest/Vitest):**
    *   Focus on pure functions, utilities, and complex business logic.
    *   Run in CI: `npm test -- --ci --coverage`.
*   **End-to-End (E2E) Tests (Playwright):**
    *   **Focus:** Test critical user journeys (Login, Checkout, Core Feature).
    *   **CI Configuration:**
        *   **CRITICAL:** Must set `CI=true` to prevent interactive shell hangs.
        *   **Command:** `CI=true npx playwright test`
        *   **Artifacts:** retain traces/screenshots only on failure to save storage.
*   **Test Driven Development (TDD):** Encouraged for complex logic, but not strictly enforced for UI components.

## 4. Project Showcase Architecture
*   **The Arcade (Webapps):**
    *   Embed Firebase-hosted apps via responsive iFrames.
    *   Use a "Preview Mode" with high-quality thumbnails to defer iFrame loading until user interaction.
*   **The Gallery (Mathematics):**
    *   Masonry grid layout for academic papers and lecture notes.
    *   Integrate MathJax/KaTeX for mathematical formula rendering.
    *   Provide direct links to PDF and TeX source files.

## 5. Content & SEO Strategy
*   **Content Management:** Use Astro Content Collections in `src/content/` for projects, blogs, and notes. Support MDX for interactive components.
*   **Searchability (SEO):**
    *   **Metadata:** Dynamic meta tags (Title, Description, Canonical) for every route.
    *   **Social:** Comprehensive OpenGraph (OG) and Twitter Card integration.
    *   **Structured Data:** Implement `Schema.org` JSON-LD for Person and CreativeWork types.
    *   **Sitemap:** Automatically generated via `@astrojs/sitemap`.

## 6. CI/CD & Deployment
*   **Automation:** GitHub Actions workflow triggered on push to `main`.
*   **Workflow Steps:**
    1.  Dependency installation and build.
    2.  Post-build Pagefind indexing.
    3.  Deployment to `gh-pages` branch.

## 7. Coding & Git Standards
*   **Structure:**
    *   `src/components/`: Reusable UI components.
    *   `src/layouts/`: Base page templates.
    *   `src/content/`: Type-safe Markdown/MDX content.
*   **Git:** Strictly follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
*   **Types:** Use TypeScript for all components and utility functions.

## 8. Legacy Code Migration Strategy
*   **Gradual Typing:**
    *   Don't try to add types to the entire `legacy/` folder at once.
    *   Use `mypy --ignore-missing-imports` for legacy modules initially.
    *   Enforce `strict = true` only for the new `src/` directory.
*   **The "Scout" Rule:**
    *   When touching a legacy file, apply *local* cleanups (e.g., replace `print` with `logger`), but don't refactor the whole file unless necessary for the task.
*   **Deprecation Warnings:**
    *   Decorate old functions with `@deprecated` (from `warnings` module) to signal to other developers (and yourself) to stop using them.

## 9. Operational & Coding Standards
*   **Logging:**
    *   Use `structlog` or standard `logging` with JSON formatters for observability.
    *   **NEVER** use `print`.
*   **Configuration:**
    *   Use `pydantic-settings` for robust, typed environment variable management.
    *   Validate config at startup; fail fast if DB_URL is missing.
*   **Error Handling:**
    *   Define custom exception hierarchies.
    *   Catch specific errors, never bare `except:`.
