import { useEffect, useRef, useState } from "react";
import "./ProjetoPresenca.css";

/* ─── Inject Google Fonts (DM Sans + DM Mono) ──────────── */
function InjectFonts() {
  useEffect(() => {
    const id = "pp-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

/* ─── Inject Phosphor Icons CDN ─────────────────────────── */
function InjectPhosphor() {
  useEffect(() => {
    const id = "pp-phosphor";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = "https://unpkg.com/@phosphor-icons/web@2.1.1/src/index.js";
    script.type = "module";
    document.head.appendChild(script);
  }, []);
  return null;
}

/* ─── IntersectionObserver fade-up hook ─────────────────── */
function useFadeUp(threshold) {
  const t = threshold || 0.12;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.style.filter = "blur(0px)";
          obs.unobserve(el);
        }
      },
      { threshold: t }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [t]);
  return ref;
}

/* ─── Tagline animada (palavra por palavra) ──────────────── */
function TaglineSection() {
  const wordRefs = useRef([]);
  const displayText = "Seu trabalho já existe. Agora ele precisa ser encontrado.";
  const words = displayText.split(" ");

  useEffect(() => {
    const els = wordRefs.current;
    if (!els.length) return;
    const observers = els.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.color = "#1d1d1f";
              el.style.opacity = "1";
            }, i * 65);
            obs.unobserve(el);
          }
        },
        { threshold: 0.5, rootMargin: "0px 0px -8% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <section className="pp-tagline-section">
      <div className="pp-container">
        <p className="pp-section-label" style={{ marginBottom: 24 }}>— projeto presença</p>
        <h2 className="pp-tagline-heading" aria-label={displayText}>
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => (wordRefs.current[i] = el)}
              className="pp-tagline-word"
              aria-hidden="true"
            >
              {w}{" "}
            </span>
          ))}
        </h2>
        <p className="pp-tagline-sub">
          Um site não é um luxo. É a diferença entre ser encontrado e ser ignorado.
        </p>
      </div>
    </section>
  );
}

/* ─── FAQ item accordion ─────────────────────────────────── */
function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pp-faq-item" style={{ borderTop: index === 0 ? "1px solid #e8e8ed" : "none" }}>
      <button
        className="pp-faq-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        id={"faq-btn-" + index}
        aria-controls={"faq-body-" + index}
      >
        <span className="pp-faq-q">{q}</span>
        <span className="pp-faq-icon" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
      </button>
      <div
        id={"faq-body-" + index}
        role="region"
        aria-labelledby={"faq-btn-" + index}
        className="pp-faq-body"
        style={{ maxHeight: open ? "500px" : "0", opacity: open ? 1 : 0, paddingBottom: open ? "24px" : "0" }}
      >
        <p className="pp-faq-a">{a}</p>
      </div>
    </div>
  );
}

/* ─── Spinner ────────────────────────────────────────────── */
function SpinnerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="pp-spin" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

/* ─── Form fields ────────────────────────────────────────── */
function Field({ label, name, type, value, onChange, error, required, placeholder, autoComplete }) {
  const id = "pp-field-" + name;
  return (
    <div className="pp-field-wrap">
      <label htmlFor={id} className="pp-label">
        {label}{required && <span className="pp-required" aria-label="obrigatório"> *</span>}
      </label>
      <input
        id={id} name={name} type={type} value={value} onChange={onChange}
        placeholder={placeholder} autoComplete={autoComplete}
        required={required} aria-required={required}
        aria-describedby={error ? id + "-err" : undefined} aria-invalid={!!error}
        className={"pp-input" + (error ? " pp-input-err" : "")}
      />
      {error && <span id={id + "-err"} className="pp-field-error" role="alert">{error}</span>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, error, required, options }) {
  const id = "pp-field-" + name;
  return (
    <div className="pp-field-wrap">
      <label htmlFor={id} className="pp-label">
        {label}{required && <span className="pp-required" aria-label="obrigatório"> *</span>}
      </label>
      <select
        id={id} name={name} value={value} onChange={onChange}
        required={required} aria-required={required}
        aria-invalid={!!error} aria-describedby={error ? id + "-err" : undefined}
        className={"pp-input" + (error ? " pp-input-err" : "")}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <span id={id + "-err"} className="pp-field-error" role="alert">{error}</span>}
    </div>
  );
}

