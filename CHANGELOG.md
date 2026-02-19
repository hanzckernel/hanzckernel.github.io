# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Mobile-Native Adaptation**:
  - **Fullscreen Menu**: Replaced inline mobile menu with an iOS-style bottom sheet featuring large touch targets and social quick-links.
  - **Touch Lightbox**: Added swipe gestures (left/right) to the photo lightbox on mobile, removing desktop arrows for a cleaner interface.
  - **Blog ToC Drawer**: Implemented a floating "Contents" button on mobile blog posts that opens a slide-up Table of Contents drawer.
  - **iOS Integration**: Added `viewport-fit=cover`, `theme-color`, and `apple-mobile-web-app-capable` meta tags for a native app feel.
- **Blog UI Overhaul**:
  - **Docs-Style Layout**: Introduced a 3-column layout for desktop (Left: Post List, Center: Article, Right: Table of Contents).
  - **Photo Gallery**: Created a new `/photos` page displaying all background images in a grid with full-resolution lightbox support.
  - **Background Captions**: Added subtle camera icon pills to all pages, revealing photo context on hover.

### Changed
- **Visual Polish**:
  - **Mobile Backgrounds**: Tuned `background-position` per page to ensure key subjects (swan, chalkboard, etc.) remain visible in portrait mode.
  - **Typography**: Adjusted blog post title sizes and prose spacing for better readability on smaller screens.
  - **Touch Targets**: Increased minimum touch target size to 44px+ for all interactive elements on mobile.
- **Fixes**:
  - Resolved invisible text issues on blog cards and post metadata by increasing contrast against dark backgrounds.

## [0.1.0] - 2026-02-18

### Added
- **Astro Migration**: Complete rewrite of the legacy site using Astro 5.
- **Testing Suite**: Integrated Playwright for smoke tests and link checking.
- **CI/CD**: GitHub Actions workflow for automated testing and deployment.
- **Global Search**: Integrated Pagefind static search with a custom React UI.
- **Visual Polish**: 
  - Enhanced "Swan" background with fixed parallax and grain overlays.
  - Refined layout z-indexing for smoother transitions.
  - Optimized responsive navigation for both desktop and mobile.

### Fixed
- Resolved Pagefind import errors in both development and production.
- Restored type-safe Props for layouts and components.
- Standardized SEO metadata across all dynamically generated pages.
- Improved iFrame sandboxing and loading states in The Arcade.
