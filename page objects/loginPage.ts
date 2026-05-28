/loginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#loginButton';
  private readonly errorMessage = '#errorMessage';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://demo-ngt.creditoagricola.pt/login');
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  async submit(): Promise<void> {
    await this.page.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string | null> {
    return (await this.page.isVisible(this.errorMessage))
      ? await this.page.textContent(this.errorMessage)
      : null;
  }
}