/tocpp.steps.ts
import { Before, After, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { DowJonesPage } from '../page objects/DowJonesPage';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;
let dowJonesPage: DowJonesPage;

Before(async () => {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  dowJonesPage = new DowJonesPage(page);
});

After(async () => {
  await browser.close();
});

Given('que existe um interveniente listado como TOCPP na Dow Jones', async () => {
  // Pré-condição assumida: a base de dados Dow Jones já contém o interveniente
  await dowJonesPage.navegar();
});

When('registo o nome completo do interveniente {string} e executo a filtragem', async (nomeCompleto: string) => {
  await dowJonesPage.preencherNomeCompleto(nomeCompleto);
  await dowJonesPage.executarFiltragem();
});

Then('o sistema identifica a categoria TOCPP e bloqueia a transação', async () => {
  await dowJonesPage.verificarCategoriaEsperada();
  await dowJonesPage.verificarTransacaoBloqueada();
});