/loginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#loginButton';
  private readonly errorMessage = '#errorMessage';
  private readonly baseUrl = process.env.BASE_URL || 'https://demo-ngt.creditoagricola.pt';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto(`${this.baseUrl}/login`);
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