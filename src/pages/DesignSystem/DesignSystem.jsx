import Layout from "../../components/layout/Layout/Layout.jsx";
import SEO from "../../components/seo/SEO.jsx";
import Button, { TrajectoryArrow } from "../../components/ui/Button/Button.jsx";

const brandColors = [
  { name: "Deep Accent", token: "--accent-700", hex: "#1D3095", desc: "Hero gradient e hover interativo profundo." },
  { name: "Primary Accent", token: "--accent-600", hex: "#0052CC", desc: "Ações primárias, links e realces." },
  { name: "Pale Accent Surface", token: "--accent-50", hex: "#EAF1FB", desc: "Fundo suave da seção de serviços.", light: true },
  { name: "Soft Accent", token: "--accent-300", hex: "#8FB2EC", desc: "Órbitas estelares e realce sobre superfícies escuras.", light: true },
];

const surfaceColors = [
  { name: "Primary Dark Surface", token: "--navy-900", hex: "#071A45", desc: "Hero, depoimentos, call-to-action e footer." },
  { name: "Dark Secondary", token: "--navy-800", hex: "#0A2160", desc: "Profundidade e contraste para superfícies escuras." },
  { name: "Light Surface Base", token: "--light-50", hex: "#F7F9FC", desc: "Fundo base limpo de páginas e seções claras.", light: true },
  { name: "Card White Elevated", token: "--white", hex: "#FFFFFF", desc: "Cards elevados, botões de ação e caixas.", light: true },
];

const textColors = [
  { name: "Primary Text (Ink 900)", token: "--ink-900", hex: "#0D1521", desc: "Títulos principais sobre fundo claro.", light: true },
  { name: "Body Text (Ink 700)", token: "--ink-700", hex: "#3B444F", desc: "Parágrafos e leitura em superfícies claras.", light: true },
  { name: "Muted Text (Ink 500)", token: "--ink-500", hex: "#6C737D", desc: "Metadados, legendas e apoios secundários.", light: true },
  { name: "Inverse Pure Text", token: "--white", hex: "#FFFFFF", desc: "Tipografia de alta legibilidade em seções escuras." },
];

const borderColors = [
  { name: "Light Card Border", token: "--card-hairline-on-light", hex: "rgba(29, 48, 149, 0.10)", desc: "Borda hairline para cards em fundos claros.", light: true },
  { name: "Dark Card Border", token: "--card-hairline-on-dark", hex: "rgba(255, 255, 255, 0.16)", desc: "Borda translúcida para cards sobre superfícies escuras." },
  { name: "Outline Border", token: "--light-200", hex: "#E2E9F2", desc: "Limites de componentes e botões outline.", light: true },
];

