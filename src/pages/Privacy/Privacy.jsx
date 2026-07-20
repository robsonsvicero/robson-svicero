import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";

const privacySections = [
  {
    title: "1. Introducao",
    paragraphs: [
      "Esta Politica de Privacidade descreve como suas informacoes pessoais sao coletadas, usadas e compartilhadas quando voce visita ou preenche o formulario no site robsonsvicero.com.br. O compromisso e garantir a seguranca e a privacidade dos seus dados, de acordo com a Lei Geral de Protecao de Dados (LGPD - Lei no 13.709/2018).",
    ],
  },
  {
    title: "2. Dados que coletamos",
    paragraphs: [
      "Ao utilizar o formulario de contato, coletamos as seguintes informacoes pessoais de forma consentida:",
    ],
    items: [
      "Nome: para identificacao e personalizacao do atendimento.",
      "E-mail: para retornar o contato e enviar propostas ou informacoes solicitadas.",
      "Sobre o projeto: detalhes sobre o que voce precisa construir, para entender o contexto e avaliar a viabilidade.",
    ],
  },
  {
    title: "3. Como usamos seus dados",
    paragraphs: ["Os dados coletados tem a finalidade exclusiva de:"],
    items: [
      "Responder a sua solicitacao de orcamento ou contato.",
      "Entender melhor as necessidades do seu projeto.",
      "Manter um historico de comunicacao para projetos futuros.",
    ],
    after:
      "Nao compartilhamos, vendemos ou alugamos suas informacoes pessoais para terceiros sob nenhuma circunstancia, exceto quando exigido por lei.",
  },
  {
    title: "4. Armazenamento e seguranca",
    paragraphs: [
      "Os envios do formulario sao processados por servicos de terceiros e encaminhados para meu e-mail profissional. Adoto boas praticas para proteger suas informacoes contra acessos nao autorizados.",
    ],
  },
  {
    title: "5. Cookies e tecnologias de rastreamento",
    paragraphs: [
      "O site utiliza cookies para melhorar a experiencia de navegacao e analisar o trafego de visitantes de forma anonima. Voce pode configurar seu navegador para recusar cookies, mas isso pode limitar algumas funcionalidades do site. O consentimento para o uso de cookies e solicitado por um banner no primeiro acesso.",
    ],
  },
  {
    title: "6. Seus direitos pela LGPD",
    paragraphs: ["De acordo com a LGPD, voce tem o direito de:"],
    items: [
      "Solicitar acesso aos dados que possuo sobre voce.",
      "Solicitar a correcao de dados incompletos ou incorretos.",
      "Solicitar a exclusao dos seus dados pessoais dos meus registros.",
    ],
    after: "Para exercer esses direitos, entre em contato pelo e-mail abaixo.",
  },
  {
    title: "7. Contato",
    paragraphs: [
      "Para mais informacoes sobre as praticas de privacidade ou se voce tiver duvidas, entre em contato pelo e-mail ola@robsonsvicero.com.br.",
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <SEO
        title="Politica de Privacidade | Robson Svicero"
        description="Politica de Privacidade, uso de cookies e informacoes sobre LGPD no site de Robson Svicero."
        path="/privacidade"
      />
      <Layout>
        <section className="section legal-page" aria-labelledby="privacy-title">
          <div className="container legal-content">
            <p className="eyebrow">Transparencia e LGPD</p>
            <h1 id="privacy-title">Politica de Privacidade</h1>
            <p className="meta">Ultima atualizacao: Junho de 2026</p>

            {privacySections.map((section) => (
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
                Voltar para o inicio
              </Button>
              <Button href="mailto:ola@robsonsvicero.com.br" variant="primary">
                Enviar e-mail
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
