import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";

const calendarSrc =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3S6AUwPJ-chepVSTPkcebN4Yxr3rvuJRGn4GKrWe0li_4FoV_JUievAzG1w5ex33xBqJ2zmEfy?gv=true";

export default function Schedule() {
  return (
    <>
      <SEO
        title="Agendamentos"
        description="Agende uma conversa com Robson Svicero para discutir seu projeto de Criação de sites e UX/UI Design."
        path="/agendamentos"
      />
      <Layout>
        <section className="section" aria-labelledby="schedule-title">
          <div className="container schedule-shell">
            <p className="eyebrow">Agenda online</p>
            <h1 id="schedule-title">Escolha o melhor horário para nossa conversa.</h1>
            <p className="lead" style={{ marginTop: "var(--space-4)" }}>
              Selecione um horário disponível na agenda. Após confirmar, você
              receberá os detalhes automaticamente.
            </p>

            <div className="schedule-card">
              <iframe
                className="schedule-iframe"
                src={calendarSrc}
                title="Agenda de reuniões com Robson Svicero"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
              />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
