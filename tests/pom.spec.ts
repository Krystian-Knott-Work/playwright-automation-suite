import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('Nawigacja z użyciem Page Object Model', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goto();
  await homePage.clickGetStarted();

  await expect(page).toHaveURL(/.*intro/);
});

test('Walidacja statusu HTTP wyszukiwarki', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goto();

  const responsePromise = page.waitForResponse(response => 
    response.url().includes('docsearch') && response.status() === 200
  );

  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search docs').fill('playwright');

  const response = await responsePromise;

  expect(response.status()).toBe(200);
});