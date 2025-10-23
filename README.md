# 💫 Support.io - Ferramenta de Análise de Performance, Disponibilidade e Segurança

Este projeto é uma aplicação web desenvolvida com **React**, **TypeScript**, **TailwindCSS** e **ShadCN UI** no frontend, e uma API em **Node.js**/**TypeScript** no backend. 

A ferramenta permite realizar testes de carga, monitorar o status de APIs (health check) e verificar configurações de DNS e certificados SSL.

---

## ✨ Funcionalidades

- **Teste de Carga**
  - Configuração de URL, número de requisições, concorrência, método (GET/POST) e payload JSON.
  - Visualização de estatísticas de sucesso/falha e tempos de resposta (mínimo, médio, máximo).
  - Gráficos interativos: distribuição de status codes, linha do tempo de resposta, histograma e tempo médio por status.

- **Monitoramento de Health Check**
  - Cadastro de endpoints para monitoramento contínuo de disponibilidade.
  - Relatórios de uptime e histórico de status.
  - Gráficos de tempo de resposta ao longo do tempo.
  - **Configuração de Alertas:** Defina limites de tempo de resposta e receba alertas por e-mail se um endpoint ficar lento ou indisponível.

- **Verificador de DNS e SSL**
  - Análise de registros DNS (A, AAAA, MX, TXT, NS) de qualquer domínio.
  - Verificação de validade, expiração e detalhes do emissor de certificados SSL.
  - **Análise de Segurança Avançada:**
    - **Verificação de Blacklist (DNSBL):** Identifica se o IP de um domínio está em listas de spam.
    - **Análise de Cabeçalhos HTTP:** Inspeciona cabeçalhos de resposta para avaliar configurações de segurança.

- **Relatórios e Análise**
  - Visualização interativa dos resultados dos testes.
  - Exportação de relatórios de teste de carga em formato JSON.
  - Histórico de testes com busca por data e URL.

- **Configuração de Alertas por E-mail (SMTP)**
  - Página dedicada para configurar um servidor SMTP para o envio de e-mails de alerta.
  - Validação da configuração através do envio de um e-mail de teste.

- **Notificações em Tempo Real**
  - Alertas instantâneos (toast notifications) sobre o status dos testes de carga (concluído ou falho) via WebSockets.
  - Redirecionamento automático para a página de resultados após a conclusão de um teste.

- **Interface e UX**
  - Interface responsiva com suporte a **Modo Escuro (Dark Mode)**.
  - Otimização de performance com **lazy loading** para componentes pesados.
  - Design moderno e intuitivo, focado em "Data Storytelling" para facilitar a interpretação dos dados.

---

## 📦 Tecnologias Utilizadas

- **Frontend**
  - React + Vite
  - TypeScript
  - TailwindCSS
  - ShadCN UI
  - Radix UI (Accordion)
  - Axios (chamadas HTTP)
  - React Router DOM (navegação)
  - Chart.js + react-chartjs-2 (gráficos)
  - FileSaver (exportação JSON)
  - Socket.io-client (notificações em tempo real)
  - React Hot Toast (toast notifications)

- **Backend**
  - Node.js
  - TypeScript
  - Express

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (para rodar com o gateway Nginx)

---

### 1. Clonar o Repositório

```bash
git clone https://github.com/luisfelix-93/load-tester-app.git
cd load-tester-app
```

---

### 2. Configuração do Ambiente

Este projeto utiliza um gateway Nginx para gerenciar as requisições para as APIs de backend. As URLs das APIs são configuradas em `nginx.conf`.

Para o desenvolvimento local, as APIs são acessadas através dos seguintes proxies:
- `/load-test` -> `http://localhost:4000`
- `/api` -> `http://localhost:5000`
- `/dns-cert` -> `http://localhost:5001`
- `/socket.io` -> `http://notification-svc:4004`

---

### 3. Rodar o Backend

O projeto é composto por múltiplos serviços de backend. Certifique-se de iniciar todos eles conforme as instruções em seus respectivos diretórios.

---

### 4. Rodar o Frontend

```bash
npm install
npm run dev
```

A aplicação frontend será iniciada na porta `5173`.

---

## 🖥️ Estrutura do Frontend

```
src/
 ├── api/               # Serviços de chamada HTTP
 ├── components/        # Componentes reutilizáveis
 │    ├── DnsResults/    # Exibe resultados de DNS
 │    ├── SslResults/    # Exibe resultados de SSL
 │    ├── HeaderResults/ # Exibe cabeçalhos HTTP
 │    ├── BlacklistResults/ # Exibe resultados de blacklist
 │    ├── Loading/       # Componente de fallback para lazy loading
 │    └── ...
 ├── context/           # Contextos React (ex: NotificationContext)
 ├── hooks/             # Hooks customizados (ex: use-media-query.ts)
 ├── lib/               # Funções utilitárias
 ├── pages/             # Páginas principais da aplicação
 │    ├── Analysis/      # Página de resultados da análise de DNS/SSL
 │    ├── DNS-Checker/   # Página para iniciar a verificação de DNS/SSL
 │    ├── DetalheResumo/ # Detalhes de um teste de carga
 │    ├── HC-Details/    # Detalhes de um endpoint de Health Check
 │    ├── Settings/      # Página de configurações (SMTP)
 │    └── ...
 ├── services/          # Serviços (ex: socket.ts)
 ├── App.tsx            # Configuração de rotas
 └── main.tsx           # Ponto de entrada do app
```

---

## 📈 Fluxo de Uso

1.  Acesse a página inicial para ver as ferramentas disponíveis.
2.  **Teste de Carga:** Configure os parâmetros e inicie um teste para analisar a performance de um endpoint.
3.  **Monitoramento de Health Check:** Cadastre endpoints para acompanhar a disponibilidade de suas APIs e configure alertas por e-mail.
4.  **Verificador de DNS e SSL:** Insira um domínio para verificar suas configurações de DNS, o estado do certificado SSL, status em blacklists e cabeçalhos HTTP.
5.  **Configurações:** Acesse a página de configurações para definir suas credenciais de SMTP.
6.  Navegue pelos relatórios e resultados detalhados de cada ferramenta.
7.  Alterne entre os temas Light e Dark conforme sua preferência.

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