function TextareaField({ label, name, value, onChange, error, required, placeholder, rows }) {
  const id = "pp-field-" + name;
  return (
    <div className="pp-field-wrap">
      <label htmlFor={id} className="pp-label">
        {label}{required && <span className="pp-required" aria-label="obrigatório"> *</span>}
      </label>
      <textarea
        id={id} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required} rows={rows || 4}
        aria-required={required} aria-invalid={!!error}
        aria-describedby={error ? id + "-err" : undefined}
        className={"pp-input pp-textarea" + (error ? " pp-input-err" : "")}
      />
      {error && <span id={id + "-err"} className="pp-field-error" role="alert">{error}</span>}
    </div>
  );
}

/* ─── Formulário de candidatura ──────────────────────────── */
const FORMSPREE_URL = "https://formspree.io/f/xbdevbne";

function CandidaturaForm() {
  const ref = useFadeUp(0.05);
  const [values, setValues] = useState({
    nome: "", whatsapp: "", instagram: "", cidade: "",
    profissão: "", tipo: "", oque: "", porque: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!values.nome.trim()) e.nome = "Informe seu nome.";
    if (!values.whatsapp.trim()) e.whatsapp = "Informe seu WhatsApp.";
    else if (!/^\+?[\d\s\(\)\-]{9,}$/.test(values.whatsapp)) e.whatsapp = "Número inválido. Use o formato (99) 99999-9999.";
    if (!values.cidade.trim()) e.cidade = "Informe sua cidade.";
    if (!values.profissão.trim()) e.profissão = "Informe sua profissão ou segmento.";
    if (!values.tipo) e.tipo = "Selecione uma opção.";
    if (!values.oque.trim()) e.oque = "Conte sobre o que você faz.";
    if (!values.porque.trim()) e.porque = "Explique por que acredita que um site ajudaria.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          nome: values.nome,
          whatsapp: values.whatsapp,
          instagram: values.instagram || "(não informado)",
          cidade: values.cidade,
          profissão: values.profissão,
          tipo_candidatura: values.tipo,
          o_que_faz: values.oque,
          por_que_um_site: values.porque,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <div className="pp-form-success" role="alert">
        <i className="ph-bold ph-check-circle" style={{ fontSize: 40, color: "#16a34a" }} />
        <h3 className="pp-form-success-title">Candidatura recebida</h3>
        <p className="pp-form-success-text">
          Obrigado. Vou analisar sua candidatura e entro em contato pelo WhatsApp informado.
          A seleção é feita de forma pessoal e você receberá uma resposta, seja qual for o resultado.
        </p>
      </div>
    );
  }

  return (
    <form ref={ref} onSubmit={handleSubmit} noValidate className="pp-form" aria-label="Formulario de candidatura ao Projeto Presença">
      <div className="pp-form-grid-2">
        <Field label="Nome completo" name="nome" type="text" value={values.nome} onChange={handleChange} error={errors.nome} required autoComplete="name" />
        <Field label="WhatsApp" name="whatsapp" type="tel" value={values.whatsapp} onChange={handleChange} error={errors.whatsapp} required placeholder="(99) 99999-9999" autoComplete="tel" />
      </div>
      <div className="pp-form-grid-2">
        <Field label="Instagram (opcional)" name="instagram" type="text" value={values.instagram} onChange={handleChange} placeholder="@seuusuario" />
        <Field label="Cidade" name="cidade" type="text" value={values.cidade} onChange={handleChange} error={errors.cidade} required autoComplete="address-level2" />
      </div>
      <Field label="Profissão ou segmento" name="profissão" type="text" value={values.profissão} onChange={handleChange} error={errors.profissão} required placeholder="Ex.: fotógrafa, designer de interiores, nutricionista..." />
      <SelectField
        label="Você esta se candidatando ou indicando alguém?"
        name="tipo" value={values.tipo} onChange={handleChange} error={errors.tipo} required
        options={[
          { value: "", label: "Selecione..." },
          { value: "candidatura", label: "Estou me candidatando" },
          { value: "indicação", label: "Estou indicando outra pessoa" },
        ]}
      />
      <TextareaField label="O que você faz?" name="oque" value={values.oque} onChange={handleChange} error={errors.oque} required placeholder="Descreva seu trabalho, seu publico e como você atende hoje..." rows={4} />
      <TextareaField label="Por que acredita que um site ajudaria seu negocio?" name="porque" value={values.porque} onChange={handleChange} error={errors.porque} required placeholder="Pode ser honesto. Não ha resposta certa ou errada." rows={4} />
      {status === "error" && (
        <p className="pp-form-err-msg" role="alert">
          Não foi possivel enviar sua candidatura. Verifique sua conexão e tente novamente.
        </p>
      )}
      <button type="submit" className="pp-cta-btn" disabled={status === "loading"} aria-busy={status === "loading"} style={{ opacity: status === "loading" ? 0.7 : 1 }}>
        {status === "loading" ? (<span style={{ display: "flex", alignItems: "center", gap: 8 }}><SpinnerIcon />Enviando...</span>) : "Quero participar da seleção"}
      </button>
      <p className="pp-form-note">
        Suas informações são usadas apenas para o processo de seleção e não serão compartilhadas.
      </p>
    </form>
  );
}

