import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

// -------------------------------------------------
// TEST 1: Nawigacja z użyciem Page Object Model
// -------------------------------------------------
test('Nawigacja z użyciem Page Object Model', async ({ page }) => {
  const homePage = new HomePage(page);
  
  await homePage.goto();
  await homePage.clickGetStarted();

  await expect(page).toHaveURL(/.*intro/);
});

// -------------------------------------------------
// TEST 2: Walidacja statusu HTTP wyszukiwarki (Naprawiony)
// -------------------------------------------------
test('Walidacja statusu HTTP wyszukiwarki', async ({ page }) => {
  const homePage = new HomePage(page);
  
  // 1. Wchodzimy na stronę
  await homePage.goto();

  // 2. Zaczynamy nasłuchiwać ruchu (bez await przed zmienną)
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('docsearch') && response.status() === 200
  );

  // 3. Wykonujemy akcje, które faktycznie wysyłają zapytanie do serwera
  await page.getByLabel('Search').click();
  await page.getByPlaceholder('Search docs').fill('playwright');

  // 4. Czekamy na odpowiedź serwera
  const response = await responsePromise;

  // 5. Sprawdzamy czy backend poprawnie odpowiedział
  expect(response.status()).toBe(200);
});