# 💫 Load Tester - Ferramenta de Teste de Carga

Este projeto é uma aplicação de teste de carga desenvolvida com **React**, **TailwindCSS** e **ShadCN UI** no frontend, e uma API em **Node.js**/**TypeScript** no backend.

A ferramenta permite enviar um número configurável de requisições HTTP para uma URL alvo e visualizar estatísticas e gráficos de desempenho.

---

## ✨ Funcionalidades

- Configuração personalizada de:
  - URL alvo
  - Número de requisições
  - Nível de concorrência
- Exibição de resultados:
  - Número de sucessos e falhas
  - Tempo total de resposta (mínimo, médio e máximo)
  - Tempo para o primeiro e último byte
- Gráficos:
  - Status code por requisição
  - Tempo de resposta por requisição
- Interface responsiva e moderna com **TailwindCSS** + **ShadCN UI**

---

## 📦 Tecnologias Utilizadas

- **Frontend**
  - React + Vite
  - TypeScript
  - TailwindCSS
  - ShadCN UI
  - Axios (para chamadas HTTP)
  - React Router DOM (navegação)

- **Backend**
  - Node.js
  - TypeScript
  - Express
  - Load testing engine próprio

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

---

### 1. Clonar o Repositório

```bash
git clone https://github.com/luisfelix-93/load-tester-app.git
cd load-tester
```

---

### 2. Rodar o Backend

```bash
cd backend
yarn install
yarn dev
```

O backend será iniciado na porta `5173`.

---

### 3. Rodar o Frontend

Em outra aba/terminal:

```bash
cd frontend
yarn install
yarn dev
```

O frontend será iniciado na porta `5173`.

---

## 🖥️ Estrutura do Frontend

```
src/
 ├── api/               # Serviços de chamada HTTP
 ├── components/        # Componentes reutilizáveis (Cards, Charts, etc.)
 ├── pages/
 │    ├── Home/         # Página para iniciar o teste
 │    └── Resumo/       # Página para visualizar resultados
 └── App.tsx            # Configuração de rotas
```

---

## 📈 Exemplo de Fluxo de Uso

1. Acesse a página inicial.
2. Informe a URL alvo, o número de requisições e a concorrência desejada.
3. Inicie o teste.
4. Veja o resumo dos resultados, incluindo gráficos de desempenho.

---

## 🛠️ Melhorias Futuras

- Exportação dos resultados (JSON/CSV)
- Suporte a testes POST/PUT (envio de payloads)
- Testes de autenticação (JWT, Basic Auth)
- Implementação de filas de teste para múltiplos usuários

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.  
Sinta-se livre para usar, modificar e contribuir!

---

# ⚡ Desenvolvido por

Luis Felipe Felix Filho  
[LinkedIn](https://www.linkedin.com/in/luis-felix-filho/) • [GitHub](https://github.com/luisfelix-93)

---

## Extras (se quiser adicionar badges)

```markdown
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
```

