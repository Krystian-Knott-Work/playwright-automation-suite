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

test('Verify that products are sorted correctly', async ({page}) => {

  await loginPage.login('standard_user', 'secret_sauce');
  
  await productPage.sortBy('lohi');
  await expect(productPage.sauceLabsProduct).toHaveText('Sauce Labs Onesie');
});
