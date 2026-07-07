  import { Page, Locator } from '@playwright/test';

  export class ProductPage{
      readonly page: Page;
      readonly sortList: Locator;
      readonly sauceLabsProduct: Locator;
      readonly hamburgerMenu: Locator;
      readonly logoutLink: Locator;


  constructor(page:Page){
    this.page = page;
    this.sortList = page.locator('.product_sort_container');
    this.sauceLabsProduct = page.locator('[data-test="inventory-item-name"]').first();
    this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu'});
    this.logoutLink = page.getByRole('link', { name: 'Logout'});
  }

  async sortBy(option: string) {
    await this.sortList.selectOption(option);
  }

  async logout() {
    await this.hamburgerMenu.click();
    await this.logoutLink.click();
  }
}