export const routes = {
  home: "/",
  services: "/servicos",
  cases: "/cases",
  blog: "/blog",
  about: "/sobre",
  contact: "/contato",
  schedule: "/agendamentos",
  homeProjects: "/#projetos",
  privacy: "/privacidade.html",
};

export const contactLinks = {
  whatsapp:
    "https://wa.me/5511964932007?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.",
};

export const headerContent = {
  logo: {
    href: "#inicio",
    src: "/assets/images/logo.png",
    alt: "Robson Svicero - UX/UI Designer e Desenvolvedor React",
    width: 91,
    height: 64,
  },
  navItems: [
    { label: "Home", to: routes.home },
    { label: "Serviços", to: routes.services },
    { label: "Projetos", to: routes.cases },
    { label: "Blog", to: routes.blog },
    { label: "Sobre", to: routes.about },
    { label: "Contato", to: routes.contact },
    { label: "Agendamentos", to: routes.schedule },
  ],
  cta: {
    label: "Solicitar orçamento",
    href: contactLinks.whatsapp,
  },
};

export const heroContent = {
  eyebrow: "React.js - UX Design",
  title: "Desenvolvedor React.js especializado em Landing Pages e Interfaces para Produtos Digitais.",
  lead:
    "Crio Landing Pages, Sites Institucionais e Sites One Page desenvolvidos em React.js, com foco em performance, SEO e experiência do usuário. Atendo empresas da Zona Norte de São Paulo e clientes em todo o Brasil.",
  note:
    "Para empresas e profissionais que precisam vender melhor uma oferta digital sem separar estratégia, design e implementação.",
  media: {
    poster: "/assets/images/videoframe.webp",
    sources: [
      { src: "/assets/videos/hero-loop.webm", type: "video/webm" },
      { src: "/assets/videos/hero-loop.mp4", type: "video/mp4" },
    ],
  },
  primaryCta: {
    label: "Solicitar orçamento",
    href: contactLinks.whatsapp,
  },
  secondaryCta: {
    label: "Ver projetos",
    href: routes.homeProjects,
  },
};

export const credibilityBarContent = {
  label:
    "Mais de 10 anos criando experiências digitais, incluindo trabalho conectado à Universal Music.",
  tags: [
    "UX Design",
    "UI Design",
    "Design Systems",
    "React",
    "Landing Pages",
    "Sites Institucionais",
  ],
};

export const partnersContent = {
  eyebrow: "Parceiros",
  partners: [
    {
      name: "Svicero Studio",
      href: "https://svicerostudio.com.br",
      image: "/assets/images/logo-svicerostudio.png",
    },
    {
      name: "Instituto Sublim",
      href: "https://institutosublim.org/",
      image: "/assets/images/selo_sublim.png",
    },
    {
      name: "Menu Zona Norte",
      href: "https://menuzonanorte.com.br",
      image: "/assets/images/logo-menuzn.png",
    },
    {
      name: "Alta Frequencia TV",
      href: "https://aftv.com.br",
      image: "/assets/images/logo-altafrequencia-preto.png",
    },
    {
      name: "Andre Barbosa Imoveis",
      href: "https://andrebarbosaimoveis.com.br/",
      image: "/assets/images/logo-andre-barbosa.png",
    },
  ],
};

export const servicesContent = {
  eyebrow: "Serviços",
  title: "O que posso construir para o seu próximo passo digital.",
  items: [
    {
      title: "Landing Pages",
      description:
        "Páginas focadas em geração de leads, qualificação de demanda e conversão para ofertas específicas.",
      iconPath: "M4 6h16M4 12h10M4 18h7",
    },
    {
      title: "Sites Institucionais",
      description:
        "Presença digital profissional, escalável e preparada para comunicar autoridade com clareza.",
      iconPath: "M5 20V8l7-4 7 4v12M9 20v-6h6v6",
    },
    {
      title: "Sites ONE PAGE",
      description:
        "Sites rápidos, modernos e objetivos, desenvolvidos para apresentar sua marca com clareza, destacar sua oferta e conduzir o visitante à ação.",
      iconPath: "M4 5h16v14H4zM4 10h16M9 10v9",
    },
  ],
};

