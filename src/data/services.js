export const services = [
  {
    slug: "criacao-de-sites",
    path: "/servicos",
    eyebrow: "Criação de sites",
    title: "Criação de sites profissionais em São Paulo para fortalecer sua presença digital",
    summary:
      "Desenvolvimento de sites profissionais modernos, responsivos e orientados para apresentar sua empresa com clareza, credibilidade e apoio de IA no processo.",
    seoTitle: "Criação de Sites Profissionais em São Paulo | Serviço Principal",
    seoDescription:
      "Criação de sites profissionais em São Paulo com design personalizado, foco em credibilidade, performance, SEO e uso complementar de IA.",
    intro:
      "O site profissional é o principal ponto de contato digital de uma empresa. Mais do que uma vitrine, ele deve transmitir confiança, apresentar seus diferenciais e conduzir o visitante para o próximo passo, seja um contato, orçamento ou agendamento.",
    outcomes: [
      "Presença digital profissional alinhada à identidade da marca.",
      "Estrutura de conteúdo organizada para apresentar a oferta com clareza.",
      "Site responsivo, otimizado para performance e preparado para crescimento futuro.",
    ],
    process: [
      "Entendimento do negócio, público e objetivos da empresa.",
      "Definição da arquitetura de informação e estrutura das páginas.",
      "Criação do design e desenvolvimento responsivo.",
      "Testes, otimizações e publicação do projeto.",
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug) || services[0];
}
