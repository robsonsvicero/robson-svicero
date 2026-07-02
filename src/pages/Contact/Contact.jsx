import PagePlaceholder from "../PagePlaceholder/PagePlaceholder.jsx";

export default function Contact() {
  return (
    <PagePlaceholder
      eyebrow="Contato"
      title="Contato"
      description="Página dedicada para concentrar canais de contato, formulário e caminhos de agendamento."
      seo={{
        title: "Contato",
        description:
          "Entre em contato para conversar sobre landing pages, sites institucionais, UX/UI Design e desenvolvimento front-end React.",
        path: "/contato",
      }}
    />
  );
}
