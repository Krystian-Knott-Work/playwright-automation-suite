import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login.page';
import {ProductPage} from '../pages/products.page';

let loginPage: LoginPage;
let productPage: ProductPage;

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);
    await page.goto('/');
})

test('Verify successful login with valid credentials', async ({page}) => {
  await expect(loginPage.loginPageTitle).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
  await expect(loginPage.usernameInput).toHaveAttribute('placeholder', 'Username');
  await expect(loginPage.passwordInput).toHaveAttribute('placeholder', 'Password');

  await expect(page).toHaveURL(/.*saucedemo\.com\/?/);

  await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

  await expect(page.getByText('Products')).toBeVisible();
  await expect(page).toHaveURL(/.*inventory\.html/);
});

test('Verify successful logout redirects to login screen', async ({page}) => {

  await expect(page).toHaveURL(/.*saucedemo\.com\/?/);

  await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
  await expect(page).toHaveURL(/.*inventory\.html/);
  await expect(page.getByText('Products')).toBeVisible();

  await productPage.logout();
  await expect(page).toHaveURL(/.*saucedemo\.com\/?/);

  await expect(loginPage.loginButton).toBeEnabled();
});

test('Verify locked out user receives appropriate error message', async ({page}) => {
  await loginPage.login(process.env.SAUCE_LOCKED_USER!, process.env.SAUCE_PASSWORD!);
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  await loginPage.errorMessageButton.click();
  await expect(loginPage.errorMessageButton).toBeHidden();

  await expect(page).toHaveURL(/.*saucedemo\.com\/?/);
});