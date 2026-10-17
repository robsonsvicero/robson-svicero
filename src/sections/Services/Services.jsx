import { List, PencilRuler, Search, SquareTerminal, Workflow } from "lucide-react";
import IconInfoCard from "../../components/IconInfoCard/IconInfoCard.jsx";
import Section from "../../components/ui/Section/Section.jsx";
import ScrollReveal from "../../components/ScrollReveal.jsx";
import SectionHeader from "../../components/ui/SectionHeader/SectionHeader.jsx";
import { servicesContent } from "../../content/siteContent.js";

const serviceIcons = {
  "list-search": ListSearchIcon,
  workflow: Workflow,
  "pencil-ruler": PencilRuler,
  "square-terminal": SquareTerminal,
};

function ListSearchIcon() {
  return (
    <span className="services-list-search">
      <List />
      <Search />
    </span>
  );
}

export default function Services() {
  return (
    <Section
      className="section_testimonial--navy"
      id="servicos"
      data-od-id="servicos"
      aria-labelledby="sec-servicos"
      containerClassName="container services-container"
    >
      <SectionHeader
        label={servicesContent.eyebrow || "O Que Fazemos"}
        title={servicesContent.title}
        subtitle="Estratégia, conteúdo, design e desenvolvimento integrados para lançar uma presença digital de alto impacto e resultados duradouros."
        id="sec-servicos"
        align="center"
        isDark={true}
      />
      <div className="services-grid">
        {servicesContent.items.map((service, index) => {
          const Icon = serviceIcons[service.icon];

          return (
            <ScrollReveal className="services-card-reveal" key={service.title}>
              <IconInfoCard
                icon={Icon}
                title={service.title}
                description={service.description}
                stage={`ETAPA ${String(index + 1).padStart(2, "0")}`}
              />
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
