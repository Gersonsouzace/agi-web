import { test, expect, Page } from '@playwright/test';

// ==================================================
// Helper: abre a lupa e realiza a busca
// ==================================================
async function realizarBusca(page: Page, termo: string): Promise<void> {
  // Clica no ícone da lupa para abrir o campo de busca
  await page.locator('div.ast-search-menu-icon.slide-search').click();

  // Aguarda o input ficar visível após a animação
  const inputBusca = page.locator(
    '.ast-search-menu-icon.slide-search input[type="search"]'
  );
  await inputBusca.waitFor({ state: 'visible' });

  // Digita o termo e submete
  await inputBusca.fill(termo);
  await inputBusca.press('Enter');

  // Aguarda a navegação para a página de resultados
  await page.waitForURL(`**/?s=**`, { waitUntil: 'domcontentloaded' });
}

// ==================================================
// Cenário 1 — Busca com termo válido: "Investimentos"
// ==================================================
test('CT01 - Deve exibir artigos ao buscar por um termo válido', async ({ page }) => {
  await page.goto('https://blog.agibank.com.br/');

  await realizarBusca(page, 'Investimentos');

  // Valida que a URL contém o parâmetro de busca correto
  await expect(page).toHaveURL(/s=Investimentos/);

  // Valida que o título da página de resultados menciona o termo buscado
  await expect(page.locator('h1.page-title, .page-header h1, .search-title')).toContainText(
    /Investimentos/i
  );
});

// ==================================================
// Cenário 2 — Busca com termo inválido: sem resultados
// ==================================================
test('CT02 - Deve exibir mensagem de "sem resultados" ao buscar por termo inexistente', async ({ page }) => {
  await page.goto('https://blog.agibank.com.br/');

  const termoInexistente = 'xkqzwvterm123456789';
  await realizarBusca(page, termoInexistente);

  // Valida que a URL contém o parâmetro de busca
  await expect(page).toHaveURL(new RegExp(`s=${termoInexistente}`));

  // Valida que NENHUM artigo foi retornado
  const artigos = page.locator('article');
  await expect(artigos).toHaveCount(0);

  // Valida que uma mensagem de "sem resultados" está visível
  // O tema Astra/WordPress exibe essa mensagem no seletor abaixo
  const mensagemSemResultados = page.locator(
    '.no-results, .not-found, .search-no-results, p:has-text("nenhum resultado"), p:has-text("Nada encontrado")'
  );
  await expect(mensagemSemResultados.first()).toBeVisible();
});