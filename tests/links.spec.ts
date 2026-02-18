import { test, expect } from '@playwright/test';

test('check all internal links are not broken', async ({ page }) => {
  const visited = new Set<string>();
  const toVisit = ['/'];
  const base = 'http://localhost:4321';

  while (toVisit.length > 0) {
    const current = toVisit.pop()!;
    if (visited.has(current)) continue;
    visited.add(current);

    console.log(`Checking page: ${current}`);
    
    // Check if it's a known file type that shouldn't be navigated to as a page
    if (current.match(/\.(pdf|tex|zip|jpg|jpeg|png|svg|ico)$/i)) {
      const response = await page.request.get(current);
      expect(response.status(), `Failed to fetch file ${current}`).toBe(200);
      continue;
    }

    const response = await page.goto(current);
    expect(response?.status(), `Failed to load ${current}`).toBe(200);

    // Find all links on the current page
    const links = await page.locator('a').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (!href) continue;

      // Filter internal links
      if (href.startsWith('/') && !href.startsWith('//')) {
        const fullUrl = new URL(href, base).pathname;
        if (!visited.has(fullUrl)) {
          toVisit.push(fullUrl);
        }
      } else if (href.startsWith(base)) {
        const fullUrl = new URL(href).pathname;
        if (!visited.has(fullUrl)) {
          toVisit.push(fullUrl);
        }
      }
      // Note: External links could also be checked but would make the test slower and dependent on external servers
    }
  }
});

test('check for 404 on invalid route', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  // Astro might handle this via a custom 404 or a default one
  // Typically it should return a 404 status code if handled correctly
  // but some SSG platforms might return 200 with a 404 message if not configured.
  // We expect a 404 status.
  expect(response?.status()).toBe(404);
});
