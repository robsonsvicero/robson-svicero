# Design System · Robson Svicero (Trajectory Standard)

> Status: Trajectory Design System integralmente aplicado ao projeto (Cores, Tipografia Tosh A, Espaçamento, Botões, Header, Hero com Canvas de Órbitas, Cards e Footer com Grid 3D em Perspectiva).

Este documento registra a implementação do sistema visual de `trajectory/design-system.html` no site React + Vite.

---

## 1. Tokens e Cores

Definidos em `:root` dentro de `src/styles/global.css`:

| Token | Valor | Uso |
| --- | --- | --- |
| `--navy-900` | `#071A45` | Superfície escura principal (Hero, Depoimentos, CTA, Footer) |
| `--navy-800` | `#0A2160` | Superfície escura secundária e hover escuro |
| `--accent-700` | `#1D3095` | Gradiente profundo da Hero e hover interativo |
| `--accent-600` | `#0052CC` | Destaque primário (Ações, Botões, Links, Badges) |
| `--accent-500` | `#3D6FD0` | Destaque intermediário e halos radiais |
| `--accent-300` | `#8FB2EC` | Órbitas da Hero, destaques e links sobre superfícies escuras |
| `--accent-200` | `#C1D4F5` | Realces claros e código |
| `--accent-50` | `#EAF1FB` | Superfície pale de fundo da seção de serviços |
| `--light-50` | `#F7F9FC` | Superfície clara base das páginas |
| `--light-100` | `#EEF3F9` | Superfície de apoio e fundos alternados |
| `--light-200` | `#E2E9F2` | Bordas sutis e divisores padrão |
| `--ink-900` | `#0D1521` | Texto principal em títulos em fundos claros |
| `--ink-700` | `#3B444F` | Texto de leitura e parágrafos |
| `--ink-500` | `#6C737D` | Metadados, legendas e apoios secundários |
| `--ink-300` | `#8A93A0` | Metadados suaves e marcadores |
| `--white` | `#FFFFFF` | Branco puro, cards elevados e tipografia em áreas escuras |
| `--card-hairline-on-light` | `rgba(29, 48, 149, 0.10)` | Borda hairline para cards sobre fundos claros |
| `--card-hairline-on-dark` | `rgba(255, 255, 255, 0.16)` | Borda hairline translúcida sobre superfícies escuras |

---

## 2. Tipografia (Tosh A)

Fontes locais em `public/fonts/`:
- `ToshA-Regular.woff2` (400)
- `ToshA-Medium.woff2` (500)
- `ToshA-Bold.woff2` (700)

### Escala tipográfica:
- **Heading 1**: `clamp(2.75rem, 7vw, 5.75rem)` (Desktop) / `var(--text-h1): 3.75rem`. Ênfase em itálico `em` com cor `--accent-300` na Hero ou `--accent-600` em seções claras.
- **Heading 2**: `var(--text-h2): 3.0rem` / Tosh A 700.
- **Heading 3**: `var(--text-h3): 1.5rem` / Tosh A 600.
- **Body Large / Lead**: `var(--text-body-lg): 1.15rem`, line-height `1.6`.
- **Body**: `var(--text-body): 1.0625rem`.
- **Eyebrow / Section Label**: `12px`, uppercase, `letter-spacing: 0.18em`, acompanhado do traço horizontal autoral em `::before` (`width: 24px; height: 1.5px;`).

---

## 3. Botões e Ações (`Button.jsx`)

Componente universal unificado com suporte a polimorfismo automático (`to` gera `<Link>`, `href` gera `<a>`, e sem ambos gera `<button>`).

### Variantes (`variant`):
- `primary`: Fundo `#0052CC`, borda `#0052CC`, texto `#fff`, hover `#1D3095` com elevação.
- `secondary`: Fundo translúcido com blur, borda hairline e texto branco para superfícies escuras.
- `outline`: Fundo branco, borda hairline `var(--card-hairline-on-light)` e texto escuro para superfícies claras.
- `outline-light`: Fundo transparente, borda `rgba(255, 255, 255, 0.35)` e texto branco.
- `white`: Fundo branco `#fff`, texto `#0D1521`, hover `var(--accent-50)` (para seções escuras e faixas de CTA).
- `dark`: Fundo `var(--navy-900)`, borda escura e texto branco.
- `ghost`: Fundo e borda transparentes com texto em cor de destaque e translação no hover.
- `whatsapp`: Fundo oficial WhatsApp `#25D366` com sombra suave e hover `#1EB956`.
- `telegram`: Fundo oficial Telegram `#229ED9` com sombra suave e hover `#1A8CC2`.
- `shiny`: Efeito AuraGen com borda gradiente rotativa para CTAs de altíssimo destaque.

### Tamanhos (`size`):
- `sm`: 36px de altura, padding compacto `0.55rem 1rem`, fonte `0.875rem` (ideal para header e chips).
- `md` (Padrão): 46px de altura, padding `0.875rem 1.4rem`, fonte `1rem`.
- `lg`: 54px de altura, padding `1.05rem 1.85rem`, fonte `1.125rem` (ideal para hero e faixas finais de CTA).

### Modificadores & Estados:
- `pill`: boolean (`border-radius: 9999px`).
- `fullWidth`: boolean (`width: 100%`).
- `loading`: boolean (exibe spinner animado acessível).
- `disabled`: boolean (desabilita interação e ajusta opacidade).
- `showArrow`: boolean (exibe ou oculta a seta direcional Trajectory; padrão `true`).
- `icon` & `iconPosition`: suporte a ícones customizados (`left` ou `right`).

---

## 4. Header & Navbar (`Header.jsx`)

- Estrutura `.navbar` com grid `1fr auto 1fr`.
- Efeito dinâmico:
  - No topo da Home sobre a Hero: `.navbar--over-dark` (fundo transparente, texto branco).
  - Ao rolar a página ou páginas internas: `.navbar.is-scrolled` com fundo `rgba(7, 26, 69, 0.94)` ou blur translúcido `backdrop-filter: saturate(180%) blur(12px)`.
- Botão de ação `.navbar_cta-link` com chevron e popover para WhatsApp/Telegram.
- Menu hambúrguer animado com 3 spans e overlay mobile `.navbar_overlay` em Navy 900.

---

## 5. Hero Section com Canvas de Órbitas (`Hero.jsx` & `HeroParticles.jsx`)

- Fundo gradiente cósmico em `.section_hero--blue`:
  `background: radial-gradient(120% 130% at 80% 0%, var(--accent-700), var(--navy-900))`
- Camada `.hero_orbits` com trilhas concêntricas em radial gradient.
- Canvas interativo `HeroParticles.jsx`: partículas e cometas com cauda em rotação orbital contínua, pausando via `IntersectionObserver` quando fora da tela.
- Barra de confiança `.hero_logos` com indicadores de autoridade.

---

## 6. Footer com Grid 3D em Perspectiva (`Footer.jsx`)

- Fundo `.footer` em `var(--navy-900)`.
- Grade perspectiva animada em `.footer::before`:
  `transform: translateX(-50%) perspective(1100px) rotateX(62deg)`
  com linhas em gradiente `rgba(143, 178, 236, 0.1)` e máscara elíptica suave.
- Grid de 4 colunas: Marca, Institucional, Especialidades (2 colunas) e Formulário de Newsletter.
- Barra inferior `.footer_bottom` com copyright e links de privacidade.
