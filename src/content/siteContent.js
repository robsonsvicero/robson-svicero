export const routes = {
  home: "/",
  about: "/sobre",
  siteCreation: "/criacao-de-sites",
  siteCreationSaoPaulo: "/criacao-de-sites-sao-paulo",
  prices: "/planos",
  services: "/servicos",
  uxDesignService: "/servicos/ux-design",
  landingPageService: "/servicos/landing-page",
  visualIdentityService: "/servicos/identidade-visual",
  seoService: "/servicos/seo",
  gmnService: "/servicos/gestao-gmn",
  cases: "/cases",
  blog: "/blog",
  contact: "/contato",
  schedule: "/agendamentos",
  faq: "/faq",
  homeProjects: "/#projetos",
  homeContact: "/#contato",
  privacy: "/privacidade",
  exclusao: "/exclusao-dados",
  claroMethod: "/metodo-claro",
};

export const contactLinks = {
  whatsapp:
    "https://wa.me/5511964932007?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20o%20meu%20projeto.",
  telegram: "https://t.me/robsonsvicero?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20o%20meu%20projeto.%0A%0A",
};

export const headerContent = {
  logo: {
    href: "#inicio",
    src: "/assets/images/logo.png",
    alt: "Robson Svicero - Criação de sites profissionais",
    width: 91,
    height: 64,
  },
  navItems: [
    { label: "Home", to: routes.home },
    { label: "Sobre", to: routes.about },
    {
      label: "Criação de sites",
      to: routes.siteCreation,
      items: [
        { label: "Método C.L.A.R.O.", to: routes.claroMethod },
        { label: "Criação de sites em SP", to: routes.siteCreationSaoPaulo },
        { label: "Landing Page", to: routes.landingPageService },
        { label: "SEO", to: routes.seoService },
        { label: "UX Design", to: routes.uxDesignService },
        { label: "Identidade Visual", to: routes.visualIdentityService },
      ],
    },
    { label: "Planos", to: routes.prices },
    { label: "Projetos", to: routes.cases },
    { label: "Blog", to: routes.blog },
    { label: "Contato", to: routes.contact },
    { label: "Agendamentos", to: routes.schedule },
  ],
  cta: {
    label: "Vamos Conversar",
    href: contactLinks.whatsapp,
    phone: "(11) 96493-2007",
  },
};

export const heroContent = {
  eyebrow: "Criação de sites Profissionais",
  title: "Não começamos pelo site. Começamos pelo seu negócio.",
  lead:
    "Estratégia, UX/UI Design e desenvolvimento de experiências digitais para empresas que precisam comunicar melhor seu valor, gerar oportunidades e facilitar a jornada de seus clientes. Do entendimento do negócio à implementação, cada decisão é pensada para transformar objetivos em experiências digitais mais claras, relevantes e eficientes.",
  note:
    "Desenvolvimento de sites profissionais rápidos e responsivos.",
  media: {
    desktop: "/assets/images/hero_web.webp",
    mobile: "/assets/images/hero_mobile.webp",
  },
  primaryCta: {
    label: "Quero meu site",
    href: contactLinks.whatsapp,
  },
  secondaryCta: {
    label: "Ver projetos",
    href: routes.homeProjects,
  },
};

export const credibilityBarContent = {
  highlight: "+10",
  label: "Há mais de 10 anos desenvolvendo sites que fortalecem empresas e geram novas oportunidades de negócio.",
  cta1: {
    label: "Fale comigo agora",
    href: contactLinks.telegram,
  },
  cta2: {
    label: "Fale comigo agora",
    href: contactLinks.whatsapp,
  },
};

