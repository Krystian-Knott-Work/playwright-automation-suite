import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  // Deklaracja typów (enkapsulacja)
  readonly page: Page;
  readonly getStartedButton: Locator;

  // Konstruktor przypisujący stronę i elementy
  constructor(page: Page) {
    this.page = page;
    this.getStartedButton = page.getByRole('link', { name: 'Get started' });
  }

  // Metody biznesowe
  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }
}