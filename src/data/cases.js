export const cases = [
  {
    slug: "captacao-digital-ong",
    path: "/cases/captacao-digital-ong",
    title: "Projeto de captação digital para ONG",
    description:
      "UX/UI orientado à conversão para facilitar doações e fortalecer a presença digital de uma organização social.",
    fullDescription:
      "O projeto foi desenvolvido para tornar a presença digital da ONG mais clara, confiável e orientada à ação. A experiência organiza a mensagem principal, apresenta a causa com objetividade e facilita o processo de contribuição, reduzindo atritos para quem deseja apoiar a organização.",
    metaDescription:
      "Projeto digital para ONG com UX/UI, clareza de mensagem e fluxo de doação pensado para facilitar a contribuição dos apoiadores.",
    seoTitle: "Case de captação digital para ONG",
    seoDescription:
      "Case de UX/UI Design e desenvolvimento para ONG com foco em doações, clareza da mensagem e processo de contribuição via PIX.",
    image: "/assets/images/case-sublim.jpg",
    alt: "Projeto de captação digital para ONG criada por Robson Svicero - UX/UI Design e React",
    externalUrl: "https://institutosublim.org",
    problem: "Facilitar doações e fortalecer a presença digital da organização.",
    solution:
      "UX/UI orientado à conversão e sistema de doações via PIX com QR Code dinâmico.",
    result:
      "Processo de contribuição mais simples, rápido e acessível para apoiadores.",
  },
  {
    slug: "landing-page-dentistas",
    path: "/cases/landing-page-dentistas",
    title: "Landing page para dentistas",
    description:
      "Landing page para comunicar valor, qualificar leads e apresentar uma oferta com mais clareza em um mercado competitivo.",
    fullDescription:
      "A landing page foi estruturada para apresentar a oferta de forma direta, antecipar dúvidas comuns e conduzir o visitante até o contato. O projeto combina narrativa comercial, hierarquia visual e desenvolvimento front-end para deixar a comunicação mais objetiva e preparada para gerar oportunidades qualificadas.",
    metaDescription:
      "Landing page para dentistas com narrativa de conversão, interface clara e estrutura preparada para qualificar contatos comerciais.",
    seoTitle: "Case de landing page para dentistas",
    seoDescription:
      "Case de landing page para dentistas com narrativa de conversão, UX/UI Design e desenvolvimento front-end em React.",
    image: "/assets/images/case-dentistas.jpg",
    alt: "Landing page para dentistas criada por Robson Svicero - UX/UI Design e React",
    externalUrl: "https://svicerostudio.com.br/lp-dentistas",
    problem: "Comunicar valor e qualificar leads em um mercado competitivo.",
    solution: "Narrativa de conversão, UX/UI e front-end com React e Tailwind CSS.",
    result: "Oferta mais clara e preparada para gerar oportunidades comerciais.",
  },
  {
    slug: "plataforma-digital-imobiliaria",
    path: "/cases/plataforma-digital-imobiliaria",
    title: "Plataforma digital imobiliária",
    description:
      "Estrutura de experiência para apresentar proposta, confiança e contato em um serviço consultivo de alto valor.",
    fullDescription:
      "A plataforma digital foi pensada para organizar a presença online de um serviço imobiliário consultivo, destacando autoridade, proposta de valor e caminhos de contato. A interface prioriza clareza, confiança e uma leitura mais profissional para apoiar decisões em uma jornada de compra de alto valor.",
    metaDescription:
      "Plataforma digital imobiliária criada para organizar autoridade, proposta de valor e contato em uma experiência objetiva e confiável.",
    seoTitle: "Case de plataforma digital imobiliária",
    seoDescription:
      "Case de plataforma digital imobiliária com UX/UI Design e front-end para organizar presença digital e comunicar autoridade.",
    image: "/assets/images/case-imoveis.jpg",
    alt: "Plataforma digital imobiliaria - case de UX/UI Design e front-end por Robson Svicero",
    externalUrl:
      "https://www.behance.net/gallery/248562059/Plataforma-digital-para-consultor-imobiliario",
    problem: "Organizar presença digital para um serviço consultivo de alto valor.",
    solution: "Estrutura de experiência para apresentar proposta, confiança e contato.",
    result: "Comunicação mais profissional para uma venda menos dependente de preço.",
  },
  {
    slug: "universal-music",
    path: "/cases/universal-music",
    title: "Universal Music",
    description:
      "Experiência digital com apelo visual, ritmo editorial e consistência de marca para uma marca global de entretenimento.",
    fullDescription:
      "O projeto para Universal Music explora uma experiência visual com ritmo editorial, destaque para conteúdo de campanha e consistência com o universo da marca. A interface foi criada para valorizar o impacto visual, organizar informações de forma fluida e sustentar uma comunicação digital de entretenimento.",
    metaDescription:
      "Projeto de interface para Universal Music com foco em impacto visual, conteúdo de campanha e consistência de marca.",
    seoTitle: "Case Universal Music",
    seoDescription:
      "Case Universal Music com UI Design e desenvolvimento front-end por Robson Svicero, com foco em campanha, conteúdo e consistência visual.",
    image: "/assets/images/case-universal.jpg",
    alt: "Case Universal Music - UI Design e desenvolvimento front-end por Robson Svicero",
    externalUrl: "https://www.behance.net/gallery/174232557/Universal-Music",
    problem: "Criar experiências digitais com apelo visual e consistência de marca.",
    solution:
      "UI orientada por campanha, ritmo editorial e atenção à apresentação do conteúdo.",
    result: "Entrega ligada a uma marca global de entretenimento.",
  },
];

export function getCaseBySlug(slug) {
  return cases.find((item) => item.slug === slug);
}
