export const posts = [
  {
    slug: "landing-page-que-converte",
    path: "/blog/landing-page-que-converte",
    title: "O que uma landing page precisa ter para converter melhor",
    excerpt:
      "Uma landing page eficiente organiza a oferta, reduz dúvidas e conduz o visitante para uma ação clara.",
    seoTitle: "O que uma landing page precisa ter para converter melhor",
    seoDescription:
      "Entenda os elementos essenciais de uma landing page com foco em conversão: promessa clara, hierarquia, provas, objeções e chamada para ação.",
    image: "/assets/images/og-image.jpg",
    author: "Robson Svicero",
    category: "Landing Pages",
    publishedAt: "2026-06-28",
    readingTime: "4 min",
    intro:
      "Uma landing page não deve ser apenas uma página bonita. Ela precisa explicar rapidamente o valor da oferta, responder às principais dúvidas do visitante e criar um caminho objetivo para a conversão.",
    sections: [
      {
        title: "Comece pela promessa",
        body:
          "O visitante precisa entender em poucos segundos o que está sendo oferecido, para quem é e por que aquilo importa. Um bom primeiro bloco combina título direto, apoio contextual e uma chamada para ação visível.",
      },
      {
        title: "Organize a decisão",
        body:
          "Cada seção deve remover uma incerteza: problema, solução, benefícios, provas, processo e contato. Quando a narrativa segue uma ordem clara, a página trabalha como uma conversa comercial bem conduzida.",
      },
      {
        title: "Performance também converte",
        body:
          "Velocidade, responsividade e estabilidade visual influenciam a experiência e a confiança. Uma página lenta ou confusa perde oportunidades antes mesmo da oferta ser compreendida.",
      },
    ],
  },
  {
    slug: "ui-ux-design-em-sites-institucionais",
    path: "/blog/ui-ux-design-em-sites-institucionais",
    title: "Como UI/UX Design melhora sites institucionais",
    excerpt:
      "UX e UI ajudam sites institucionais a comunicar autoridade, clareza e valor sem depender apenas de estética.",
    seoTitle: "Como UI/UX Design melhora sites institucionais",
    seoDescription:
      "Veja como UI/UX Design melhora sites institucionais ao organizar informação, hierarquia visual, jornadas e percepção de valor.",
    image: "/assets/images/og-image.jpg",
    author: "Robson Svicero",
    category: "UI/UX Design",
    publishedAt: "2026-06-28",
    readingTime: "3 min",
    intro:
      "Um site institucional precisa apresentar uma empresa ou profissional com clareza. UI/UX Design ajuda a transformar informações soltas em uma experiência mais objetiva, confiável e fácil de navegar.",
    sections: [
      {
        title: "Arquitetura da informação vem antes do visual",
        body:
          "Antes de escolher cores ou componentes, é preciso entender quais informações o visitante procura e em que ordem elas ajudam na decisão. Essa estrutura reduz ruído e melhora a leitura.",
      },
      {
        title: "Hierarquia visual cria foco",
        body:
          "Tamanhos, espaçamentos, contrastes e agrupamentos indicam o que importa. Quando a hierarquia é bem resolvida, o usuário escaneia melhor a página e encontra caminhos de contato com menos esforço.",
      },
      {
        title: "Consistência aumenta confiança",
        body:
          "Padrões visuais consistentes tornam o site mais profissional e previsível. Isso melhora a percepção de valor e ajuda a marca a parecer mais preparada.",
      },
    ],
  },
  {
    slug: "react-e-seo-em-sites-modernos",
    path: "/blog/react-e-seo-em-sites-modernos",
    title: "React e SEO em sites modernos: o que cuidar desde o início",
    excerpt:
      "React pode funcionar bem para SEO, mas exige cuidado com estrutura semântica, metadados, performance e linkagem interna.",
    seoTitle: "React e SEO em sites modernos",
    seoDescription:
      "Entenda os cuidados de SEO em sites React: metadados por página, estrutura semântica, performance, sitemap e linkagem interna.",
    image: "/assets/images/og-image.jpg",
    author: "Robson Svicero",
    category: "React.js",
    publishedAt: "2026-06-28",
    readingTime: "5 min",
    intro:
      "Sites em React podem ser indexados, mas SEO técnico precisa ser pensado desde a arquitetura. Rotas, títulos, descrições, conteúdo semântico e performance fazem diferença para a descoberta orgânica.",
    sections: [
      {
        title: "Cada rota precisa de metadados próprios",
        body:
          "Páginas de serviço, cases e artigos devem controlar title, description, canonical e robots. Isso evita que o site inteiro pareça uma única página para mecanismos de busca.",
      },
      {
        title: "Conteúdo semântico ainda é essencial",
        body:
          "H1, H2, parágrafos, listas e links internos ajudam buscadores e usuários a entenderem a página. Componentização não deve sacrificar a semântica do HTML.",
      },
      {
        title: "Sitemap e linkagem interna fecham o ciclo",
        body:
          "Novas rotas precisam aparecer no sitemap e estar conectadas por links internos relevantes. Isso facilita rastreamento e distribui autoridade entre páginas importantes.",
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}
