  import { Page, Locator } from '@playwright/test';

  export class ProductPage{
      readonly page: Page;
      readonly sortList: Locator;
      readonly sauceLabsProduct: Locator;

  constructor(page:Page){
    this.page = page;
    this.sortList = page.locator('.product_sort_container');
    this.sauceLabsProduct = page.locator('[data-test="inventory-item-name"]').first();
  }

  async sortBy(option: string) {
    await this.sortList.selectOption(option);
  }
}