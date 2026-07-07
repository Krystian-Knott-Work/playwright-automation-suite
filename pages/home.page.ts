import { type Page, type Locator } from '@playwright/test';

export class HomePage {

  readonly page: Page;
  readonly getStartedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedButton = page.getByRole('link', { name: 'Get started' });
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }
}