# 💫 Load Tester - Ferramenta de Teste de Carga

Este projeto é uma aplicação de teste de carga desenvolvida com **React**, **TypeScript**, **TailwindCSS** e **ShadCN UI** no frontend, e uma API em **Node.js**/**TypeScript** no backend.

A ferramenta permite enviar um número configurável de requisições HTTP para uma URL alvo e visualizar estatísticas e gráficos de desempenho.

---

## ✨ Funcionalidades

- Configuração personalizada de:
  - URL alvo
  - Número de requisições
  - Nível de concorrência
  - Método (GET/POST) e envio de payload JSON
- Exibição de resultados:
  - Número de sucessos e falhas
  - Tempo total de resposta (mínimo, médio e máximo)
  - Tempo para o primeiro e último byte
- Gráficos:
  - Status code por requisição (pizza)
  - Tempo de resposta por requisição (linha)
  - Histograma dos tempos de resposta
  - Tempo médio por status code (barras)
- Relatórios:
  - Visualização interativa em páginas de relatório com rolagem vertical (snap)
  - Exportação dos resultados como JSON
  - Busca de relatórios por intervalo de datas
- Monitoramento de Health Check de APIs:
  - Acompanhamento do status (Online/Offline) de endpoints configurados.
  - Análise de tempos de resposta de health checks ao longo do tempo.
  - Análise dos retornos da API em todo o monitoramento, com visualização dos logs em JSON.
  - Páginas dedicadas para monitoramento geral e detalhes de cada endpoint.
- Interface responsiva e moderna com **TailwindCSS** + **ShadCN UI**:
  - Suporte a **Modo Escuro (Dark Mode)** com seletor de tema.

---

## 📦 Tecnologias Utilizadas

- **Frontend**
  - React + Vite
  - TypeScript
  - TailwindCSS
  - ShadCN UI
  - Axios (para chamadas HTTP)
  - React Router DOM (navegação)
  - Chart.js + react-chartjs-2 (gráficos)
  - FileSaver (exportação JSON)

- **Backend**
  - Node.js
  - TypeScript
  - Express
  - Load testing engine próprio

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

---

### 1. Clonar o Repositório

```bash
git clone https://github.com/luisfelix-93/load-tester-app.git
cd load-tester-app
```

---

### 2. Rodar o Backend

```bash
cd backend
npm install
npm run dev
```

O backend será iniciado na porta `4000`.

---

### 3. Rodar o Frontend

Em outra aba/terminal:

```bash
cd load-tester-app
npm install
npm run dev
```

O frontend será iniciado na porta `5173`.

---

## 🖥️ Estrutura do Frontend

```
src/
 ├── api/               # Serviços de chamada HTTP (ex: loadtester.ts)
 ├── components/        # Componentes reutilizáveis (Cards, Charts, Layout, etc.)
 │    ├── AverageTimeByStatusChart/
 │    ├── Layout/
 │    ├── LogDisplay/    # Exibe os logs de Health Check
 │    ├── NavBar/
 │    ├── ThemeProvider/ # Provedor de tema (Dark Mode)
 │    └── ...
 ├── lib/               # Funções utilitárias (ex: utils.ts)
 ├── pages/             # Páginas principais do app
 │    ├── DetalheResumo/
 │    ├── Error/
 │    ├── HC-Details/    # Detalhes do Health Check de um endpoint
 │    ├── HC-Monitor/    # Monitoramento geral de Health Checks
 │    ├── Home/
 │    ├── Loading/
 │    ├── Relatorios/
 │    ├── Resumo/
 │    └── Teste/
 ├── App.tsx            # Configuração de rotas
 └── main.tsx           # Ponto de entrada do app
```

---

## 📈 Fluxo de Uso

1. Acesse a página inicial.
2. Informe a URL alvo, o número de requisições, concorrência, método (GET/POST) e payload (se POST).
3. Inicie o teste.
4. Veja o resumo dos resultados, incluindo gráficos de desempenho.
5. Navegue pelos relatórios anteriores ou busque por intervalo de datas.
6. Exporte os resultados como JSON, se desejar.
7. Acesse a seção de Monitoramento de Health Check para acompanhar a disponibilidade das suas APIs.
8. Alterne entre os temas Light e Dark no seletor de tema no canto superior direito.

---

## 🛠️ Melhorias Futuras

- Exportação dos resultados em CSV
- Suporte a autenticação (JWT, Basic Auth)
- Implementação de filas de teste para múltiplos usuários
- Filtros avançados nos relatórios

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.  
Sinta-se livre para usar, modificar e contribuir!

---

# ⚡ Desenvolvido por

Luis Felipe Felix Filho  
[LinkedIn](https://www.linkedin.com/in/luis-felix-filho/) • [GitHub](https://github.com/luisfelix-93)

---

## Badges

```markdown
![React](https://img.shields.io/badge/React-19.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
```