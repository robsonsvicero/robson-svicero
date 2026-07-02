export const services = [
  {
    slug: "site-one-page",
    path: "/servicos/site-one-page",
    eyebrow: "Site One Page",
    title: "Sites One Page para comunicar e converter com objetividade",
    summary:
      "Desenvolvimento de sites de página única com foco em apresentar sua oferta de forma clara, objetiva e orientada para conversão.",
    seoTitle: "Criação de Site One Page em São Paulo",
    seoDescription:
      "Criação de sites One Page em São Paulo para profissionais, empresas e lançamentos, com design responsivo e foco em conversão.",
    intro:
      "O formato One Page concentra todas as informações essenciais em uma única página, criando uma navegação fluida e direcionando o visitante para uma ação específica. É uma solução eficiente para empresas, profissionais e serviços que precisam de uma presença digital objetiva e de rápida implementação.",
    outcomes: [
      "Comunicação clara e organizada em uma única página.",
      "Experiência de navegação simples e orientada para conversão.",
      "Estrutura leve, responsiva e otimizada para dispositivos móveis.",
    ],
    process: [
      "Levantamento dos objetivos e definição da mensagem principal.",
      "Organização das seções e da jornada do usuário.",
      "Criação do layout e desenvolvimento responsivo.",
      "Ajustes finais, otimização e publicação.",
    ],
  },
  {
    slug: "site-institucional",
    path: "/servicos/site-institucional",
    eyebrow: "Site Institucional",
    title: "Sites institucionais para fortalecer sua presença digital",
    summary:
      "Desenvolvimento de sites institucionais modernos, responsivos e orientados para apresentar sua empresa com clareza e credibilidade.",
    seoTitle: "Criação de Site Institucional em São Paulo",
    seoDescription:
      "Criação de sites institucionais profissionais em São Paulo, com design personalizado, foco em credibilidade, performance e experiência do usuário.",
    intro:
      "O site institucional é o principal ponto de contato digital de uma empresa. Mais do que uma vitrine, ele deve transmitir confiança, apresentar seus diferenciais e conduzir o visitante para o próximo passo, seja um contato, orçamento ou agendamento.",
    outcomes: [
      "Presença digital profissional alinhada à identidade da marca.",
      "Estrutura de conteúdo organizada para apresentar serviços e diferenciais.",
      "Site responsivo, otimizado para performance e preparado para crescimento futuro.",
    ],
    process: [
      "Entendimento do negócio, público e objetivos da empresa.",
      "Definição da arquitetura de informação e estrutura das páginas.",
      "Criação do design e desenvolvimento responsivo.",
      "Testes, otimizações e publicação do projeto.",
    ],
  },
  {
    slug: "landing-pages",
    path: "/servicos/landing-pages",
    eyebrow: "Landing Pages",
    title: "Landing pages orientadas para conversão",
    summary:
      "Páginas desenvolvidas para apresentar uma oferta com clareza, reduzir atritos e gerar contatos mais qualificados.",
    seoTitle: "Criação de Landing Pages em React",
    seoDescription:
      "Criação de landing pages em React com UX, UI Design, performance, SEO técnico e foco em conversão.",
    intro:
      "Uma landing page precisa ser mais do que uma página bonita. Ela organiza a proposta de valor, apresenta provas, antecipa objeções e cria um caminho claro para que o visitante entre em contato ou solicite um orçamento.",
    outcomes: [
      "Narrativa da oferta organizada em seções estratégicas.",
      "Design responsivo com foco em clareza e percepção de valor.",
      "Desenvolvimento com base técnica preparada para performance e SEO.",
    ],
    process: [
      "Mapeamento da oferta, do público e dos objetivos de conversão.",
      "Estruturação da narrativa e definição da ordem das seções.",
      "Design da interface e adaptação responsiva.",
      "Desenvolvimento, testes e publicação da página.",
    ],
  },
  {
    slug: "ui-ux-design",
    path: "/servicos/ui-ux-design",
    eyebrow: "UI/UX Design",
    title: "UI/UX Design para interfaces mais claras e eficientes",
    summary:
      "Design de interfaces com foco em experiência do usuário, clareza visual, navegação intuitiva e melhor conversão.",
    seoTitle: "UI/UX Design para Sites e Sistemas",
    seoDescription:
      "UI/UX Design para sites, landing pages e interfaces digitais com foco em usabilidade, clareza, consistência visual e conversão.",
    intro:
      "Um bom projeto de UI/UX organiza conteúdo, fluxo e hierarquia visual para que a experiência seja simples, confiável e orientada ao objetivo do usuário. O trabalho ajuda a reduzir atritos, melhorar a percepção de valor e tornar a interface mais fácil de usar.",
    outcomes: [
      "Arquitetura de informação e jornadas mais claras para o usuário.",
      "Interfaces responsivas com hierarquia visual consistente.",
      "Protótipos e especificações preparados para desenvolvimento.",
    ],
    process: [
      "Entendimento do produto, público e objetivos de negócio.",
      "Mapeamento dos fluxos, conteúdos e pontos de decisão.",
      "Criação da interface, componentes e adaptações responsivas.",
      "Revisão de usabilidade e refinamento antes do desenvolvimento.",
    ],
  },
  {
    slug: "identidade-visual",
    path: "/servicos/identidade-visual",
    eyebrow: "Identidade Visual",
    title: "Identidade visual para marcas digitais",
    summary:
      "Criação de sistemas visuais para marcas que precisam transmitir mais profissionalismo, consistência e confiança nos canais digitais.",
    seoTitle: "Identidade Visual para Marcas Digitais",
    seoDescription:
      "Identidade visual para marcas digitais com foco em clareza, consistência, percepção de valor e aplicação em sites, landing pages e redes sociais.",
    intro:
      "Uma identidade visual bem estruturada ajuda a marca a ser reconhecida, lembrada e percebida com mais valor. O trabalho organiza cores, tipografia e elementos gráficos para criar uma presença digital mais consistente e menos improvisada.",
    outcomes: [
      "Direção visual alinhada ao posicionamento da marca.",
      "Sistema de cores, tipografia e elementos visuais de apoio.",
      "Base visual preparada para aplicação em sites, landing pages e comunicação digital.",
    ],
    process: [
      "Diagnóstico da marca, do público e das referências visuais.",
      "Exploração de direções criativas e critérios de diferenciação.",
      "Criação dos elementos principais e guias de aplicação.",
      "Organização e entrega dos arquivos finais para uso digital.",
    ],
  },

];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}