/* ─── Nav ────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 48); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className={"pp-nav" + (scrolled ? " pp-nav-scrolled" : "")} aria-label="Navegacao principal">
        <a href="#pp-hero" className="pp-nav-logo" onClick={(e) => { e.preventDefault(); scrollTo("pp-hero"); }}>
          <img src="assets/images/logo_projeto_presenca.png" alt="Projeto Presença" className="pp-nav-logo-img"></img>
        </a>
        <div className="pp-nav-right">
          <button className="pp-nav-link" onClick={() => scrollTo("pp-como-funciona")}>Como funciona</button>
          <button className="pp-nav-link" onClick={() => scrollTo("pp-faq")}>Dúvidas</button>
          <button className="pp-cta-btn pp-cta-sm" onClick={() => scrollTo("pp-formulario")}>Quero participar</button>
        </div>
        <button className="pp-hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="pp-mobile-menu">
          <span className="pp-hline" style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 6px)" : "none" }} />
          <span className="pp-hline" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="pp-hline" style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -6px)" : "none" }} />
        </button>
      </nav>
      <div id="pp-mobile-menu" role="dialog" aria-modal="true" aria-label="Menu de navegacao" className={"pp-mobile-overlay" + (menuOpen ? " pp-mobile-open" : "")}>
        <div className="pp-mobile-links">
          {[
            { id: "pp-hero", label: "Início" },
            { id: "pp-dores", label: "Para quem e" },
            { id: "pp-como-funciona", label: "Como funciona" },
            { id: "pp-incluido", label: "O que esta incluído" },
            { id: "pp-faq", label: "Dúvidas" },
            { id: "pp-formulario", label: "Candidatura" },
          ].map(({ id, label }, i) => (
            <button key={id} onClick={() => scrollTo(id)} className="pp-mobile-link" style={{ transitionDelay: menuOpen ? i * 55 + "ms" : "0ms", transform: menuOpen ? "translateY(0)" : "translateY(24px)", opacity: menuOpen ? 1 : 0 }}>{label}</button>
          ))}
          <button onClick={() => scrollTo("pp-formulario")} className="pp-cta-btn" style={{ transitionDelay: menuOpen ? "330ms" : "0ms", transform: menuOpen ? "translateY(0)" : "translateY(24px)", opacity: menuOpen ? 1 : 0, marginTop: 16, width: "100%" }}>
            Quero participar da seleção
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section id="pp-hero" className="pp-hero" aria-labelledby="pp-hero-h1">
      <div className="pp-hero-inner">
        <div className="pp-hero-content">
          <span className="pp-hero-badge">Primeira edição · 2 vagas</span>
          <h1 id="pp-hero-h1" className="pp-hero-h1">
            Presença digital para quem já tem o trabalho,{" "}
            <span className="pp-hero-accent">mas ainda não tem o site</span>
          </h1>
          <p className="pp-hero-sub">
            Duas vagas para profissionais autônomos e pequenos negócios construírem um site
            institucional completo sem custo de desenvolvimento. Você paga apenas o registro do
            domínio, que fica no seu nome.
          </p>
          <a href="#pp-formulario" className="pp-cta-btn" id="pp-hero-cta" onClick={(e) => { e.preventDefault(); document.getElementById("pp-formulario")?.scrollIntoView({ behavior: "smooth" }); }}>
            Quero participar da seleção
          </a>
          <p className="pp-hero-note">Candidatura gratuíta · Seleção pessoal · Você recebe uma resposta</p>
        </div>
        <div className="pp-hero-visual" aria-hidden="true">
          <div className="pp-browser">
            <div className="pp-browser-bar">
              <span className="pp-dot" style={{ background: "#FF5F57" }} />
              <span className="pp-dot" style={{ background: "#FEBC2E" }} />
              <span className="pp-dot" style={{ background: "#28C840" }} />
              <div className="pp-url-bar">
                <i className="ph ph-lock-simple" style={{ fontSize: 11, color: "#86868b" }} />
                <span className="pp-url-text">seunome.com.br</span>
              </div>
            </div>
            <div className="pp-browser-content">
              <div className="pp-wf-nav">
                <div style={{ width: 48, height: 8, background: "#8234E9", borderRadius: 4 }} />
                <div style={{ display: "flex", gap: 8 }}>
                  {[36, 28, 24].map((w, i) => <div key={i} style={{ width: w, height: 6, background: "#d2d2d7", borderRadius: 3 }} />)}
                </div>
              </div>
              <div className="pp-wf-hero-area">
                <div style={{ width: "70%", height: 12, background: "#1d1d1f", borderRadius: 6, marginBottom: 8 }} />
                <div style={{ width: "52%", height: 8, background: "#d2d2d7", borderRadius: 4, marginBottom: 16 }} />
                <div style={{ width: 80, height: 26, background: "#8234E9", borderRadius: 6 }} />
              </div>
              <div className="pp-wf-cards">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="pp-wf-card">
                    <div style={{ width: 20, height: 20, background: "#8234E9", borderRadius: 4, marginBottom: 8, opacity: 0.15 }} />
                    <div style={{ width: "80%", height: 7, background: "#1d1d1f", borderRadius: 3, marginBottom: 6 }} />
                    <div style={{ width: "100%", height: 5, background: "#d2d2d7", borderRadius: 3, marginBottom: 4 }} />
                    <div style={{ width: "85%", height: 5, background: "#d2d2d7", borderRadius: 3 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pp-float-card" style={{ top: 12, right: -20 }}>
            <i className="ph-bold ph-check-circle" style={{ color: "#16a34a", fontSize: 16 }} />
            <span className="pp-float-text">SEO configurado</span>
          </div>
          <div className="pp-float-card" style={{ bottom: 48, left: -16 }}>
            <i className="ph-bold ph-whatsapp-logo" style={{ color: "#25d366", fontSize: 16 }} />
            <span className="pp-float-text">WhatsApp integrado</span>
          </div>
          <div className="pp-float-card" style={{ bottom: -12, right: 20 }}>
            <i className="ph-bold ph-calendar-check" style={{ color: "#8234E9", fontSize: 16 }} />
            <span className="pp-float-text">Pronto em 30 dias</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Dores ──────────────────────────────────────────────── */