export const credibilityContent = {
  eyebrow: "Credibilidade",
  title: "Experiência para transformar intenção em uma presença digital mais clara.",
  lead:
    "A página certa não é apenas bonita. Ela organiza a proposta de valor, remove ruído da decisão e conduz o visitante até uma conversa comercial mais qualificada.",
  description:
    "A atuação combina diagnóstico, arquitetura da informação, UX/UI Design e desenvolvimento front-end. Menos repasse entre especialistas, mais coerência entre estratégia, tela e código.",
};

export const differentiatorContent = {
  eyebrow: "O diferencial",
  title: "Design e desenvolvimento em uma única entrega.",
  columns: [
    {
      meta: "O problema comum",
      className: "problem-list",
      items: [
        {
          symbol: "-",
          title: "Designer que não programa.",
          description:
            "O conceito visual chega bonito, mas perde intenção quando vira implementação.",
        },
        {
          symbol: "-",
          title: "Desenvolvedor que não pensa na experiência.",
          description:
            "A interface funciona, mas não conduz o usuário com clareza comercial.",
        },
      ],
    },
    {
      meta: "A entrega proposta",
      className: "solution-list",
      items: [
        {
          symbol: "01",
          title: "Estratégia UX.",
          description: "Estrutura da mensagem, jornada e hierarquia antes da tela.",
        },
        {
          symbol: "02",
          title: "Interface UI.",
          description:
            "Visual refinado, responsivo e alinhado à percepção de valor.",
        },
        {
          symbol: "03",
          title: "Desenvolvimento React.",
          description:
            "Front-end pronto para evoluir com React, Tailwind CSS e boas práticas.",
        },
      ],
    },
  ],
  timeline: [
    {
      number: "01",
      title: "Descoberta",
      description:
        "Entendimento do negócio, oferta, público e gargalos de conversão.",
    },
    {
      number: "02",
      title: "UX",
      description: "Mapa da página, narrativa e priorização do que precisa ser dito.",
    },
    {
      number: "03",
      title: "UI",
      description: "Interface, ritmo visual, componentes e adaptação responsiva.",
    },
    {
      number: "04",
      title: "Dev",
      description:
        "Implementação front-end com atenção à performance e manutenção.",
    },
    {
      number: "05",
      title: "Entrega",
      description: "Ajustes finais, publicação orientada e acompanhamento inicial.",
    },
  ],
};

export const processContent = {
  eyebrow: "Como trabalho",
  title: "Um processo para reduzir incerteza antes de desenhar telas.",
  steps: [
    {
      number: "01",
      title: "Entendimento do negócio",
      description:
        "Mapeio oferta, público, objeções e o que precisa acontecer para o visitante virar contato.",
    },
    {
      number: "02",
      title: "Estruturação da experiência",
      description:
        "Organizo a narrativa, as seções e a ordem das decisões que a página precisa conduzir.",
    },
    {
      number: "03",
      title: "Design da interface",
      description:
        "Crio uma direção visual refinada, responsiva e coerente com o posicionamento da marca.",
    },
    {
      number: "04",
      title: "Desenvolvimento",
      description:
        "Transformo a interface em front-end com componentes, estados e base pronta para manutenção.",
    },
    {
      number: "05",
      title: "Entrega e acompanhamento",
      description:
        "Fecho ajustes, preparo o handoff/publicação e acompanho os primeiros refinamentos da página.",
    },
  ],
};

export const projectsContent = {
  eyebrow: "Projetos em destaque",
  title: "Cases que mostram estratégia, design e implementação trabalhando juntos.",
  cta: {
    label: "Ver todos",
    href: "/cases",
  },
};

export const testimonialsContent = {
  eyebrow: "Depoimentos",
  title: "Quando a entrega visual também melhora a percepção de valor.",
  reviews: [
    {
      quote: "Eu esperava algo bonito, mas o que o Robson entregou foi muito além disso.",
      author: "Amanda Araújo - Proprietária AMANDA store",
    },
    {
      quote:
        "O Robson não só traduziu visualmente o que eu queria, como me ajudou a organizar minha proposta de valor.",
      author: "Marcelo Pelegrini - CEO da PowerBrain",
    },
    {
      quote:
        "Desde o diagnóstico inicial, o foco foi entender onde minha marca estava perdendo valor.",
      author: "Ednaldo Brito - Isaque Moveis",
    },
  ],
};

