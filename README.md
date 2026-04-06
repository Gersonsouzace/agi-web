# AGI Blog - Testes Automatizados com Playwright

Projeto de automação de testes end-to-end (E2E) para o [Blog do AGI](https://blog.agibank.com.br/), desenvolvido com **Playwright** e **TypeScript**.

## 📋 Sobre o Projeto

Este projeto automatiza testes críticos da funcionalidade de pesquisa de artigos do Blog do AGI, garantindo que:
- A página carrega corretamente com o título esperado
- Buscas por termos existentes retornam resultados
- Buscas por termos inexistentes exibem mensagens apropriadas

## 🛠️ Tecnologias

- **Playwright** - Framework de testes automatizados
- **TypeScript** - Linguagem de programação
- **Node.js** - Runtime JavaScript
- **Allure Reports** - Geração de relatórios detalhados
- **GitHub Actions** - CI/CD

## 🚀 Instalação e Setup

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos

1. **Clonar o repositório**
```bash
git clone <repository-url>
cd teste_agi
```

2. **Instalar dependências**
```bash
npm install
```

3. **Instalar browser Chromium**
```bash
npx playwright install --with-deps chromium
```

## 📝 Executando os Testes

### Modo interativo (UI)
```bash
npx playwright test --ui
```

### Modo headless (padrão)
```bash
npm test
```

### Executar teste específico
```bash
npx playwright test tests/example.spec.ts
```

### Debug mode
```bash
npx playwright test --debug
```

## 📊 Relatórios

Após executar os testes, os relatórios são gerados automaticamente:

### Relatório HTML
```bash
npx playwright show-report
```

### Relatório Allure (CI)
O relatório Allure é gerado automaticamente no pipeline do GitHub Actions.

## 🧪 Cenários de Teste

### 1. Validar Título da Página
- **Objetivo**: Verificar que a página carrega com o título correto
- **Arquivo**: `tests/example.spec.ts`

### 2. Busca por Termo Existente
- **Objetivo**: Validar que a pesquisa por "empréstimo" retorna artigos relevantes
- **Validação**: Verifica se há pelo menos um resultado

### 3. Busca por Termo Inexistente
- **Objetivo**: Validar o tratamento de buscas sem resultados
- **Validação**: Verifica a exibição da mensagem "Nenhum resultado encontrado"

## 🔄 CI/CD - GitHub Actions

O projeto inclui automação com **GitHub Actions** que:

- ✅ Executa em cada push/PR para `main` ou `master`
- ✅ Instala dependências com `npm ci`
- ✅ Executa testes com Chromium apenas
- ✅ Gera relatório HTML automático
- ✅ Gera relatório Allure
- ✅ Faz upload dos relatórios como artifacts (retenção de 30 dias)

**Arquivo**: `.github/workflows/playwright.yml`

## 📁 Estrutura do Projeto

```
teste_agi/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD configuration
├── tests/
│   └── example.spec.ts             # Testes automatizados
├── playwright.config.ts            # Configuração Playwright
├── package.json                    # Dependências do projeto
└── README.md                        # Este arquivo
```

## ⚙️ Configuração

### playwright.config.ts

Configurações principais:

- **baseURL**: `https://blog.agibank.com.br/`
- **actionTimeout**: 5 segundos (máximo configurado)
- **Browser**: Chromium apenas
- **Retry**: 2 tentativas em CI, 0 em local
- **Reporters**: HTML (local) + Allure (CI)

## 🐛 Troubleshooting

### Testes falhando localmente
```bash
# Limpar cache do Playwright
rm -rf ~/.cache/ms-playwright
npx playwright install --with-deps chromium
```

### Relatórios não gerados
```bash
# Verificar se Allure CLI está instalado
npx allure --version

# Gerar manualmente
npx allure generate allure-results --clean
```

## 📚 Referências

- [Documentação Playwright](https://playwright.dev/docs/intro)
- [Blog do AGI](https://blog.agibank.com.br/)
- [Allure Reports](https://docs.qameta.io/allure/)

## 📝 Licença

ISC

---