const DORES = [
  { icon: "ph-magnifying-glass-minus", title: "Invisível no Google", desc: "Instagram e WhatsApp não aparecem quando alguém pesquisa pelo seu servico. Você depende de indicação e indicação tem limite." },
  { icon: "ph-instagram-logo", title: "Tudo em uma rede social", desc: "Algoritmo muda, alcance cai, conta pode ser bloqueada. Seu negócio não pode depender de uma plataforma que você não controla." },
  { icon: "ph-handshake", title: "Credibilidade em dúvida", desc: "Sem site, o cliente busca você no Google e não encontra nada. A concorrência tem presença. Você perde a venda antes mesmo de falar." },
  { icon: "ph-chat-dots", title: "Oportunidades que escapam", desc: "Clientes chegam por indicação, buscam mais sobre você antes de entrar em contato e não encontram nada. A dúvida vira desistência." },
];

function DoresSection() {
  const ref = useFadeUp();
  return (
    <section id="pp-dores" className="pp-section" ref={ref} aria-labelledby="pp-dores-h2">
      <div className="pp-container">
        <div className="pp-section-header">
          <span className="pp-section-label">para quem é</span>
          <h2 id="pp-dores-h2" className="pp-h2">Reconhece alguma dessas situações?</h2>
          <p className="pp-section-desc">O Projeto Presença existe para profissionais que já tem um bom trabalho mas ainda não tem uma porta de entrada digital a altura.</p>
        </div>
        <div className="pp-dores-grid">
          {DORES.map((d, i) => <DoreCard key={i} {...d} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function DoreCard({ icon, title, desc, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, index * 80); obs.unobserve(el); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);
  return (
    <div ref={ref} className="pp-dore-card">
      <div className="pp-dore-icon-wrap"><i className={"ph-bold " + icon} style={{ fontSize: 22, color: "#8234E9" }} /></div>
      <h3 className="pp-dore-title">{title}</h3>
      <p className="pp-dore-desc">{desc}</p>
    </div>
  );
}

/* ─── Beneficios ─────────────────────────────────────────── */
const BENEFICIOS = [
  { icon: "ph-desktop", title: "Site responsivo em até 30 dias", desc: "Cinco páginas com estrutura profissional, design limpo e carregamento rápido. Funciona bem no celular, tablet e computador." },
  { icon: "ph-magnifying-glass", title: "Encontrável no Google desde o início", desc: "SEO técnico configurado, estrutura semântica e integração com o Google Business Profile para começar a criar histórico de buscas." },
  { icon: "ph-whatsapp-logo", title: "WhatsApp integrado ao site", desc: "De quem te encontra no Google até a conversa que fecha negócio. O contato acontece de forma natural, sem atrito." },
  { icon: "ph-article", title: "Três meses de acompanhamento", desc: "Publicação de até 2 artigos mensais no blog e 1 post no Google Business por mês, desde que você forneça o conteúdo." },
  { icon: "ph-globe", title: "Domínio registrado no seu nome", desc: "O domínio é seu. O site é seu. A hospedagem fica disponível por 1 ano. Você fica com tudo o que foi construído." },
];

function BeneficiosSection() {
  const ref = useFadeUp();
  return (
    <section id="pp-beneficios" className="pp-section pp-section-white" ref={ref} aria-labelledby="pp-beneficios-h2">
      <div className="pp-container">
        <div className="pp-section-header">
          <span className="pp-section-label">o que você recebe</span>
          <h2 id="pp-beneficios-h2" className="pp-h2">Cinco entregas que constroem presença real</h2>
        </div>
        <div className="pp-beneficios-grid">
          {BENEFICIOS.map((b, i) => <BeneficioCard key={i} {...b} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function BeneficioCard({ icon, title, desc, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, index * 60); obs.unobserve(el); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);
  return (
    <div ref={ref} className="pp-beneficio-card">
      <div className="pp-beneficio-icon"><i className={"ph-bold " + icon} style={{ fontSize: 20, color: "#8234E9" }} /></div>
      <div>
        <h3 className="pp-beneficio-title">{title}</h3>
        <p className="pp-beneficio-desc">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Como funciona ──────────────────────────────────────── */
const PASSOS = [
  { n: "01", title: "Você se candidata ou é indicado", desc: "Preencha o formulário contando sobre seu trabalho e por que acredita que um site faria diferença. Indicações também são bem-vindas." },
  { n: "02", title: "Eu faço a seleção", desc: "Analiso cada candidatura de forma pessoal. Seleciono dois projetos com base no potencial, no encaixe e na diversidade de segmentos. Todos recebem retorno." },
  { n: "03", title: "Desenvolvemos o site juntos", desc: "Briefing, definição de estrutura, design, desenvolvimento e publicação. Você acompanha as etapas e aprova antes do site ir ao ar. Prazo: até 30 dias." },
];

function ComoFuncionaSection() {
  const ref = useFadeUp();
  return (
    <section id="pp-como-funciona" className="pp-section" ref={ref} aria-labelledby="pp-como-funciona-h2">
      <div className="pp-container">
        <div className="pp-section-header">
          <span className="pp-section-label">o processo</span>
          <h2 id="pp-como-funciona-h2" className="pp-h2">Como funciona em três passos</h2>
        </div>
        <div className="pp-passos-wrap">
          {PASSOS.map((p, i) => <PassoItem key={i} {...p} index={i} isLast={i === PASSOS.length - 1} />)}
        </div>
      </div>
    </section>
  );
}

function PassoItem({ n, title, desc, index, isLast }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, index * 100); obs.unobserve(el); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);
  return (
    <div ref={ref} className="pp-passo-item">
      <div className="pp-passo-left">
        <div className="pp-passo-num">{n}</div>
        {!isLast && <div className="pp-passo-line" />}
      </div>
      <div className="pp-passo-right">
        <h3 className="pp-passo-title">{title}</h3>
        <p className="pp-passo-desc">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Incluído / Não incluído ────────────────────────────── */
const INCLUIDO = [
  "Site institucional responsivo (até 5 páginas)",
  "Configuração inicial de SEO",
  "Integração com WhatsApp",
  "Estrutura básica de blog",
  "Hospedagem disponibilizada por 1 ano",
  "Até 2 rodadas de revisão",
  "3 meses: publicação de até 2 artigos mensais no blog",
  "1 publicação mensal no Google Business (com texto seu)",
  "Domínio registrado no seu nome",
];
const NAO_INCLUIDO = [
  "Redação dos textos do site e do blog (você fornece o conteúdo)",
  "Design de identidade visual ou logotipo",
  "Fotografia ou produção de imagens",
  "Integrações com ferramentas pagas de terceiros",
  "Desenvolvimento de e-commerce ou área de membros",
  "Manutenção técnica após o período de acompanhamento",
  "Gestão de redes sociais",
];

function IncluidoSection() {
  const ref = useFadeUp();
  return (
    <section id="pp-incluido" className="pp-section pp-section-white" ref={ref} aria-labelledby="pp-incluido-h2">
      <div className="pp-container">
        <div className="pp-section-header">
          <span className="pp-section-label">transparência</span>
          <h2 id="pp-incluido-h2" className="pp-h2">O que está dentro e o que não está</h2>
          <p className="pp-section-desc">Sem surpresas. Abaixo está tudo que está incluso no projeto e tudo que não está, para que você tome uma decisão informada.</p>
        </div>
        <div className="pp-incluido-grid">
          <div className="pp-incluido-col pp-incluido-yes">
            <div className="pp-incluido-header pp-incluido-header-yes">
              <i className="ph-bold ph-check-circle" style={{ fontSize: 20, color: "#16a34a" }} />
              <span className="pp-incluido-header-text" style={{ color: "#16a34a" }}>Incluso</span>
            </div>
            <ul className="pp-incluido-list" aria-label="O que está incluso">
              {INCLUIDO.map((item, i) => (
                <li key={i} className="pp-incluido-item">
                  <i className="ph-bold ph-check" style={{ fontSize: 14, color: "#16a34a", flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pp-incluido-col pp-incluido-no">
            <div className="pp-incluido-header pp-incluido-header-no">
              <i className="ph-bold ph-x-circle" style={{ fontSize: 20, color: "#86868b" }} />
              <span className="pp-incluido-header-text" style={{ color: "#86868b" }}>Não incluso</span>
            </div>
            <ul className="pp-incluido-list" aria-label="O que não esta incluso">
              {NAO_INCLUIDO.map((item, i) => (
                <li key={i} className="pp-incluido-item pp-nao-incluido-item">
                  <i className="ph-bold ph-minus" style={{ fontSize: 14, color: "#d2d2d7", flexShrink: 0, marginTop: 2 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Prova social ───────────────────────────────────────── */
function ProvaSocialSection() {
  const ref = useFadeUp();
  return (
    <section className="pp-section" ref={ref} aria-labelledby="pp-prova-h2">
      <div className="pp-container">
        <div className="pp-section-header">
          <span className="pp-section-label">cases</span>
          <h2 id="pp-prova-h2" className="pp-h2">Os resultados virão aqui</h2>
          <p className="pp-section-desc">Esta é a primeira edição do Projeto Presença. Os sites estão sendo desenvolvidos agora. A medida que os projetos forem concluídos, os cases serão publicados nesta página com os resultados reais, sem edição.</p>
        </div>
        <div className="pp-prova-placeholder">
          <div className="pp-prova-inner">
            <i className="ph-bold ph-hourglass" style={{ fontSize: 36, color: "#d2d2d7" }} />
            <p className="pp-prova-text">Espaço reservado para os primeiros cases do projeto.</p>
            <p className="pp-prova-sub">
              Você pode acompanhar o andamento pelo Instagram{" "}
              <a href="https://instagram.com/robson.svicero" target="_blank" rel="noopener noreferrer" className="pp-link">@robson.svicero</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Objeções ───────────────────────────────────────────── */
const OBJECOES = [
  { q: "É realmente sem custo de desenvolvimento?", a: "Sim. O desenvolvimento do site, o design e o acompanhamento por 3 meses não tem custo para os participantes selecionados. Você paga apenas o registro do domínio (em media R$ 40,00), que fica registrado no seu nome. Se quiser ferramentas ou integrações pagas de terceiros, essas ficam por conta sua." },
  { q: "Por que só 2 vagas?", a: "Porque cada projeto recebe atenção individual. Não é um template que você preenche. É um processo de briefing, decisão editorial e desenvolvimento personalizado e isso leva tempo. Prefiro entregar dois projetos bem feitos do que dez medíocres." },
  { q: "Preciso conhecer você pessoalmente?", a: "Não. Todo o processo acontece online, via videochamada e WhatsApp. Não importa a cidade." },
  { q: "O que acontece depois dos 3 meses de acompanhamento?", a: "O site continua seu, hospedado por 1 ano. Após o periodo de acompanhamento, a publicação de artigos e posts no Google Business não está incluída, mas você pode continuar publicando por conta própria, já que a estrutura estará toda configurada." },
  { q: "Quem escreve os textos do blog e do site?", a: "Você fornece o conteúdo em texto corrido. Eu faço a formatação, a revisão estrutural e a publicação. Os textos das páginas do site também são construídos em conjunto." },
];

function ObjSection() {
  const ref = useFadeUp();
  return (
    <section id="pp-objecoes" className="pp-section pp-section-white" ref={ref} aria-labelledby="pp-obj-h2">
      <div className="pp-container">
        <div className="pp-section-header">
          <span className="pp-section-label">dúvidas comuns</span>
          <h2 id="pp-obj-h2" className="pp-h2">Respondendo antes que você precise perguntar</h2>
        </div>
        <div className="pp-obj-grid">
          {OBJECOES.map((o, i) => <ObjCard key={i} {...o} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function ObjCard({ q, a, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, index * 60); obs.unobserve(el); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);
  return (
    <div ref={ref} className="pp-obj-card">
      <h3 className="pp-obj-q">{q}</h3>
      <p className="pp-obj-a">{a}</p>
    </div>
  );
}

/* ─── FAQ ────────────────────────────────────────────────── */
const FAQ = [
  { q: "Meu segmento se encaixa no projeto?", a: "O projeto é voltado para profissionais autônomos e pequenos negócios que trabalham principalmente pelo Instagram e WhatsApp e ainda não tem um site profissional. Arquitetos, designers, fotógrafos, consultores, profissionais da saúde, educadores, prestadores de serviço em geral." },
  { q: "Posso indicar outra pessoa?", a: "Sim. Você pode indicar um profissional que acredita que se beneficiaria do projeto. No formulário, há um campo específico para indicações. O processo de seleção é o mesmo para candidatos e indicados." },
  { q: "Como funciona o processo de seleção?", a: "Leio todas as candidaturas de forma pessoal. Seleciono com base no potencial do projeto, no encaixe com o perfil buscado e na diversidade de segmentos. Não há critério técnico. Todos os candidatos recebem uma resposta." },
  { q: "Em quanto tempo recebo uma resposta?", a: "Não há prazo fixo, pois a seleção é feita manualmente. O objetivo é responder a todas as candidaturas dentro de 2 semanas após o encerramento das inscrições." },
  { q: "Posso pedir mudanças depois que o site ficar pronto?", a: "Sim. O projeto inclui até 2 rodadas de revisão. Após a aprovação final e a publicação, ajustes adicionais não estão inclusos, mas podem ser combinados separadamente." },
  { q: "O domínio .com.br está incluído?", a: "O custo do domínio não está incluído. Em média, um domínio .com.br custa R$ 40,00 por ano e é registrado diretamente no seu nome. Você continua sendo o proprietário mesmo após o encerramento do projeto." },
  { q: "O site fica comigo depois do projeto?", a: "Sim. O site, o domínio e a hospedagem (por 1 ano) ficam com você. Não há dependência técnica ou de contrato após o término do projeto." },
  { q: "Quem desenvolve o site?", a: "Robson Svicero, designer e desenvolvedor web com experiência em sites para profissionais autônomos e pequenos negócios. O Projeto Presença é uma iniciativa pessoal, não uma agência." },
];

function FaqSection() {
  const ref = useFadeUp();
  return (
    <section id="pp-faq" className="pp-section" ref={ref} aria-labelledby="pp-faq-h2">
      <div className="pp-container">
        <div className="pp-section-header">
          <span className="pp-section-label">FAQ</span>
          <h2 id="pp-faq-h2" className="pp-h2">Perguntas frequentes</h2>
        </div>
        <div className="pp-faq-wrap">
          {FAQ.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── Formulario section ─────────────────────────────────── */
function FormSection() {
  const ref = useFadeUp();
  return (
    <section id="pp-formulario" className="pp-section pp-section-white" ref={ref} aria-labelledby="pp-form-h2">
      <div className="pp-container">
        <div className="pp-section-header">
          <span className="pp-section-label">candidatura</span>
          <h2 id="pp-form-h2" className="pp-h2">Quero participar da seleção</h2>
          <p className="pp-section-desc">Preencha o formulario abaixo. Leva menos de 5 minutos. Todos os campos marcados com <span style={{ color: "#dc2626" }}>*</span> sao obrigatórios.</p>
        </div>
        <div className="pp-form-wrap"><CandidaturaForm /></div>
      </div>
    </section>
  );
}

/* ─── CTA Final ──────────────────────────────────────────── */
function CtaFinal() {
  const ref = useFadeUp(0.1);
  return (
    <section className="pp-cta-final" ref={ref} aria-labelledby="pp-cta-final-h2">
      <div className="pp-container pp-cta-final-inner">
        <h2 id="pp-cta-final-h2" className="pp-cta-final-h2">Seu negócio merece uma porta de entrada à altura do seu trabalho.</h2>
        <p className="pp-cta-final-sub">Duas vagas. Sem custo de desenvolvimento. Com acompanhamento real.</p>
        <a href="#pp-formulario" className="pp-cta-btn pp-cta-light" id="pp-cta-final-btn" onClick={(e) => { e.preventDefault(); document.getElementById("pp-formulario")?.scrollIntoView({ behavior: "smooth" }); }}>
          Quero participar da seleção
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="pp-footer" role="contentinfo">
      <div className="pp-container">
        <div className="pp-footer-top">
          <div className="pp-footer-brand">
            <span className="pp-footer-logo">Projeto Presença</span>
            <p className="pp-footer-tagline">Uma iniciativa de Robson Svicero</p>
            <p className="pp-footer-desc">Designer e desenvolvedor web. O Projeto Presença é uma iniciativa pessoal para ajudar profissionais autônomos a construírem presença digital de forma profissional.</p>
          </div>
          <div className="pp-footer-col">
            <span className="pp-footer-col-title">Contato</span>
            <a href="https://wa.me/5511964932007" target="_blank" rel="noopener noreferrer" className="pp-footer-link">
              <i className="ph-bold ph-whatsapp-logo" style={{ fontSize: 14 }} />WhatsApp
            </a>
            <a href="https://instagram.com/robson.svicero" target="_blank" rel="noopener noreferrer" className="pp-footer-link">
              <i className="ph-bold ph-instagram-logo" style={{ fontSize: 14 }} />@robson.svicero
            </a>
            <a href="mailto:ola@robsonsvicero.com.br" className="pp-footer-link">
              <i className="ph-bold ph-envelope" style={{ fontSize: 14 }} />ola@robsonsvicero.com.br
            </a>
          </div>
          <div className="pp-footer-col">
            <span className="pp-footer-col-title">Transparência</span>
            <p className="pp-footer-transparency">A seleção é feita de forma pessoal por Robson Svicero. Não há garantia de participação apenas pelo preenchimento do formulário. Todos os candidatos recebem retorno.</p>
          </div>
        </div>
        <div className="pp-footer-bottom">
          <p className="pp-footer-copy">2026 Projeto Presença, Robson Svicero</p>
          <div className="pp-footer-legal">
            <a href="/privacidade" className="pp-footer-legal-link">Política de privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Export principal ───────────────────────────────────── */
export default function ProjetoPresenca() {
  return (
    <>
      <InjectFonts />
      <InjectPhosphor />
      <a href="#pp-main" className="pp-skip-link">Pular para o conteúdo principal</a>
      <Nav />
      <main id="pp-main">
        <HeroSection />
        <TaglineSection />
        <DoresSection />
        <BeneficiosSection />
        <ComoFuncionaSection />
        <IncluidoSection />
        <ProvaSocialSection />
        <ObjSection />
        <FaqSection />
        <FormSection />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
