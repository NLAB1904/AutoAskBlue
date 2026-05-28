/erroAutenticacao.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';
import { LoginPage } from '../page objects/loginPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

const invalidUser = process.env.INVALID_USERNAME || 'utilizadorInvalido';
const invalidPass = process.env.INVALID_PASSWORD || 'senhaInvalida';

Given('que o utilizador está na página de login', async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

Given('introduz credenciais inválidas', async () => {
  await loginPage.enterUsername(invalidUser);
  await loginPage.enterPassword(invalidPass);
});

When('tenta autenticar-se', async () => {
  await loginPage.submit();
});

Then('o utilizador visualiza uma mensagem de erro de autenticação', async () => {
  const mensagem = await loginPage.getErrorMessage();
  expect(mensagem).toMatch(/credenciais inválidas|erro de autenticação/i);
  expect(page.url()).toContain('/login');
  await browser.close();
});