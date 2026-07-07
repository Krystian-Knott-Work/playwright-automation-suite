import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login.page';
test('First exercise', async ({page}) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByPlaceholder('What needs to be done?').fill('Wypić Kawe');
  await page.keyboard.press('Enter');

  await page.getByPlaceholder('What needs to be done?').fill('Napisać test w Playwright');
  await page.keyboard.press('Enter');

  await page.locator('.toggle').first().check();
  await expect(page.locator('.todo-count')).toHaveText('1 item left');
});

test('Login test', async ({page}) => {

  const loginPage = new LoginPage(page);

await page.goto('https://www.saucedemo.com/');
await loginPage.login('standard_user', 'secret_sauce');

await expect(page.getByText('Products')).toBeVisible();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