export const homeAboutContent = {
  eyebrow: "Sobre",
  title: "Quem vai desenvolver seu site?",
  description:
    "Sou Robson Svicero, UX/UI Designer e Desenvolvedor Front-end com mais de 10 anos de experiência criando sites para pequenas empresas.",
  complement: "Meu trabalho une estratégia, design e desenvolvimento para entregar sites rápidos, intuitivos e preparados para gerar resultados desde o primeiro acesso.",
  highlights: ["Desenvolvimento sob medida", "UX focado em conversão", "SEO técnico", "Atendimento direto durante todo o projeto"],
  image: {
    src: "/assets/images/sobre-robson.webp",
    alt: "Robson Svicero, designer e desenvolvedor web",
  },
  primaryCta: { label: "Conheça minha trajetória", to: routes.about },
  secondaryCta: { label: "Vamos conversar", href: contactLinks.whatsapp },
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

export const claroMethodContent = {
  eyebrow: "Método C.L.A.R.O.",
  title: "Menos dúvidas. Mais confiança para decidir.",
  description:
    "Um diagnóstico estratégico da sua presença digital para identificar barreiras, reduzir incertezas e orientar melhorias que aproximem visitantes dos objetivos do negócio.",
  pillars: [
    { initial: "C", label: "Clareza - compreensão rápida e objetiva da oferta e da proposta da empresa" },
    { initial: "L", label: "Legitimidade - transmissão de confiança por meio da presença digital da empresa" },
    { initial: "A", label: "Acessibilidade - facilidade de acesso, compreensão e uso da experiência proposta" },
    { initial: "R", label: "Relevância - alinhamento do conteúdo às necessidades reais do público" },
    { initial: "O", label: "Orientação - direcionamento natural e compreensível para a próxima etapa" },
  ],
  cta: {
    label: "Conheça o método",
    href: routes.claroMethod,
  },
  diagnosticCta: {
    label: "Solicitar diagnóstico",
    href: "/diagnostico-claro",
  },
};

export const servicesContent = {
  eyebrow: "Sites Profissionais",
  title: "Do entendimento do negócio à experiência digital",
  items: [
    {
      title: "Entendimento do negócio",
      description:
        "Antes de definir o que será desenvolvido, entendo seus objetivos, público, oferta e os principais desafios que precisam ser resolvidos.",
      iconPath: "M4 6h16M4 12h10M4 18h7",
    },
    {
      title: "Estratégia e experiência",
      description:
        "Estruturo a informação, a jornada e os pontos de contato para que sua empresa comunique melhor seu valor e facilite a tomada de decisão.",
      iconPath: "M5 20V8l7-4 7 4v12M9 20v-6h6v6",
    },
    {
      title: "UX/UI Design",
      description:
        "Transformo essa estratégia em uma experiência visual clara, intuitiva e alinhada à identidade da sua marca.",
      iconPath: "M4 5h16v14H4zM4 10h16M9 10v9",
    },
    {
      title: "Desenvolvimento",
      description:
        "Construo a solução com foco em performance, responsividade, acessibilidade e SEO, garantindo que o que foi planejado também funcione na prática.",
      iconPath: "M4 6h16M4 12h12M4 18h8",
    },
  ],
};

export const processContent = {
  eyebrow: "Como trabalho",
  title: "Um processo para tirar o site do papel com clareza.",
  lead:
  "Do entendimento do negócio à publicação no Google, cada etapa é pensada para transformar a presença digital da sua empresa em uma ferramenta de credibilidade e geração de contatos.",
  steps: [
    {
      number: "01",
      title: "Entendimento do negócio",
      description:
        "Mapeio oferta, público, objeções e o que precisa acontecer para o visitante virar contato. Uso IA para acelerar pesquisa e organização de referências.",
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
  title: "Projetos que transformaram problemas em experiências digitais",
  lead: "Cada projeto começa com um contexto diferente: uma empresa que precisava comunicar melhor seu valor, uma organização que precisava facilitar a captação de recursos ou um produto que precisava tornar sua experiência mais simples. Conheça alguns dos projetos em que estratégia, UX/UI Design e desenvolvimento trabalharam juntos para resolver esses desafios.",
  cta: {
    label: "Ver todos",
    href: "/cases",
  },
};

export const testimonialsContent = {
  eyebrow: "Depoimentos",
  title: "Projetos pensados para resolver problemas reais",
  lead: "Cada projeto parte de um desafio específico do negócio. O objetivo não é apenas entregar uma interface bem construída, mas criar uma experiência digital que ajude a empresa a comunicar, orientar e gerar oportunidades.",
  reviews: [
    {
      quote:
        "O novo site profissionalizou nossa imagem e nos deu uma ferramenta clara para mostrar onde o recurso é aplicado. O trabalho superou nossas expectativas.",
      author: "Carol Andrade",
      role: "Gestora de Projetos Sociais",
      business: "Instituto Sublim",
      segment: "Projetos sociais",
    },
    {
      quote:
        "O Robson nos ajudou a estruturar nossa proposta de valor. Com o desenvolvimento de um site profissional, que tornou nossa atuação mais clara e trouxe uma presença digital coerente com o nosso mercado.",
      author: "Marcelo Pelegrini",
      role: "CEO",
      business: "PowerBrain",
      segment: "Energia e tecnologia",
    },
  ],
};

export const faqContent = {
  eyebrow: "Perguntas frequentes",
  title: "Dúvidas comuns antes de tirar um projeto do papel.",
  lead: "Alguns pontos importantes para entender escopo, tecnologia, SEO, IA como apoio e formato de atendimento.",
  questions: [
    {
      question: "Como a IA entra no processo?",
      answer:
        "A IA entra como apoio complementar para pesquisa, organização de conteúdo e refinamento inicial. A estratégia, o posicionamento e a revisão final continuam sendo conduzidos por mim.",
    },
    {
      question: "O projeto já nasce preparado para SEO?",
      answer:
        "Sim. A entrega inclui uma base técnica de SEO com estrutura semântica, hierarquia de títulos, descrições, URLs adequadas quando aplicável, performance e responsividade, pronta para evoluir com conteúdo.",
    },
    {
      question: "Posso ampliar o site depois?",
      answer:
        "Sim. A estrutura é pensada para permitir novas páginas, seções, integrações e ajustes de conteúdo sem precisar recomeçar o projeto do zero.",
    },
    {
      question: "O painel administrativo vem incluso?",
      answer:
        "O painel pode ser incluído quando o projeto exige atualizações recorrentes. O escopo define quais textos, imagens e blocos poderão ser editados com autonomia.",
    },
    {
      question: "O site funciona bem no celular?",
      answer:
        "Sim. O layout é desenvolvido de forma responsiva para preservar clareza, navegação, desempenho e facilidade de contato em celulares, tablets e computadores.",
    },
    {
      question: "Você atende apenas São Paulo?",
      answer:
        "Não. O atendimento pode ser feito de forma remota para clientes de qualquer região do Brasil. Para projetos em São Paulo, também é possível alinhar necessidades específicas da atuação local, mas todo o processo de briefing, aprovação, desenvolvimento e entrega funciona muito bem online.",
    },
    
    {
      question: "O que você precisa ter pronto antes de começar?",
      answer:
        "Você não precisa chegar com tudo definido. É importante ter uma ideia dos serviços oferecidos, do público que deseja alcançar e do principal objetivo do site. Textos, estrutura e organização das informações podem ser construídos e refinados durante o processo. Caso já tenha logotipo, fotos e materiais da marca, eles também ajudam.",
    },
    {
      question: "Qual é a diferença entre site institucional e landing page?",
      answer:
        "O site institucional apresenta o negócio de forma mais completa, normalmente com páginas para serviços, sobre, projetos e contato. A landing page concentra a comunicação em uma única página e conduz o visitante para uma ação específica, como solicitar um orçamento, agendar uma conversa ou contratar um serviço.",
    },
  ],
};

export const homeFaqContent = {
  eyebrow: "Perguntas frequentes",
  title: "O que você precisa saber antes de criar seu site.",
  lead:
    "Respostas diretas para algumas das dúvidas mais comuns de quem está planejando uma presença profissional online.",
  questions: [
    {
      question: "Quanto custa criar um site",
      answer:
        "O investimento depende do problema que precisa ser resolvido e da complexidade da solução. Um projeto pode envolver estratégia, arquitetura da informação, UX/UI Design, desenvolvimento, SEO, integrações e funcionalidades específicas. Por isso, primeiro entendo o objetivo do negócio e o que a experiência precisa entregar. A partir disso, defino o escopo e preparo uma proposta adequada ao projeto, sem incluir recursos que não sejam necessários.",
    },
    {
      question: "Quanto tempo leva para desenvolver um site?",
      answer:
        "Um site institucional ou uma landing page costuma levar de 2 a 6 semanas, dependendo do tamanho do projeto, da disponibilidade dos conteúdos e da agilidade nas aprovações. O prazo é definido com clareza na proposta e inclui etapas de planejamento, design, desenvolvimento, revisão e publicação.",
    },
    {
      question: "Meu site aparecerá no Google?",
      answer:
        "Sim. Todos os sites são desenvolvidos seguindo boas práticas de SEO técnico, como estrutura semântica, performance, responsividade e metadados. Isso aumenta as chances de um bom posicionamento nas pesquisas. Vale lembrar que estar no Google é diferente de estar nas primeiras posições, que dependem de fatores como concorrência, estratégia de conteúdo e autoridade do domínio.",
    },
    {
      question: "O site funciona no celular?",
      answer:
        "Sim. Todos os projetos são desenvolvidos com abordagem responsiva, garantindo uma boa experiência em celulares, tablets e computadores. O conteúdo, a navegação e os elementos visuais se adaptam automaticamente ao tamanho da tela.",
    },
    {
      question: "Posso atualizar o conteúdo depois?",
      answer:
        "Sim. Dependendo da estrutura do projeto, é possível atualizar textos, imagens e outras informações sempre que necessário. Também ofereço suporte e manutenção para quem prefere não se preocupar com as atualizações.",
    },
    {
      question: "Vocês fazem landing pages?",
      answer:
        "Sim. Desenvolvo landing pages para campanhas, lançamento de produtos, captação de leads, apresentação de serviços e outras estratégias de conversão. Cada página é planejada para orientar o visitante até a ação desejada, seja preencher um formulário, solicitar um orçamento ou realizar uma compra.",
    },
  ],
};

export const faqPageContent = {
  eyebrow: "Todas as dúvidas",
  title: "Respostas para planejar seu site com mais segurança.",
  lead:
    "Reuni aqui as perguntas mais frequentes sobre investimento, prazo, processo, tecnologia, SEO e evolução do site.",
  questions: [
    ...homeFaqContent.questions,
    ...faqContent.questions.filter(
      (item) => item.question !== "O projeto já nasce preparado para SEO?",
    ),
  ],
};

export const contactContent = {
  eyebrow: "Conversão",
  title: "Vamos entender o que seu negócio precisa resolver",
  lead: "Se você precisa criar uma nova experiência digital ou repensar uma solução que já existe, conte um pouco sobre seu negócio, seus objetivos e o desafio que precisa enfrentar. A partir dessas informações, avaliamos o projeto e definimos o melhor caminho para desenvolver a solução.",
  links: [
    // { label: "Conversar no Telegram", href: "https://t.me/robsonsvicero", variant: "btn-telegram" },
    { label: "Conversar no WhatsApp", href: "https://wa.me/5511964932007", variant: "btn-whatsapp" },
    { label: "Enviar e-mail", href: "mailto:ola@robsonsvicero.com.br", variant: "outline" },
  ],
  meta: "ola@robsonsvicero.com.br - 11 96493-2007",
  formAction: "https://formspree.io/f/xbdevbne",
};

export const pageCtaContent = {
  home: {
    eyebrow: "Vamos criar seu site",
    title: "Seu próximo passo digital pode começar hoje.",
    lead:
      "Se você precisa de um site profissional com clareza estratégica, performance e SEO, posso conduzir o projeto com IA como apoio complementar no processo.",
    bandClass: "cta-home-band",
    primaryAction: {
      label: "Conversar no WhatsApp",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ver criação de sites",
      to: routes.siteCreation,
    },
  },
  cases: {
    eyebrow: "Tem um projeto parecido?",
    title: "Vamos transformar seu briefing em um site claro e confiável.",
    lead:
      "Posso aplicar o mesmo processo estratégico desses cases no seu projeto, do diagnóstico à publicação.",
    bandClass: "cta-cases-band",
    primaryAction: {
      label: "Conversar no WhatsApp",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Agendar uma conversa por vídeo",
      to: routes.schedule,
    },
  },
  caseDetail: {
    eyebrow: "Gostou deste case?",
    title: "Seu site pode ser o próximo projeto publicado aqui.",
    lead:
      "Vamos conversar sobre escopo, objetivo e estratégia para construir uma presença digital forte para a sua marca.",
    bandClass: "cta-case-detail-band",
    primaryAction: {
      label: "Conversar pelo WhatsApp",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ver mais cases",
      to: routes.cases,
    },
  },
  siteCreation: {
    eyebrow: "Próximo passo",
    title: "Se a sua marca precisa de um site profissional, este é o ponto de partida.",
    lead:
      "Atendo empresas de São Paulo e também projetos em outras cidades do Brasil, com reuniões online e acompanhamento durante o desenvolvimento.",
    bandClass: "dark-band",
    primaryAction: {
      label: "Conversar pelo WhatsApp",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Agendar conversa",
      to: routes.schedule,
    },
  },
  planosSiteCreation: {
    eyebrow: "Quer avançar?",
    title: "Nem todo projeto cabe em um pacote pronto.",
    lead:
      "Me conte o que você precisa vender, qual é sua meta e o que torna seu projeto diferente, que eu retorno com uma proposta sob medida para a sua necessidade, seja uma landing page ou um site institucional.",
    bandClass: "cta-home-band",
    primaryAction: {
      label: "Quero uma proposta",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ir para contato",
      to: routes.contact,
    },
  },
  uxDesignService: {
    eyebrow: "Próximo passo",
    title: "Vamos organizar a experiência do seu site com mais clareza e objetivo.",
    lead:
      "Se sua página não está convertendo como deveria, posso mapear fricções e desenhar uma jornada mais objetiva para o seu público.",
    bandClass: "dark-band",
    primaryAction: {
      label: "Falar sobre UX Design",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ver serviços",
      to: routes.services,
    },
  },
  visualIdentityService: {
    eyebrow: "Próximo passo",
    title: "Vamos alinhar sua identidade visual ao posicionamento da sua marca.",
    lead:
      "Posso estruturar uma direção visual consistente para fortalecer percepção, confiança e reconhecimento.",
    bandClass: "dark-band",
    primaryAction: {
      label: "Falar sobre identidade visual",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ver serviços",
      to: routes.services,
    },
  },
  seoService: {
    eyebrow: "Próximo passo",
    title: "Vamos melhorar sua visibilidade orgânica com SEO técnico e conteúdo.",
    lead:
      "Posso diagnosticar gargalos, priorizar ajustes e estruturar uma base de SEO mais consistente para atrair tráfego qualificado.",
    bandClass: "dark-band",
    primaryAction: {
      label: "Falar sobre SEO",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ver serviços",
      to: routes.services,
    },
  },
  landingPageService: {
    eyebrow: "Próximo passo",
    title: "Vamos transformar sua oferta em uma landing page que conduz à ação.",
    lead:
      "Posso estruturar uma página de conversão com narrativa objetiva, prova social e CTA claro para campanhas e lançamentos.",
    bandClass: "dark-band",
    primaryAction: {
      label: "Falar sobre Landing Page",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ver serviços",
      to: routes.services,
    },
  },
  about: {
    eyebrow: "Vamos conversar?",
    title: "Vamos conversar sobre o seu projeto?",
    lead:
      "Cada negócio possui desafios diferentes. Se você busca uma solução digital que una estratégia, experiência e tecnologia, vamos entender como posso contribuir para o crescimento da sua marca.",
    bandClass: "cta-about-band",
    primaryAction: {
      label: "Chamar no WhatsApp",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Agendar conversa",
      to: routes.schedule,
    },
  },
  siteCreationSaoPaulo: {
    eyebrow: "Criação de sites em São Paulo",
    title: "Seu negócio merece um site profissional para crescer em São Paulo.",
    lead:
      "Vamos construir uma presença digital clara, rápida e preparada para transformar buscas locais em contatos qualificados.",
    bandClass: "dark-band",
    primaryAction: {
      label: "Criar meu site em São Paulo",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ver projetos",
      to: routes.cases,
    },
  },
};

export const footerContent = {
  copyright: "2026 Robson Svicero",
  description:
    "Estratégia, design e tecnologia para transformar sua presença digital em oportunidades de negócio.",
  socials: [
    {
      label: "Telegram",
      href: contactLinks.telegram,
      icon: "telegram",
    },
    {
      label: "WhatsApp",
      href: contactLinks.whatsapp,
      icon: "whatsapp",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/robson.svicero",
      icon: "instagram",
    },
    {
      label: "GitHub",
      href: "https://github.com/robsonsvicero",
      icon: "github",
    },
    {
      label: "Behance",
      href: "https://www.behance.net/robsonsvicero",
      icon: "behance",
    },
  ],
  navEstudio: {
    label: "INSTITUCIONAL",
    links: [
      { label: "Home", href: routes.home },
      { label: "Sobre", href: routes.about },
      {
        label: "Criação de sites",
        href: routes.siteCreation,
        items: [
          { label: "Método C.L.A.R.O.", to: routes.claroMethod },
          { label: "Criação de sites em São Paulo", to: routes.siteCreationSaoPaulo },
          { label: "Landing Page", to: routes.landingPageService },
          { label: "SEO", to: routes.seoService },
          { label: "UX Design", to: routes.uxDesignService },
          { label: "Identidade Visual", to: routes.visualIdentityService },
        ],
      },
      { label: "Preços", href: routes.prices },
      { label: "Projetos", href: routes.cases },
      { label: "Blog", href: routes.blog },
    ],
  },
  navSuporte: {
    label: "SUPORTE",
    links: [
      { label: "Contato", href: routes.contact },
      { label: "Agendamentos", href: routes.schedule },
      { label: "FAQ", href: routes.faq },
    ],
  },
  bottomLinks: [
    { label: "Privacidade", href: routes.privacy },
    { label: "Exclusão de Dados", href: routes.exclusao },
  ],
  location: "São Paulo, Brasil",
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
  faq: {
    label: "FAQ",
    href: routes.faq,
  },
  services: {
    label: "Serviços",
    href: routes.services,
  },
};
