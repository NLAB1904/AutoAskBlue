/DowJonesPage.ts
import { Page, expect } from '@playwright/test';

export class DowJonesPage {
  private campoNome = 'input[name="fullName"]';
  private botaoPesquisar = 'button[data-test-id="screening-search"]';
  private etiquetaCategoria = 'data-test-id=screening-category';
  private etiquetaEstado = 'data-test-id=transaction-status';

  constructor(private readonly page: Page) {}

  async navegar() {
    await this.page.goto('/dow-jones-screening');
  }

  async preencherNomeCompleto(nome: string) {
    await this.page.fill(this.campoNome, nome);
  }

  async executarFiltragem() {
    await this.page.click(this.botaoPesquisar);
  }

  async verificarCategoriaEsperada() {
    await expect(this.page.locator(this.etiquetaCategoria)).toHaveText(/Titular de outro cargo político\/público/i);
  }

  async verificarTransacaoBloqueada() {
    await expect(this.page.locator(this.etiquetaEstado)).toHaveText(/Bloqueada para análise do Gabinete de Conformidade/i);
  }
}