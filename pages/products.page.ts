  import { Page, Locator } from '@playwright/test';

  export class ProductPage{
      readonly page: Page;
      readonly sortList: Locator;
      readonly sauceLabsProduct: Locator;
      readonly hamburgerMenu: Locator;
      readonly logoutLink: Locator;
      readonly productNames: Locator;
      readonly cartIcon: Locator;
      readonly cartBadge: Locator;


  constructor(page:Page){
    this.page = page;
    this.sortList = page.locator('.product_sort_container');
    this.sauceLabsProduct = page.locator('[data-test="inventory-item-name"]').first();
    this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu'});
    this.logoutLink = page.getByRole('link', { name: 'Logout'});
    this.productNames = page.locator('.inventory_item_name');
    this.productNames = page.locator('.inventory_item_name');
    this.cartIcon = page.locator('.shopping_cart_link'); 
    this.cartBadge = page.locator('.shopping_cart_badge');

  }

  async sortBy(option: string) {
    await this.sortList.selectOption(option);
  }

  async logout() {
    await this.hamburgerMenu.click();
    await this.logoutLink.click();
  }
  
async addToCart(productName: string) {
    const productItem = this.page.locator('.inventory_item', { hasText: productName });
    await productItem.getByRole('button', { name: 'Add to cart' }).click();
  }
  async goToCart() {
    await this.cartIcon.click();
  }
  async proceedToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, zip: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finishPurchase() {
    await this.page.locator('[data-test="finish"]').click();
  }
}