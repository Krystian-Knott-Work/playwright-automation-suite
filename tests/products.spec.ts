import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login.page';
import {ProductPage} from '../pages/products.page';

let loginPage: LoginPage;
let productPage: ProductPage;

const sortingOptions = [
  { option: 'az', expectedFirstProduct: 'Sauce Labs Backpack' },
  { option: 'za', expectedFirstProduct: 'Test.allTheThings() T-Shirt (Red)' },
  { option: 'lohi', expectedFirstProduct: 'Sauce Labs Onesie' },
  { option: 'hilo', expectedFirstProduct: 'Sauce Labs Fleece Jacket' }
]

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);

  await page.goto('/');
  await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
})

test.describe('Sorting functionality', () => {

    test('Should display exactly 6 products on the page', async () => {
      await expect(productPage.productNames).toHaveCount(6);
    }); 

  for (const {option, expectedFirstProduct } of sortingOptions) {
    test(`Verify that products are sorted correctly by ${option}`, async () => {
  
      await productPage.sortBy(option);
      await expect(productPage.sauceLabsProduct).toHaveText(expectedFirstProduct);
    });
  }
});
