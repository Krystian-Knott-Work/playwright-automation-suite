import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/products.page';

test.describe('Full Purchase Flow', () => {
  test('Should complete the full purchase process', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await page.goto('/');
    await loginPage.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    await expect(page).toHaveURL(/.*inventory.html/);

    await productPage.addToCart('Sauce Labs Backpack');
    await expect(productPage.cartBadge).toHaveText('1');

    await productPage.goToCart(); 
    await expect(page).toHaveURL(/.*cart.html/);

    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Krystian');
    await page.fill('[data-test="lastName"]', 'Tester');
    await page.fill('[data-test="postalCode"]', '31-001');
    await page.click('[data-test="continue"]');

    await page.click('[data-test="finish"]');
    
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL(/.*checkout-complete.html/);
  });
});