import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test ('Nawigacja z użyciem Page Object Model', async ({page}) => {

  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickGetStarted();

  await expect(page).toHaveURL(/.*intro/);
});