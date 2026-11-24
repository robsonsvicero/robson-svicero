# Design System · Robson Svicero

> Status: alinhado com a implementação atual do projeto em React + Vite.

Este documento registra os padrões visuais e de interface realmente usados no site, com base nos tokens do CSS global, nos componentes React e nas estruturas de layout já presentes no projeto atual.

---

## Base real do projeto

Os principais arquivos de referência são:

- `src/styles/global.css`
- `src/components/ui/Button/Button.jsx`
- `src/components/layout/Footer/Footer.jsx`
- `src/sections/Hero/Hero.jsx`
- `src/pages/DesignSystem/DesignSystem.jsx`

A estrutura atual não depende mais de um CSS estático em `assets/css/styles.css`; o visual principal está centralizado em `src/styles/global.css` e em classes utilitárias/componentes React.

---

## Navegação rápida

- [Tokens e cores](#tokens-e-cores)
- [Tipografia](#tipografia)
- [Hero e CTAs](#hero-e-ctas)
- [Componentes UI](#componentes-ui)
- [Layout e grids](#layout-e-grids)
- [Timeline / processo](#timeline--processo)
- [Arquivos relevantes](#arquivos-relevantes)

---

## Tokens e cores

Os valores principais estão definidos em `:root` dentro de `src/styles/global.css`.

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#faf8f2` | Fundo principal |
| `--surface` | `#f5f5f7` | Superfícies secundárias |
| `--surface-warm` | `#fbfbfd` | Fundo alternativo para botões e blocos |
| `--fg` | `#1d1d1f` | Texto principal |
| `--fg-2` | `#424245` | Texto secundário |
| `--muted` | `#6e6e73` | Descrições e apoio |
| `--meta` | `#86868b` | Metadados |
| `--border` | `#d2d2d7` | Bordas padrão |
| `--border-soft` | `#e8e8ed` | Bordas leves |
| `--accent` | `#8234E9` | Cor primária |
| `--accent-on` | `#ffffff` | Texto sobre destaque |
| `--accent-hover` | `#820AFA` | Hover do accent |
| `--accent-active` | `#341087` | Estado ativo/pressed |
| `--success` | `#16a34a` | Sucesso |
| `--warn` | `#eab308` | Alerta |
| `--danger` | `#dc2626` | Erro |

### Superfícies e contrastes

- `--bg` define a base da página.
- `--surface` e `--surface-warm` são usados em blocos de apoio e variações de cartão.
- `--fg` e `--muted` sustentam a hierarquia textual.
- `--border` e `--border-soft` controlam a separação visual entre blocos e seções.

### Motion e tokens interativos

- `--motion-fast: 150ms`
- `--motion-base: 220ms`
- `--ease-standard: cubic-bezier(0.28, 0, 0.22, 1)`
- `--focus-ring: 0 0 0 4px color-mix(in oklab, var(--accent), transparent 65%)`

O foco visual é sempre reforçado com `box-shadow: var(--focus-ring)` em elementos interativos.

---

## Tipografia

A escala tipográfica atual é definida por tokens do CSS global, sem depender de estilos antigos do HTML estático.

### Escala principal

- `h1` / `.h1`: `56px` com linha `1.05` e tracking negativo
- `h2` / `.h2`: `42px`
- `h3` / `.h3`: `26px`
- `.lead`: `20px`, `font-weight: 600`, texto de apoio em destaque
- `.meta`: `12px`, com estilo mono espaçado
- `.eyebrow`: uppercase, `letter-spacing: 0.08em`, cor de destaque

### Utilização real

- `h1` é usado no hero e em títulos de destaque.
- `h2` é usado para títulos de seção.
- `h3` é usado em cards e blocos de feature.
- `.lead` é o texto introdutório de seções importantes e hero.
- `.meta` é usado para informações complementares, datas e etiquetas.

---

## Hero e CTAs

O hero da página principal está implementado em `src/sections/Hero/Hero.jsx` e usa as classes:

- `.hero-editorial`
- `.hero-media`
- `.hero-overlay`
- `.hero-inner`
- `.hero-copy`
- `.hero-cta`

### Estrutura do hero

```jsx
<section className="section hero hero-editorial">
  <div className="hero-media">
    <img className="hero-image" ... />
    <div className="hero-overlay" />
  </div>

  <div className="container hero-inner">
    <div className="hero-copy">
      <p className="eyebrow">...</p>
      <h1>...</h1>
      <p className="lead">...</p>
      <div className="hero-cta">...</div>
    </div>
  </div>
</section>
```

### Botões

A variação começa na estrutura base:

```jsx
<Component className={`btn ${variantClassName} ${className}`.trim()} ...>
```

As variantes reais são:

| Variante | Classe | Uso |
| --- | --- | --- |
| primária | `btn-primary` | CTA principal |
| secundária | `btn-secondary` | CTA complementar |
| dark | `btn-dark` | Fundo escuro |
| outline | `btn-outline` | Destaque sutil |
| ghost | `btn-ghost` | Link com aparência leve |

Estados interativos:

- `:hover` altera cor e borda
- `:active` aplica `transform: scale(0.98)`
- `:focus-visible` usa o `--focus-ring`
- `btn-arrow::after` adiciona a seta com movimento horizontal

---

## Componentes UI

### Cards

Os cards usam consolidação visual com border, radius e sombreamento leve, sem depender de classes legacy do HTML antigo.

Estrutura comum:

- `.card`
- `.feature`
- `.feature-mark`
- `.card-dark` (para blocos em destaque escuro)

### Feature mark

O ícone principal de feature usa:

- contêiner circular: `.feature-mark`
- SVG com `stroke: currentColor`
- `width: 38px`, `height: 38px`
- `border-radius: 50%`

```css
.feature-mark {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--accent);
  background: color-mix(in oklab, var(--accent), transparent 90%);
}
```

### Footer

`src/components/layout/Footer/Footer.jsx` usa `className="pagefoot"` e mantém a tradição visual do site, com fundo claro e separação simples.

---

## Layout e grids

As grades e layouts seguem tokens globais de espaçamento e responsividade.

### Padrões de grid

- `.grid-3`: `repeat(3, 1fr)`
- `.grid-2-1`: `2fr 1fr`
- `.grid-1-2`: `1fr 2fr`
- `.grid-2`: `repeat(2, 1fr)`

### Espaçamento

Os tokens de espaçamento em uso são:

- `--space-1: 4px`
- `--space-2: 8px`
- `--space-3: 12px`
- `--space-4: 16px`
- `--space-5: 20px`
- `--space-6: 24px`
- `--space-8: 32px`
- `--space-12: 48px`

### Container

```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-gutter-desktop);
}
```

Isso mantém a estrutura responsiva e alinhada ao projeto atual.

---

## Timeline / processo

A timeline do site segue a estrutura real de `src/styles/global.css`:

- `.timeline`
- `.step`
- `.step .num`
- `.step strong`
- `.step p`

Layout:

```css
.timeline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-3);
}
```

O visual usa fundo suave, borda leve e destaque do accent no número da etapa.

---

## Tipos de elementos de interface em uso

### Elementos comuns no projeto

- `.eyebrow`
- `.lead`
- `.meta`
- `.card`
- `.feature-mark`
- `.hero-editorial`
- `.timeline`
- `.pagefoot`
- `.btn-primary` / `.btn-secondary` / `.btn-dark`

### Padrões de consistência

- Semântica visual clara e forte hierarquia.
- Fundo principal claro com destaque roxo em ação e pontos de atenção.
- Bordas sutis, cards com raio controlado e acessibilidade por foco visível.
- Layout responsivo com grids e espaçamento global padronizado.

---

## Fontes e carregamento

A identidade tipográfica atual usa estes nomes:

- `Montserrat` como fonte principal de display
- `Google Sans` como fonte de corpo
- `Bebas Neue` para o logo / destaque
- `SF Mono`, `JetBrains Mono` e `ui-monospace` para metadados e labels técnicos

Essas fontes são definidas em `:root` via `--font-display`, `--font-body`, `--font-logo` e `--font-mono`.

---

## Arquivos relevantes

| Tipo | Caminho |
| --- | --- |
| CSS base | `src/styles/global.css` |
| Botões | `src/components/ui/Button/Button.jsx` |
| Hero | `src/sections/Hero/Hero.jsx` |
| Footer | `src/components/layout/Footer/Footer.jsx` |
| Página de referência | `src/pages/DesignSystem/DesignSystem.jsx` |
| Conteúdo do site | `src/content/siteContent.js` |

---

## Observação final

Este design system está atualizado com a implementação atual do projeto. O documento foi revisado para refletir o stack real do site e não a estrutura antiga de HTML estático.

Se houver novos componentes ou refinamentos visuais, a recomendação é manter este arquivo sincronizado sempre que houver mudanças em `src/styles/global.css` ou nos componentes de UI.
