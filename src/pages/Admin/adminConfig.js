export const adminResources = {
  posts: {
    table: "blog_posts",
    label: "Artigos do blog",
    singular: "artigo",
    description: "Crie, edite e publique conteudos para o blog.",
    orderBy: "published_at",
    fields: [
      { name: "title", label: "Titulo", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "category", label: "Categoria", type: "text" },
      { name: "excerpt", label: "Resumo", type: "textarea" },
      { name: "seo_title", label: "SEO title", type: "text" },
      { name: "seo_description", label: "Meta description", type: "textarea" },
      { name: "published_at", label: "Data de publicacao", type: "date" },
      { name: "reading_time", label: "Tempo de leitura", type: "text" },
      { name: "intro", label: "Introducao", type: "textarea" },
      {
        name: "sections",
        label: "Secoes em JSON",
        type: "json",
        placeholder:
          '[{"title":"Titulo da secao","body":"Texto da secao"}]',
      },
    ],
  },
  projects: {
    table: "projects",
    label: "Projetos",
    singular: "projeto",
    description: "Gerencie os cases e projetos exibidos no site.",
    orderBy: "created_at",
    fields: [
      { name: "title", label: "Titulo", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "description", label: "Descricao curta", type: "textarea" },
      { name: "full_description", label: "Descricao completa", type: "textarea" },
      { name: "meta_description", label: "Texto do card", type: "textarea" },
      { name: "seo_title", label: "SEO title", type: "text" },
      { name: "seo_description", label: "SEO description", type: "textarea" },
      { name: "image", label: "Imagem", type: "text" },
      { name: "alt", label: "Texto alternativo", type: "text" },
      { name: "external_url", label: "URL externa", type: "url" },
    ],
  },
};

export function getEmptyRecord(fields) {
  return fields.reduce((record, field) => {
    record[field.name] = field.type === "json" ? [] : "";
    return record;
  }, {});
}
