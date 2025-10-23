## Release Notes (2025-10-23)

#### ✨ Novas Funcionalidades

- **Configuração de Servidor de E-mail (SMTP):**
  - Adicionada uma nova página de **Configurações** que permite aos usuários configurar um servidor SMTP para o envio de e-mails de alerta.
  - O formulário inclui campos para host, porta, usuário, senha e uma opção para conexão segura (TLS).
  - As credenciais são armazenadas de forma segura, e a senha não é exposta na interface após ser salva.
  - É possível enviar um e-mail de teste para validar as configurações antes de salvar.

- **Notificações em Tempo Real com WebSockets:**
  - Implementado um sistema de notificações em tempo real usando **Socket.io**.
  - Agora, os usuários recebem um alerta (`toast`) quando um teste de carga é concluído ou falha, sem a necessidade de atualizar a página.
  - A página de "carregando" (durante um teste) agora aguenta a finalização do processo e redireciona o usuário automaticamente para a página de resultados.

- **Análise de Segurança Aprimorada:**
  - **Verificação de Blacklist:** A análise de domínio agora verifica se o IP do servidor está em listas de DNSBL (DNS-based Blackhole List), ajudando a identificar se o domínio está associado a spam ou atividades maliciosas.
  - **Análise de Cabeçalhos HTTP:** A ferramenta agora exibe os cabeçalhos de resposta HTTP do servidor, permitindo uma análise mais profunda de configurações de segurança e performance.

- **Alertas de Health Check Personalizáveis:**
  - Ao adicionar ou editar um endpoint de monitoramento, agora é possível configurar alertas por e-mail.
  - Os alertas podem ser disparados com base em um **limite de tempo de resposta** (em milissegundos).
  - O usuário pode especificar um **e-mail de destino** para receber os alertas.

#### 🎨 Melhorias de UI/UX

- **Componentes Atualizados para o Tema:**
  - O componente de **Modal** foi ajustado para respeitar o tema (claro/escuro), garantindo uma aparência consistente.
  - O campo de **Input** agora possui um estilo aprimorado para o modo escuro.
- **Feedback Visual:**
  - A interface agora utiliza notificações (`toasts`) para fornecer feedback claro sobre ações como salvar configurações, enviar testes de e-mail e conclusão de testes de carga.
- **Carregamento Otimizado:**
  - Os componentes de resultados na página de análise (`DNS`, `SSL`, `Headers`, `Blacklist`) agora são carregados de forma assíncrona (`lazy loading`), melhorando o tempo de carregamento inicial da página.

#### 🔧 Outras Alterações

- **Atualização de Dependências:**
  - Adicionadas as bibliotecas `react-hot-toast` e `socket.io-client`.
  - Outras dependências do projeto foram atualizadas para suas versões mais recentes, garantindo mais segurança e performance.
- **Configuração de Proxy:**
  - O arquivo `nginx.conf` foi atualizado para lidar com as conexões WebSocket (`/socket.io/`), garantindo que as notificações em tempo real funcionem corretamente em um ambiente de produção com proxy reverso.