export const faqContent = {
  eyebrow: "Perguntas frequentes",
  title: "Dúvidas comuns antes de tirar um projeto do papel.",
  lead: "Alguns pontos importantes para entender escopo, tecnologia, SEO e formato de atendimento.",
  questions: [
    {
      question: "Quanto custa uma Landing Page?",
      answer:
        "O valor depende do objetivo, quantidade de seções, complexidade visual, integrações e prazo. Uma landing page simples costuma ter um escopo mais enxuto; já uma página com copy estruturada, design personalizado, animações, formulários e otimização avançada exige mais planejamento e desenvolvimento. O ideal é avaliar a oferta e montar um orçamento sob medida.",
    },
    {
      question: "Qual a diferença entre um Site One Page e um Site Institucional?",
      answer:
        "Um Site One Page concentra toda a narrativa em uma única página, com seções organizadas em sequência para apresentar uma oferta, serviço ou profissional. Um Site Institucional normalmente possui múltiplas páginas, como sobre, serviços, cases, contato e conteúdos específicos. O One Page é direto e objetivo; o Institucional é melhor quando a marca precisa apresentar mais informações e criar uma presença digital mais completa.",
    },
    {
      question: "Por que desenvolver em React.js?",
      answer:
        "React.js permite criar interfaces modernas, componentizadas e mais fáceis de manter. Isso ajuda quando o site precisa evoluir, ganhar novas seções, integrar serviços externos ou manter uma experiência consistente em diferentes telas. Também é uma tecnologia madura, amplamente utilizada no mercado e adequada para projetos que precisam unir performance, interatividade e escalabilidade.",
    },
    {
      question: "Você atende apenas São Paulo?",
      answer:
        "Não. O atendimento pode ser feito de forma remota para clientes de qualquer região do Brasil. Para projetos em São Paulo, também é possível alinhar necessidades específicas da atuação local, mas todo o processo de briefing, aprovação, desenvolvimento e entrega funciona muito bem online.",
    },
    {
      question: "O site já é entregue otimizado para SEO?",
      answer:
        "Sim. A entrega inclui uma base técnica de SEO com estrutura semântica, títulos, descrições, hierarquia de conteúdo, URLs adequadas quando aplicável, performance, responsividade e marcações importantes para mecanismos de busca. Em projetos que exigem crescimento orgânico mais forte, também é possível evoluir para uma estratégia contínua de conteúdo, palavras-chave e monitoramento.",
    },
  ],
};

export const contactContent = {
  eyebrow: "Conversão",
  title: "Tem um projeto em mente?",
  lead: "Vamos conversar sobre sua landing page, site institucional ou produto digital.",
  links: [
    { label: "Agendar reunião", href: routes.schedule, variant: "secondary" },
    {
      label: "Solicitar orçamento por e-mail",
      href: "mailto:ola@robsonsvicero.com.br?subject=Projeto%20freelance%20com%20Robson%20Svicero",
      variant: "primary",
    },
    { label: "Chamar no WhatsApp", href: "https://wa.me/5511964932007", variant: "secondary" },
  ],
  meta: "ola@robsonsvicero.com.br - 11 96493-2007",
  formAction: "https://formspree.io/f/xbdevbne",
};

export const footerContent = {
  copyright: "2026 Robson Svicero",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/robsonsvicero/" },
    {
      label: "E-mail",
      href: "mailto:ola@robsonsvicero.com.br?subject=Informações%20sobre%20projeto",
    },
    { label: "WhatsApp", href: contactLinks.whatsapp },
    { label: "Instagram", href: "https://www.instagram.com/robson.svicero" },
    { label: "GitHub", href: "https://github.com/robsonsvicero" },
    { label: "Behance", href: "https://www.behance.net/robsonsvicero" },
  ],
  privacy: {
    label: "Política de Privacidade",
    href: routes.privacy,
  },
};
