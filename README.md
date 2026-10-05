# Robson Svicero | Site Institucional

Site institucional e plataforma de presença digital para Robson Svicero, com foco em posicionamento profissional, geração de oportunidades de negócio, serviços de criação de sites e conteúdo estratégico.

O projeto foi desenvolvido em React com Vite, com páginas institucionais, blog, área administrativa e suporte para deploy em ambiente de produção com servidor Express.

## Visão geral

Este projeto tem como objetivo apresentar a marca, os serviços, o método de trabalho e os projetos realizados por Robson Svicero, além de facilitar:

- captação de leads via WhatsApp e formulário de contato;
- apresentação da oferta de serviços e planos;
- publicação de conteúdo editorial no blog;
- gestão de páginas e conteúdo por meio de integrações externas;
- publicação em produção com otimização de SEO e performance.

## Funcionalidades principais

- Landing pages e páginas institucionais dedicadas;
- Navegação com rotas dinâmicas em React Router;
- Blog com artigos, comentários e compartilhamento;
- Página de serviços e páginas específicas por especialidade;
- Área administrativa para gerenciamento de conteúdo e campanhas;
- Integração com Supabase para dados e conteúdo;
- Integração com Brevo para comunicação, leads e contatos;
- Webhooks para rebuild e deploy automatizado;
- Geração de sitemap e páginas estáticas no processo de build;
- Layout responsivo e foco em UX/UI.

## Stack tecnológica

- React 19
- Vite 8
- React Router
- Express
- Supabase JS
- Tiptap (editor de conteúdo)
- Lucide React
- ExcelJS
- Google Analytics / GA4
- HTML/CSS/JS modernos

## Estrutura do projeto

```bash
.
├── public/                     # Assets estáticos, imagens, sitemap, robots, manifest
├── scripts/                    # Geração de conteúdo, sitemap e páginas estáticas
├── server.js                   # Servidor Express para produção
├── src/
│   ├── app/                   # Aplicação principal
│   ├── components/            # Componentes reutilizáveis
│   ├── content/               # Conteúdo e navegação do site
│   ├── data/                  # Dados de serviços, projetos e conteúdo
│   ├── hooks/                 # Hooks customizados
│   ├── lib/                   # Integrações e utilidades
│   ├── pages/                 # Páginas do site
│   ├── routes/                # Definição das rotas
│   ├── sections/              # Seções específicas da home e páginas
│   ├── styles/                # Estilos globais
│   ├── utils/                 # Helpers e utilitários
│   └── main.jsx               # Ponto de entrada da aplicação
├── .env.example               # Modelo das variáveis de ambiente
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── server.js
└── README.md
```

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js 18+ (recomendado 20+)
- npm
- Acesso ao Supabase e ao Brevo, conforme integrações ativas

## Configuração do ambiente

1. Clone o repositório:

```bash
git clone https://github.com/robsonsvicero/robson-svicero.git
cd robson-svicero
```

2. Instale as dependências:

```bash
npm install
```

3. Copie o arquivo de exemplo de variáveis de ambiente:

```bash
copy .env.example .env
```

4. Ajuste os valores de acordo com o ambiente local ou de produção.

## Variáveis de ambiente

O projeto utiliza as seguintes variáveis (veja `.env.example`):

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
BREVO_API_KEY=
BREVO_CONTACTS_FOLDER_ID=
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=
BREVO_WEBHOOK_TOKEN=
HOSTINGER_REBUILD_SECRET=
VITE_HOSTINGER_REBUILD_SECRET=
```

### Descrição rápida

- `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`: acesso para front-end com Supabase
- `SUPABASE_URL` e `SUPABASE_ANON_KEY`: uso em integrações do backend ou serviços server-side
- `BREVO_*`: configuração para envio de comunicação e integração com contatos
- `HOSTINGER_REBUILD_SECRET` e `VITE_HOSTINGER_REBUILD_SECRET`: autenticação para trigger de rebuild/atualização do site

## Scripts disponíveis

No `package.json`, os principais comandos são:

```bash
npm run dev
```
Inicia o ambiente de desenvolvimento com Vite.

```bash
npm run build
```
Executa geração de conteúdo, sitemap, build da aplicação e páginas estáticas.

```bash
npm run preview
```
Pré-visualiza a build localmente.

```bash
npm start
```
Executa o servidor Express de produção em `server.js`.

## Como rodar em desenvolvimento

```bash
npm install
npm run dev
```

A aplicação ficará disponível em:

```text
http://127.0.0.1:5173
```

## Como rodar em produção

Para produção, o projeto pode ser servido a partir da pasta `dist` com o servidor Express:

```bash
npm run build
npm start
```

O servidor escuta na porta configurada por `PORT`, ou por padrão em `8080`.

## Deploy

O projeto foi pensado para funcionar em ambientes de deploy estático/Node, incluindo integrações com rebuild via webhook. A rota `/api/rebuild` em `server.js` realiza o rebuild quando chamada com segredo válido.

## Boas práticas adotadas

- organização por páginas, seções e componentes;
- estrutura modular para fácil manutenção;
- separação de conteúdo e lógica;
- suporte a SEO e geração de páginas sob medida;
- uso de ambiente configurável via variáveis locais;
- atenção a performance e responsividade em dispositivos móveis.

## Contribuição

Contribuições são bem-vindas. Para colaborar:

1. Faça um fork do projeto;
2. Crie uma branch para sua feature ou correção;
3. Realize as alterações com commits descritivos;
4. Abra um pull request com contexto claro do objetivo da mudança.

## Licença

Este projeto não possui uma licença pública definida no repositório. Antes de reutilizar ou redistribuir o código, valide a política de uso e direitos do autor.

## Autor

Robson Svicero

## Contato

- WhatsApp: +55 11 96493-2007
- Site: https://robsonsvicero.com.br

---

Se quiser, posso também criar uma versão em inglês, uma versão mais enxuta para GitHub, ou adicionar badges, screenshots e uma seção de “Arquitetura do projeto”.
