/erroAutenticacao.steps.ts
import { Before, After, Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';
import { LoginPage } from '../page objects/loginPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

const INVALID_USER = process.env.INVALID_USERNAME || 'utilizadorInvalido';
const INVALID_PASS = process.env.INVALID_PASSWORD || 'senhaInvalida';

Before(async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
});

After(async () => {
  await browser.close();
});

Given('que o utilizador está na página de login', async () => {
  await loginPage.navigate();
});

Given('introduz credenciais inválidas', async () => {
  await loginPage.enterUsername(INVALID_USER);
  await loginPage.enterPassword(INVALID_PASS);
});

When('tenta autenticar-se', async () => {
  await loginPage.submit();
});

Then('o utilizador visualiza uma mensagem de erro de autenticação', async () => {
  const mensagem = await loginPage.getErrorMessage();
  expect(mensagem).toMatch(/credenciais inválidas|erro de autenticação/i);
  expect(page.url()).toContain('/login');
});