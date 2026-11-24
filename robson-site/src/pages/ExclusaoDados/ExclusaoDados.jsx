import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";

const dataDeletionSections = [
  {
    title: "1. Introdução",
    paragraphs: [
      "Esta página explica como você pode solicitar a exclusão dos seus dados pessoais coletados através do site robsonsvicero.com.br, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). O compromisso é garantir que você tenha controle total sobre suas informações pessoais.",
    ],
  },
  {
    title: "2. Quais dados podem ser excluídos",
    paragraphs: [
      "Você pode solicitar a exclusão dos seguintes dados coletados através do formulário de contato:",
    ],
    items: [
      "Nome informado no formulário de contato.",
      "Endereço de e-mail utilizado para comunicação.",
      "Informações sobre o projeto descritas na solicitação.",
      "Histórico de trocas de mensagens relacionadas ao seu contato.",
    ],
  },
  {
    title: "3. Como solicitar a exclusão",
    paragraphs: [
      "Para solicitar a exclusão dos seus dados pessoais, siga um dos passos abaixo:",
    ],
    items: [
      'Envie um e-mail para ola@robsonsvicero.com.br com o assunto "Solicitação de Exclusão de Dados".',
      "Informe o nome e o e-mail utilizados no momento do contato original, para que seja possível localizar seus registros.",
      "Caso deseje, descreva o motivo da solicitação. Essa informação não é obrigatória.",
    ],
    after:
      "A solicitação será confirmada por e-mail em até 2 dias úteis após o recebimento.",
  },
  {
    title: "4. Prazo para exclusão",
    paragraphs: [
      "Após a confirmação da identidade do solicitante, os dados pessoais serão removidos dos registros e sistemas em até 15 dias úteis. Você receberá uma notificação por e-mail assim que o processo de exclusão for concluído.",
    ],
  },
  {
    title: "5. Exceções à exclusão",
    paragraphs: [
      "Em alguns casos, é possível que determinadas informações sejam mantidas por período adicional, quando exigido por lei ou para cumprimento de obrigações legais, fiscais ou contratuais. Nessas situações, você será informado sobre o motivo e o prazo de retenção aplicável.",
    ],
  },
  {
    title: "6. Efeitos da exclusão",
    paragraphs: [
      "Após a exclusão dos seus dados, não será possível dar continuidade às comunicações ou propostas relacionadas ao contato realizado anteriormente. Caso deseje retomar o contato no futuro, será necessário preencher novamente o formulário disponível no site.",
    ],
  },
  {
    title: "7. Contato",
    paragraphs: [
      "Para dúvidas sobre esta página ou para dar andamento a uma solicitação de exclusão, entre em contato pelo e-mail ola@robsonsvicero.com.br.",
    ],
  },
];

export default function DataDeletion() {
  return (
    <>
      <SEO
        title="Exclusão de Dados | Robson Svicero"
        description="Saiba como solicitar a exclusão dos seus dados pessoais coletados no site de Robson Svicero, em conformidade com a LGPD."
        path="/exclusao-de-dados"
      />

      <Layout>
        <section
          className="section legal-page"
          aria-labelledby="data-deletion-title"
        >
          <div className="container legal-content">
            <p className="eyebrow">Transparência e LGPD</p>

            <h1 id="data-deletion-title">Exclusão de Dados</h1>

            <p className="meta">Última atualização: junho de 2026</p>

            {dataDeletionSections.map((section) => (
              <section className="legal-section" key={section.title}>
                <h2>{section.title}</h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.items && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.after && <p>{section.after}</p>}
              </section>
            ))}

            <div className="legal-actions">
              <Button href="/" variant="secondary">
                Voltar para o início
              </Button>

              <Button
                href="mailto:ola@robsonsvicero.com.br"
                variant="primary"
              >
                Solicitar exclusão
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}