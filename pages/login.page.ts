import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginPageTitle: Locator;
  readonly errorMessage: Locator;
  readonly errorMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', {name: 'Password'});
    this.loginButton = page.getByRole('button', { name: 'Login'});
    this.loginPageTitle = page.getByText('Swag Labs');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorMessageButton = page.locator('.error-button');
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}