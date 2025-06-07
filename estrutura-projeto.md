# Estrutura do Projeto CryptoInvest

```
crypto-invest/
│
├── index.html                  # Página inicial
├── favicon.ico                 # Ícone do site
│
├── css/
│   ├── reset.css               # Reset de estilos padrão
│   ├── variables.css           # Variáveis CSS (cores, fontes, etc.)
│   ├── global.css              # Estilos globais
│   ├── components.css          # Estilos de componentes reutilizáveis
│   ├── home.css                # Estilos específicos da página inicial
│   ├── market.css              # Estilos da página de mercado
│   ├── coin-details.css        # Estilos da página de detalhes da moeda
│   ├── auth.css                # Estilos para login/cadastro
│   ├── dashboard.css           # Estilos do painel do usuário
│   ├── about.css               # Estilos da página sobre nós
│   └── contact.css             # Estilos da página de contato
│
├── js/
│   ├── main.js                 # JavaScript global
│   ├── menu.js                 # Lógica do menu responsivo
│   ├── market.js               # Lógica da página de mercado (filtros, busca)
│   ├── charts.js               # Lógica para gráficos simulados
│   ├── form-validation.js      # Validação de formulários
│   ├── auth.js                 # Simulação de autenticação
│   ├── dashboard.js            # Lógica do painel do usuário
│   └── theme.js                # Alternância de tema claro/escuro
│
├── img/
│   ├── logo/                   # Logotipos do site
│   ├── icons/                  # Ícones utilizados
│   ├── coins/                  # Ícones das criptomoedas
│   ├── team/                   # Fotos da equipe
│   └── backgrounds/            # Imagens de fundo
│
└── pages/
    ├── market.html             # Página de mercado
    ├── coin-details.html       # Template para página de detalhes da moeda
    ├── login.html              # Página de login
    ├── register.html           # Página de cadastro
    ├── dashboard.html          # Painel do usuário
    ├── about.html              # Página sobre nós
    └── contact.html            # Página de contato
```

## Descrição dos Arquivos Principais

### HTML
- **index.html**: Página inicial com destaques e chamadas para ação
- **pages/market.html**: Lista de criptomoedas com filtros
- **pages/coin-details.html**: Detalhes específicos de uma criptomoeda
- **pages/login.html** e **pages/register.html**: Formulários de autenticação
- **pages/dashboard.html**: Painel do usuário com informações simuladas
- **pages/about.html**: Informações sobre a empresa
- **pages/contact.html**: Formulário de contato e informações

### CSS
- **reset.css**: Normalização de estilos entre navegadores
- **variables.css**: Definição de variáveis CSS para cores, fontes, etc.
- **global.css**: Estilos globais aplicados a todo o site
- **components.css**: Estilos de componentes reutilizáveis (botões, cards, etc.)
- Arquivos CSS específicos para cada página

### JavaScript
- **main.js**: Funções globais e inicialização
- **menu.js**: Controle do menu responsivo
- **market.js**: Lógica para filtros e busca na página de mercado
- **charts.js**: Criação de gráficos simulados
- **form-validation.js**: Validação de formulários
- **auth.js**: Simulação de autenticação (sem backend)
- **dashboard.js**: Lógica para o painel do usuário
- **theme.js**: Alternância entre tema claro e escuro