export default function DesignSystem() {
  return (
    <>
      <SEO
        title="Trajectory Design System | Robson Svicero"
        description="Sistema de design completo baseado no Trajectory: tipografia Tosh A, paleta Navy/Royal Accent, botões com chevron e superfícies responsivas."
        path="/design-system"
        robots="noindex, follow"
      />
      <Layout>
        <section className="section_services" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="container">
            {/* Header intro */}
            <div className="services_header" style={{ marginBottom: "4rem" }}>
              <span className="eyebrow">Design System Oficial</span>
              <h1 className="services_heading">
                Trajectory <em>Design System</em>
              </h1>
              <p className="services_lede">
                Guia visual e arquitetura de componentes do projeto. Tipografia autoral <strong>Tosh A</strong>,
                paleta profunda <strong>Navy 900 + Royal Accent 600</strong>, sistema de botões com seta direcional,
                superfícies limpas e o grid 3D em perspectiva.
              </p>
            </div>

            {/* ─── CORES & TOKENS ─── */}
            <div style={{ marginBottom: "5rem" }}>
              <h2 className="services_heading" style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
                1. Cores e Tokens
              </h2>

              <h3 style={{ fontSize: "1.2rem", margin: "2rem 0 1rem", color: "var(--dark-900)" }}>Brand & Accent</h3>
              <div className="services_grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                {brandColors.map((c) => (
                  <div key={c.token} className="services_card" style={{ padding: "1.5rem" }}>
                    <div
                      style={{
                        height: "5rem",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: `var(${c.token})`,
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "0.75rem",
                        color: c.light ? "var(--ink-900)" : "#ffffff",
                        fontWeight: 600,
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      {c.hex}
                    </div>
                    <strong style={{ fontSize: "1.05rem", color: "var(--dark-900)" }}>{c.name}</strong>
                    <code style={{ fontSize: "0.8rem", color: "var(--accent-600)", display: "block", margin: "0.25rem 0" }}>
                      {c.token}
                    </code>
                    <p style={{ fontSize: "0.85rem", color: "var(--ink-700)", margin: 0 }}>{c.desc}</p>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "1.2rem", margin: "2.5rem 0 1rem", color: "var(--dark-900)" }}>Superfícies & Fundos</h3>
              <div className="services_grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                {surfaceColors.map((c) => (
                  <div key={c.token} className="services_card" style={{ padding: "1.5rem" }}>
                    <div
                      style={{
                        height: "5rem",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: `var(${c.token})`,
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "0.75rem",
                        color: c.light ? "var(--ink-900)" : "#ffffff",
                        fontWeight: 600,
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      {c.hex}
                    </div>
                    <strong style={{ fontSize: "1.05rem", color: "var(--dark-900)" }}>{c.name}</strong>
                    <code style={{ fontSize: "0.8rem", color: "var(--accent-600)", display: "block", margin: "0.25rem 0" }}>
                      {c.token}
                    </code>
                    <p style={{ fontSize: "0.85rem", color: "var(--ink-700)", margin: 0 }}>{c.desc}</p>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "1.2rem", margin: "2.5rem 0 1rem", color: "var(--dark-900)" }}>Tipografia & Inks</h3>
              <div className="services_grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                {textColors.map((c) => (
                  <div key={c.token} className="services_card" style={{ padding: "1.5rem" }}>
                    <div
                      style={{
                        height: "5rem",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: `var(${c.token})`,
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "0.75rem",
                        color: c.light ? "#ffffff" : "#ffffff",
                        fontWeight: 600,
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      {c.hex}
                    </div>
                    <strong style={{ fontSize: "1.05rem", color: "var(--dark-900)" }}>{c.name}</strong>
                    <code style={{ fontSize: "0.8rem", color: "var(--accent-600)", display: "block", margin: "0.25rem 0" }}>
                      {c.token}
                    </code>
                    <p style={{ fontSize: "0.85rem", color: "var(--ink-700)", margin: 0 }}>{c.desc}</p>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "1.2rem", margin: "2.5rem 0 1rem", color: "var(--dark-900)" }}>Bordas & Hairlines</h3>
              <div className="services_grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                {borderColors.map((c) => (
                  <div key={c.token} className="services_card" style={{ padding: "1.5rem" }}>
                    <div
                      style={{
                        height: "5rem",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: "#ffffff",
                        border: `2px solid var(${c.token})`,
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "0.75rem",
                        color: "var(--ink-900)",
                        fontWeight: 600,
                      }}
                    >
                      Borda de Exemplo
                    </div>
                    <strong style={{ fontSize: "1.05rem", color: "var(--dark-900)" }}>{c.name}</strong>
                    <code style={{ fontSize: "0.8rem", color: "var(--accent-600)", display: "block", margin: "0.25rem 0" }}>
                      {c.token}
                    </code>
                    <p style={{ fontSize: "0.85rem", color: "var(--ink-700)", margin: 0 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── TIPOGRAFIA ─── */}
            <div style={{ marginBottom: "5rem" }}>
              <h2 className="services_heading" style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
                2. Escala Tipográfica (Tosh A)
              </h2>

              <div className="services_card" style={{ gap: "2rem" }}>
                <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.5rem" }}>
                  <span className="eyebrow">Heading 1 · Tosh A 500 / 700</span>
                  <h1 style={{ fontSize: "var(--text-h1)", margin: "0.75rem 0" }}>
                    Experiências Digitais <em>Excepcionais</em>
                  </h1>
                  <code style={{ color: "var(--accent-600)", fontSize: "0.85rem" }}>
                    font-size: clamp(2.75rem, 7vw, 5.75rem) / var(--text-h1): 3.75rem
                  </code>
                </div>

                <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.5rem" }}>
                  <span className="eyebrow">Heading 2 · Tosh A 700</span>
                  <h2 style={{ fontSize: "var(--text-h2)", margin: "0.75rem 0" }}>
                    Estratégia, Design e <em>Tecnologia</em>
                  </h2>
                  <code style={{ color: "var(--accent-600)", fontSize: "0.85rem" }}>
                    font-size: var(--text-h2) · 3.0rem
                  </code>
                </div>

                <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.5rem" }}>
                  <span className="eyebrow">Heading 3 · Tosh A 600</span>
                  <h3 style={{ fontSize: "var(--text-h3)", margin: "0.75rem 0" }}>
                    Criação de Sites de Alta Conversão
                  </h3>
                  <code style={{ color: "var(--accent-600)", fontSize: "0.85rem" }}>
                    font-size: var(--text-h3) · 1.5rem
                  </code>
                </div>

                <div style={{ borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.5rem" }}>
                  <span className="eyebrow">Body & Lead · Tosh A 400</span>
                  <p className="lead" style={{ margin: "0.75rem 0" }}>
                    Desenvolvimento focado em clareza, velocidade máxima, SEO estruturado e atendimento direto com o especialista.
                  </p>
                  <code style={{ color: "var(--accent-600)", fontSize: "0.85rem" }}>
                    font-size: var(--text-body-lg) · 1.15rem / line-height: 1.6
                  </code>
                </div>

                <div>
                  <span className="eyebrow">Section Label / Eyebrow</span>
                  <p style={{ margin: "0.75rem 0" }}>
                    <span className="eyebrow">Identidade Visual & UI</span>
                  </p>
                  <code style={{ color: "var(--accent-600)", fontSize: "0.85rem" }}>
                    font-size: 12px · uppercase · letter-spacing: 0.18em · ::before dash
                  </code>
                </div>
              </div>
            </div>

            {/* ─── BOTÕES & AÇÕES ─── */}
            <div style={{ marginBottom: "5rem" }}>
              <h2 className="services_heading" style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
                3. Botões e Ações (Componente Universal &lt;Button /&gt;)
              </h2>
              <div
                className="services_card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2.5rem",
                  padding: "2.5rem",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--ink-900)" }}>Variantes de Estilo</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem" }}>
                    <div>
                      <Button variant="primary" href="#ds">
                        Primary (#0052CC)
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>variant="primary"</small>
                    </div>

                    <div>
                      <Button variant="outline" href="#ds">
                        Outline Hairline
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>variant="outline"</small>
                    </div>

                    <div>
                      <Button variant="dark" href="#ds">
                        Navy Dark
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>variant="dark"</small>
                    </div>

                    <div>
                      <Button variant="ghost" href="#ds">
                        Ghost Action
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>variant="ghost"</small>
                    </div>

                    <div>
                      <Button variant="whatsapp" href="#ds">
                        WhatsApp Oficial
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>variant="whatsapp"</small>
                    </div>

                    <div>
                      <Button variant="telegram" href="#ds">
                        Telegram Oficial
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>variant="telegram"</small>
                    </div>

                    <div>
                      <Button variant="shiny" href="#ds">
                        Shiny AuraGen
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>variant="shiny"</small>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--navy-900)",
                    padding: "1.5rem",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#ffffff" }}>Sobre Superfícies Escuras</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem" }}>
                    <div>
                      <Button variant="white" href="#ds">
                        White CTA
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "rgba(255,255,255,0.7)" }}>variant="white"</small>
                    </div>

                    <div>
                      <Button variant="outline-light" href="#ds">
                        Outline Light
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "rgba(255,255,255,0.7)" }}>variant="outline-light"</small>
                    </div>

                    <div>
                      <Button variant="secondary" href="#ds">
                        Secondary Glass
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "rgba(255,255,255,0.7)" }}>variant="secondary"</small>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--ink-900)" }}>Tamanhos &amp; Estados</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem" }}>
                    <div>
                      <Button variant="primary" size="sm" href="#ds">
                        Small (36px)
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>size="sm"</small>
                    </div>

                    <div>
                      <Button variant="primary" size="md" href="#ds">
                        Medium (Default)
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>size="md"</small>
                    </div>

                    <div>
                      <Button variant="primary" size="lg" href="#ds">
                        Large Hero (54px)
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>size="lg"</small>
                    </div>

                    <div>
                      <Button variant="primary" pill href="#ds">
                        Pill Shape
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>pill=&#123;true&#125;</small>
                    </div>

                    <div>
                      <Button variant="primary" loading href="#ds">
                        Carregando
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>loading=&#123;true&#125;</small>
                    </div>

                    <div>
                      <Button variant="primary" disabled href="#ds">
                        Desabilitado
                      </Button>
                      <small style={{ display: "block", marginTop: "0.4rem", color: "var(--ink-500)" }}>disabled=&#123;true&#125;</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── SUPERFÍCIES & CARDS ─── */}
            <div>
              <h2 className="services_heading" style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
                4. Superfícies e Cards
              </h2>
              <div className="services_grid">
                <div className="services_card">
                  <div className="services_card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3 className="services_card-title">Services Card</h3>
                  <p className="services_card-summary">
                    Superfície branca elevada com hairline border em azul real translúcido (<code>--card-hairline-on-light</code>) e sombra sutil.
                  </p>
                  <div className="services-stage">
                    <span>ETAPA 01</span>
                    <span className="services-stage-line" />
                  </div>
                </div>

                <div className="services_card" style={{ backgroundColor: "var(--navy-900)", color: "var(--white)", borderColor: "rgba(255,255,255,0.16)" }}>
                  <span className="eyebrow" style={{ color: "var(--accent-300)" }}>Depoimento / Navy</span>
                  <blockquote style={{ fontSize: "1.05rem", lineHeight: 1.6, margin: 0, fontStyle: "italic", color: "rgba(255,255,255,0.9)" }}>
                    “O Robson conduziu todo o processo de redesign com estratégia, clareza e entrega impecável antes do prazo.”
                  </blockquote>
                  <p style={{ margin: "auto 0 0", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
                    <strong style={{ color: "var(--white)" }}>Cliente Corporativo</strong> · São Paulo
                  </p>
                </div>

                <div className="featured-card">
                  <div className="featured-card_image-wrap">
                    <img
                      src="/assets/images/Visual%20Showcase.png"
                      alt="Exemplo de projeto do portfólio"
                      loading="lazy"
                    />
                  </div>
                  <div className="case-card-body">
                    <div className="case-card-badges">
                      <span className="case-card-badge">E-commerce & UX</span>
                    </div>
                    <div className="case-card-content">
                      <h3>Featured Work Card</h3>
                      <p>Card de apresentação de cases com zoom suave no hover e metadados estruturados.</p>
                    </div>
                  </div>
                  <div className="case-card-footer">
                    <span>São Paulo</span>
                    <strong>
                      Ver Projeto <TrajectoryArrow />
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
