export const routes = {
  home: "/",
  services: "/servicos",
  cases: "/cases",
  blog: "/blog",
  about: "/sobre",
  contact: "/contato",
  schedule: "/agendamentos",
  faq: "/faq",
  homeProjects: "/#projetos",
  privacy: "/privacidade",
  claroMethod: "/metodo-claro",
};

export const contactLinks = {
  whatsapp:
    "https://wa.me/5511964932007?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.",
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
    { label: "Criação de sites", to: routes.services },
    { label: "Método C.L.A.R.O.", to: routes.claroMethod },
    { label: "Sobre", to: routes.about },
    { label: "Projetos", to: routes.cases },
    { label: "Blog", to: routes.blog },
    { label: "Contato", to: routes.contact },
    { label: "Agendamentos", to: routes.schedule },
  ],
  cta: {
    label: "Atendimento ao Cliente",
    href: contactLinks.whatsapp,
    phone: "(11) 96493-2007",
  },
};

export const heroContent = {
  eyebrow: "Criação de sites - UX Design",
  title: "Criação de sites profissionais para empresas e marcas.",
  lead:
    "Sites claros e estratégicos para profissionais e pequenos negócios que querem transmitir confiança e transformar visitas em oportunidades.",
  note:
    "Transformo a sua presença digital em uma ferramenta para gerar contatos e oportunidades.",
  media: {
    desktop: "/assets/images/hero_web.webp",
    mobile: "/assets/images/hero_mobile.webp",
  },
  primaryCta: {
    label: "Vamos falar sobre o seu projeto",
    href: contactLinks.whatsapp,
  },
  secondaryCta: {
    label: "Ver projetos",
    href: routes.homeProjects,
  },
};

export const credibilityBarContent = {
  highlight: "+10",
  label: "Há mais de 10 anos criando experiências digitais que fortalecem empresas e marcas.",
  cta: {
    label: "Fale comigo agora",
    href: contactLinks.whatsapp,
  },
};

export const homeAboutContent = {
  eyebrow: "Sobre",
  title: "Da curiosidade por programação a sites pensados para gerar resultados.",
  description:
    "Meu nome é Robson Svicero e trabalho com sites desde 2013. Comecei criando páginas em HTML e CSS para amigos, passei pelo webdesign e encontrei no UX uma forma mais estratégica de pensar cada projeto.",
  complement:
    "Depois de atuar em diferentes empresas e participar de projetos como a atualização da Universal Music Store, decidi, em 2025, assumir meus próprios projetos. Hoje ajudo pequenos negócios a terem sites claros, profissionais e realmente úteis para seus clientes.",
  highlights: ["Sites desde 2013", "+50 projetos entregues", "Estratégia e técnicas de UX"],
  image: {
    src: "/assets/images/sobre-robson.webp",
    alt: "Robson Svicero, designer e desenvolvedor front-end",
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
  title: "Criação de sites profissionais do briefing à publicação.",
  items: [
    {
      title: "Estratégia e conteúdo",
      description:
        "Organização da narrativa da página com apoio de IA para acelerar pesquisa, estruturação e refinamento inicial.",
      iconPath: "M4 6h16M4 12h10M4 18h7",
    },
    {
      title: "Design sob medida",
      description:
        "Interface alinhada à marca, com leitura clara, responsividade e foco em credibilidade.",
      iconPath: "M5 20V8l7-4 7 4v12M9 20v-6h6v6",
    },
    {
      title: "Desenvolvimento e SEO base",
      description:
        "Entrega em React com base semântica, performance e estrutura pensada para crescer.",
      iconPath: "M4 5h16v14H4zM4 10h16M9 10v9",
    },
  ],
};

export const processContent = {
  eyebrow: "Como trabalho",
  title: "Um processo para tirar o site do papel com clareza.",
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
  title: "Cases que mostram estratégia, design e implementação trabalhando juntos.",
  cta: {
    label: "Ver todos",
    href: "/cases",
  },
};

export const testimonialsContent = {
  eyebrow: "Depoimentos",
  title: "Resultados percebidos por quem já confiou no meu trabalho.",
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
        "O Robson nos ajudou a estruturar nossa proposta de valor. O novo site tornou nossa atuação mais clara e trouxe uma presença digital coerente com o nosso mercado.",
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
  ],
};

export const homeFaqContent = {
  eyebrow: "Perguntas frequentes",
  title: "O que você precisa saber antes de criar seu site.",
  lead:
    "Respostas diretas para algumas das dúvidas mais comuns de quem está planejando uma presença profissional online.",
  questions: [
    {
      question: "Quanto custa um site?",
      answer:
        "O investimento depende do tipo de site, da quantidade de páginas, do conteúdo disponível, das funcionalidades e de integrações como formulários, agenda ou painel administrativo. Por isso, primeiro entendo o objetivo e o escopo do projeto para preparar uma proposta coerente com o que o negócio realmente precisa, sem incluir recursos desnecessários.",
    },
    {
      question: "Quanto tempo leva para colocar um site no ar?",
      answer:
        "Um site institucional ou uma landing page costuma levar de 2 a 6 semanas, dependendo do tamanho do projeto, da disponibilidade dos conteúdos e da agilidade nas aprovações. O prazo é definido com clareza na proposta e inclui etapas de planejamento, design, desenvolvimento, revisão e publicação.",
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
    {
      question: "O site já é feito com SEO?",
      answer:
        "Sim. Todos os sites são desenvolvidos com uma base técnica de SEO, incluindo estrutura semântica, hierarquia de títulos, descrições, URLs adequadas, responsividade e atenção à performance. O cliente também pode contratar, separadamente, o serviço de acompanhamento mensal de SEO. Nesse trabalho, o site é monitorado e otimizado mês a mês, com ajustes técnicos e de conteúdo para melhorar sua relevância e competitividade nas buscas do Google. Como o ranqueamento também depende da concorrência e dos critérios do buscador, não é possível garantir uma posição específica.",
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
  title: "Tem um projeto em mente?",
  lead: "Vamos conversar sobre a criação do seu site profissional e mudar a presença digital da sua marca.",
  links: [
    { label: "Agendar reunião", href: routes.schedule, variant: "primary" },
    {
      label: "Enviar e-mail",
      href: "mailto:ola@robsonsvicero.com.br?subject=Informações%20sobre%20projeto",
      variant: "secondary",
    },
    { label: "Chamar no WhatsApp", href: "https://wa.me/5511964932007", variant: "secondary" },
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
      label: "Falar no WhatsApp",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ver criação de sites",
      to: routes.services,
    },
  },
  cases: {
    eyebrow: "Tem um projeto parecido?",
    title: "Vamos transformar seu briefing em um site claro e confiável.",
    lead:
      "Posso aplicar o mesmo processo estratégico desses cases no seu projeto, do diagnóstico à publicação.",
    bandClass: "cta-cases-band",
    primaryAction: {
      label: "Quero conversar",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Agendar conversa",
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
      label: "Falar no WhatsApp",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Ver mais cases",
      to: routes.cases,
    },
  },
  services: {
    eyebrow: "Próximo passo",
    title: "Se a sua marca precisa de um site profissional, este é o ponto de partida.",
    lead:
      "Posso estruturar a página principal da sua presença digital com foco em clareza, credibilidade e conversão.",
    bandClass: "dark-band",
    primaryAction: {
      label: "Falar no WhatsApp",
      href: contactLinks.whatsapp,
      newTab: true,
    },
    secondaryAction: {
      label: "Agendar conversa",
      to: routes.schedule,
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
  faq: {
    label: "FAQ",
    href: routes.faq,
  },
};
