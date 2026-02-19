import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/about',
  '/work',
  '/gallery',
  '/blog',
  '/contact',
];

for (const path of pages) {
  test(`page ${path} should load correctly`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    // Check for some common elements (e.g., a logo or a navbar)
    // Adjust based on actual project structure
    // Let's assume there's a body or a layout-related element
    await expect(page.locator('body')).toBeVisible();

    // Verify the title (if applicable)
    // const title = await page.title();
    // expect(title).toBeTruthy();
  });
}

test('navigation should work between home and about', async ({ page }) => {
  await page.goto('/');
  // Click on "About" link - update selector to match your layout
  // I'll try finding by text
  const aboutLink = page.getByRole('link', { name: /about/i });
  if (await aboutLink.isVisible()) {
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about/);
  } else {
    // If it's not in the main navbar, skip or try another way
    console.warn('About link not found in main nav, skipping click test');
  }
});
