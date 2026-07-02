import PagePlaceholder from "../PagePlaceholder/PagePlaceholder.jsx";

export default function NotFound() {
  return (
    <PagePlaceholder
      eyebrow="404"
      title="Página não encontrada"
      description="O endereço acessado não existe ou foi movido."
      seo={{
        title: "Página não encontrada",
        description: "O endereço acessado não existe ou foi movido.",
        path: "/404",
        robots: "noindex, follow",
      }}
    />
  );
}
