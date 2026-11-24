import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import { agendaVita } from "../../lib/agendaVita.js";

const initialForm = { professional: "", date: "", time: "", name: "", phone: "", email: "" };
const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });

const errors = {
  clinic_not_found: "A agenda não está disponível no momento.",
  professional_has_no_schedule_configuration: "Este profissional ainda não possui horários configurados.",
  time_unavailable: "Este horário não está mais disponível. Escolha outro horário.",
  past_date_not_allowed: "Escolha uma data a partir de hoje.",
  rate_limited: "Aguarde um instante antes de fazer outra consulta.",
};

const readableError = (error) => errors[error.message] || "Não foi possível consultar a agenda. Tente novamente.";

export default function Agendamento() {
  const [form, setForm] = useState(initialForm);
  const [professionals, setProfessionals] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = useMemo(() => Object.values(form).every(Boolean), [form]);

  useEffect(() => {
    let active = true;

    agendaVita("info")
      .then((data) => {
        if (active) setProfessionals(data.professionals || []);
      })
      .catch((cause) => {
        if (active) setError(readableError(cause));
      })
      .finally(() => {
        if (active) setLoadingInfo(false);
      });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!form.professional || !form.date) {
      setSlots([]);
      return undefined;
    }

    let active = true;
    setLoadingSlots(true);
    setError("");
    setSlots([]);

    agendaVita("slots", { professionalId: Number(form.professional), date: form.date })
      .then((data) => {
        if (active) setSlots(data.slots || []);
      })
      .catch((cause) => {
        if (active) setError(readableError(cause));
      })
      .finally(() => {
        if (active) setLoadingSlots(false);
      });

    return () => { active = false; };
  }, [form.date, form.professional]);

  function update(field, value) {
    setSubmitted(false);
    setError("");
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(["professional", "date"].includes(field) ? { time: "" } : {}),
    }));
  }

  async function submit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");

    try {
      await agendaVita("book", {
        professionalId: Number(form.professional),
        date: form.date,
        time: form.time,
        patient: { name: form.name, phone: form.phone, email: form.email },
      });
      setSubmitted(true);
      setSlots((current) => current.filter((time) => time !== form.time));
      setForm(initialForm);
    } catch (cause) {
      setError(readableError(cause));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Agendamento online | Robson Svicero"
        description="Escolha o profissional, a data e o melhor horário para seu atendimento."
        path="/agendamento"
      />
      <Layout>
        <section className="section appointment-page" aria-labelledby="appointment-title">
          <div className="container appointment-hero">
            <div className="appointment-copy">
              <p className="eyebrow">Agendamento online</p>
              <h1 id="appointment-title">Escolha um horário para o seu atendimento.</h1>
              <p className="lead">
                Consulte a disponibilidade em tempo real e conclua seu agendamento em poucos passos.
              </p>
            </div>
            <div className="appointment-hero-note">
              <span className="appointment-note-number">01</span>
              <p>Selecione o profissional e a data para ver apenas os horários disponíveis.</p>
            </div>
          </div>

          <div className="container appointment-layout">
            <aside className="appointment-aside" aria-label="Como funciona">
              <p className="eyebrow">Como funciona</p>
              <h2>Uma escolha simples, do seu jeito.</h2>
              <ol className="appointment-steps">
                <li><span>01</span><div><strong>Profissional</strong><p>Escolha quem irá conduzir seu atendimento.</p></div></li>
                <li><span>02</span><div><strong>Data e horário</strong><p>Veja a agenda atualizada antes de confirmar.</p></div></li>
                <li><span>03</span><div><strong>Confirmação</strong><p>Receba os detalhes no e-mail informado.</p></div></li>
              </ol>
            </aside>

            <form className="appointment-form" onSubmit={submit} noValidate>
              <div className="appointment-form-heading">
                <div>
                  <p className="eyebrow">Disponibilidade</p>
                  <h2>Agende sua consulta</h2>
                </div>
                <span className="appointment-status">Online</span>
              </div>

              <div className="appointment-fields">
                <label className="field">
                  <span>Profissional</span>
                  <select value={form.professional} onChange={(event) => update("professional", event.target.value)} disabled={loadingInfo} required>
                    <option value="">{loadingInfo ? "Carregando..." : "Selecione um profissional"}</option>
                    {professionals.map((professional) => (
                      <option key={professional.id} value={professional.id}>
                        {professional.name}{professional.specialty ? ` — ${professional.specialty}` : ""}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>Data</span>
                  <input type="date" value={form.date} min={today} onChange={(event) => update("date", event.target.value)} required />
                </label>
              </div>

              <fieldset className="appointment-slots">
                <legend>Horário</legend>
                {!form.professional || !form.date ? (
                  <p className="appointment-empty">Escolha o profissional e a data para consultar a agenda.</p>
                ) : loadingSlots ? (
                  <p className="appointment-empty">Consultando horários disponíveis...</p>
                ) : slots.length ? (
                  <div className="appointment-slot-grid">
                    {slots.map((time) => (
                      <button
                        className={form.time === time ? "appointment-slot is-selected" : "appointment-slot"}
                        type="button"
                        key={time}
                        onClick={() => update("time", time)}
                        aria-pressed={form.time === time}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="appointment-empty">Não há horários disponíveis para esta data.</p>
                )}
              </fieldset>

              <div className="appointment-fields">
                <label className="field">
                  <span>Nome completo</span>
                  <input value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" placeholder="Como podemos chamar você?" required />
                </label>
                <label className="field">
                  <span>Telefone</span>
                  <input value={form.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" type="tel" placeholder="(11) 99999-9999" required />
                </label>
                <label className="field appointment-email-field">
                  <span>E-mail</span>
                  <input value={form.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" type="email" placeholder="voce@exemplo.com" required />
                </label>
              </div>

              {error ? <p className="appointment-message is-error" role="alert">{error}</p> : null}
              {submitted ? <p className="appointment-message is-success" role="status">Agendamento confirmado. Enviamos os detalhes para o e-mail informado.</p> : null}

              <Button as="button" type="submit" variant="dark" disabled={!canSubmit || submitting}>
                {submitting ? "Confirmando..." : "Confirmar agendamento"}
              </Button>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
}
