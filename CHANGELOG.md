# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
