/LoginPage.ts
import { Page, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto(process.env.BASE_URL || 'https://app-under-test.example.com');
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.fill('input[name="username"]', username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.fill('input[name="password"]', password);
  }

  async submit(): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.click('button[type="submit"]')
    ]);
  }

  async loginAsCoordenador(): Promise<void> {
    await this.goto();
    await this.fillUsername(process.env.COORDENADOR_USERNAME || 'coord_agencia');
    await this.fillPassword(process.env.COORDENADOR_PASSWORD || 'Password123!');
    await this.submit();
    await expect(this.page.locator('#perfil-corrente')).toHaveText(/Coordenador de Agência/i);
  }
}