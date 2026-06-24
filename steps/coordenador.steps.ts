/coordenador.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { Page, Browser, chromium } from '@playwright/test';
import { LoginPage } from '../page objects/LoginPage';
import { TransactionPage } from '../page objects/TransactionPage';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let transactionPage: TransactionPage;

Given('que o utilizador está autenticado como Coordenador de Agência', async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  transactionPage = new TransactionPage(page);
  await loginPage.loginAsCoordenador();
});

When('inicia uma transação ocasional do tipo {int} com dados mínimos', async function (tipo: number) {
  await transactionPage.startOccasionalTransaction(tipo as 1 | 2 | 3);
  await transactionPage.fillMinimalData();
  await transactionPage.submit();
});

Then('o sistema deve autorizar a execução da operação', async function () {
  await transactionPage.expectTransactionSuccess();
  await browser.close();
});