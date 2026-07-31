import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Check, ChevronLeft, Clock3, ShieldCheck, Stethoscope } from 'lucide-react';
import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import { agendaVita } from '../../lib/agendaVita';

const initialForm = { professional: '', date: '', time: '', name: '', phone: '', email: '' };
const today = new Date().toISOString().slice(0, 10);
const readableError = (error) => ({ clinic_not_found: 'A organização de teste não foi encontrada ou está inativa.', professional_has_no_schedule_configuration: 'Este profissional ainda não possui horários configurados.', time_unavailable: 'Este horário não está mais disponível. Escolha outro horário.' }[error.message] || error.message);

const Agendamento = () => {
  const [form, setForm] = useState(initialForm);
  const [professionals, setProfessionals] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const canSubmit = useMemo(() => Object.values(form).every(Boolean), [form]);

  useEffect(() => {
    let active = true;
    agendaVita('info').then((data) => { if (active) setProfessionals(data.professionals || []); }).catch((cause) => { if (active) setError(readableError(cause)); }).finally(() => { if (active) setLoadingInfo(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!form.professional || !form.date) { setSlots([]); return; }
    let active = true;
    setLoadingSlots(true); setError(''); setSlots([]);
    agendaVita('slots', { professionalId: Number(form.professional), date: form.date }).then((data) => { if (active) setSlots(data.slots || []); }).catch((cause) => { if (active) setError(readableError(cause)); }).finally(() => { if (active) setLoadingSlots(false); });
    return () => { active = false; };
  }, [form.professional, form.date]);

  const update = (field, value) => { setSubmitted(false); setError(''); setForm((current) => ({ ...current, [field]: value, ...(['professional', 'date'].includes(field) ? { time: '' } : {}) })); };
  const submit = async (event) => {
    event.preventDefault(); if (!canSubmit) return;
    setSubmitting(true); setError('');
    try { await agendaVita('book', { professionalId: Number(form.professional), date: form.date, time: form.time, patient: { name: form.name, phone: form.phone, email: form.email } }); setSubmitted(true); setSlots((current) => current.filter((time) => time !== form.time)); setForm(initialForm); }
    catch (cause) { setError(readableError(cause)); }
    finally { setSubmitting(false); }
  };

  return <div className="min-h-screen bg-ds-bg text-ds-text font-body"><SEOHelmet title="Agendamento online" description="Agende seu atendimento online." canonical="https://robsonsvicero.com.br/agendamento" /><Header /><main><section className="relative overflow-hidden border-b border-ds-border pt-16 sm:pt-24 lg:pt-28"><div className="pointer-events-none absolute -right-24 -top-32 size-[30rem] rounded-full bg-ds-accent/10 blur-3xl" /><div className="pointer-events-none absolute -bottom-44 -left-32 size-[28rem] rounded-full bg-ds-tech/10 blur-3xl" /><div className="relative mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-20"><a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-ds-muted transition-colors hover:text-ds-accent"><ChevronLeft size={17} /> Voltar ao site</a><div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr]"><div><p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-ds-accent">Agendamento online</p><h1 className="mt-5 max-w-4xl text-4xl font-medium leading-[.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Uma agenda que parece parte do seu site.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-ds-muted">Escolha o profissional, a data e o melhor horário para seu atendimento.</p></div><div className="rounded-[1.75rem] border border-ds-border bg-white/70 p-6 shadow-sm backdrop-blur sm:p-7"><div className="flex items-start gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-ds-text text-white"><ShieldCheck size={21} /></div><div><p className="text-sm font-semibold">Experiência integrada</p><p className="mt-1 text-sm leading-relaxed text-ds-muted">Os horários são consultados em tempo real e sua confirmação é enviada por e-mail.</p></div></div></div></div></div></section><section className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-12"><aside className="rounded-[2rem] bg-ds-text p-8 text-white sm:p-10"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ds-accent">Agendamento online</p><h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight">Escolha o melhor horário para você.</h2><p className="mt-5 leading-relaxed text-white/65">Uma página direta, elegante e pensada para reduzir atrito antes da primeira conversa.</p><div className="mt-10 space-y-5 border-t border-white/10 pt-8"><Feature icon={<Stethoscope size={18} />} title="Profissional" text="Selecione quem irá conduzir seu atendimento." /><Feature icon={<CalendarDays size={18} />} title="Agenda atualizada" text="Veja somente horários realmente livres." /><Feature icon={<Clock3 size={18} />} title="Confirmação imediata" text="Receba os detalhes do agendamento por e-mail." /></div></aside><section className="rounded-[2rem] border border-ds-border bg-white p-6 shadow-sm sm:p-10"><div className="flex items-start justify-between gap-5 border-b border-ds-border pb-6"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ds-accent">Agenda disponível</p><h2 className="mt-2 text-2xl font-medium tracking-tight">Agende sua consulta</h2></div><span className="rounded-full bg-ds-tech/10 px-3 py-1.5 text-[11px] font-semibold text-ds-tech">Online</span></div><form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Profissional"><select value={form.professional} onChange={(event) => update('professional', event.target.value)} disabled={loadingInfo} required className="agenda-input"><option value="">{loadingInfo ? 'Carregando…' : 'Selecione'}</option>{professionals.map((professional) => <option key={professional.id} value={professional.id}>{professional.name}{professional.specialty ? ` | ${professional.specialty}` : ''}</option>)}</select></Field><Field label="Data"><input type="date" value={form.date} min={today} onChange={(event) => update('date', event.target.value)} required className="agenda-input" /></Field><div className="sm:col-span-2"><label className="text-sm font-medium">Horário</label><div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">{!form.professional || !form.date ? <p className="col-span-full rounded-xl bg-ds-bg p-4 text-sm text-ds-muted">Selecione o profissional e a data para consultar a agenda.</p> : loadingSlots ? <p className="col-span-full rounded-xl bg-ds-bg p-4 text-sm text-ds-muted">Consultando horários disponíveis…</p> : slots.length ? slots.map((time) => <button type="button" key={time} onClick={() => update('time', time)} className={`rounded-xl border px-2 py-3 text-sm font-semibold transition-colors ${form.time === time ? 'border-ds-accent bg-ds-accent text-white' : 'border-ds-border text-ds-text hover:border-ds-accent hover:text-ds-accent'}`}>{time}</button>) : <p className="col-span-full rounded-xl bg-ds-bg p-4 text-sm text-ds-muted">Nenhum horário disponível nesta data.</p>}</div></div><Field label="Nome completo"><input value={form.name} onChange={(event) => update('name', event.target.value)} required placeholder="Como podemos chamar você?" className="agenda-input" /></Field><Field label="Telefone"><input value={form.phone} onChange={(event) => update('phone', event.target.value)} required placeholder="(11) 99999-9999" className="agenda-input" /></Field><Field label="E-mail" className="sm:col-span-2"><input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} required placeholder="voce@exemplo.com" className="agenda-input" /></Field><div className="sm:col-span-2"><button disabled={!canSubmit || submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ds-accent px-6 py-4 text-sm font-bold uppercase tracking-[.12em] text-white transition-all hover:-translate-y-0.5 hover:bg-ds-accent-hover disabled:cursor-not-allowed disabled:opacity-40"><CalendarDays size={18} /> {submitting ? 'Confirmando…' : 'Agendar'}</button></div></form>{error && <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}{submitted && <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><Check className="mt-0.5 shrink-0" size={18} /><p>Agendamento confirmado. Enviamos os detalhes para o e-mail informado.</p></div>}</section></div></section></main><Footer /></div>;
};
function Feature({ icon, title, text }) { return <div className="flex gap-4"><div className="mt-0.5 text-ds-accent">{icon}</div><div><h3 className="font-medium">{title}</h3><p className="mt-1 text-sm leading-relaxed text-white/60">{text}</p></div></div>; }
function Field({ label, className = '', children }) { return <label className={`block min-w-0 max-w-full ${className}`}><span className="text-sm font-medium">{label}</span>{children}</label>; }
export default Agendamento;
