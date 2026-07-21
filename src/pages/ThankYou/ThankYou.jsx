import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";

export default function ThankYou() {
  return (
    <>
      <SEO
        title="Obrigado pelo contato | Criação de Sites em São Paulo"
        description="Sua mensagem foi enviada com sucesso. Em breve retornarei para conversar sobre o seu projeto em São Paulo."
        path="/obrigado"
        robots="noindex, follow"
      />
      <Layout>
        <section className="section utility-page" aria-labelledby="thank-you-title">
          <div className="container stack utility-page-content">
            <p className="eyebrow utility-page-success">Mensagem enviada</p>
            <h1 id="thank-you-title">Obrigado pelo contato!</h1>
            <p className="lead">
              Sua mensagem foi recebida com sucesso. Em breve, retornarei o contato
              para conversarmos sobre o seu projeto.
            </p>
            <Button href="/" variant="primary">
              Voltar para o inicio
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
}
