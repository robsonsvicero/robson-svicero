import { useRef, useState } from "react";
import SEO from "../../components/seo/SEO.jsx";

const links = [
  {
    id: "whatsapp",
    label: "Falar pelo WhatsApp",
    href: "https://wa.me/5511964932007?text=Ol%C3%A1!%20Vi%20seu%20cart%C3%A3o%20digital%20e%20gostaria%20de%20conversar.",
  },
  {
    id: "site",
    label: "Visitar meu site",
    href: "https://robsonsvicero.com.br",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/robson.svicero",
  },
  {
    id: "google-review",
    label: (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
        Avalie no
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
      </span>
    ),
    href: "https://g.page/r/CaZfQ1719ZFkEAE/review",
  },
];

export default function DigitalCard() {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownloadPDF() {
    if (!cardRef.current || isGenerating) return;
    setIsGenerating(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const options = {
        margin: 0,
        filename: "cartao-robson-svicero.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          backgroundColor: null,
        },
        jsPDF: {
          unit: "px",
          format: [460, 660],
          orientation: "portrait",
        },
      };

      await html2pdf().set(options).from(cardRef.current).save();
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
      <SEO
        title="Cartão digital | Robson Svicero"
        description="Cartão digital de Robson Svicero com links para WhatsApp, site e Instagram."
        path="/cartao"
        robots="noindex, follow"
      />
      <main className="digital-card-page">
        <article className="digital-card" ref={cardRef} aria-label="Cartao digital interativo">
          <button
            className="digital-card-pdf-btn"
            onClick={handleDownloadPDF}
            aria-label="Baixar cartão como PDF"
            title="Baixar como PDF"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            )}
          </button>

          <img
            className="digital-card-avatar"
            src="/assets/images/Robson_Svicero_1x1.webp"
            alt="Robson Svicero"
            width="640"
            height="800"
          />
          <h1>Robson Svicero</h1>
          <p className="digital-card-tagline">Desenvolvedor web | UX Designer</p>
          <p className="digital-card-copy">
            Sites profissionais que combinam estratégia, velocidade, clareza e IA como apoio complementar.
          </p>

          <div className="digital-card-links">
            {links.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer noopener" key={link.id}>
                {link.label}
              </a>
            ))}
          </div>

          <p className="digital-card-footer">&copy; 2026 Robson Svicero</p>
        </article>
      </main>
    </>
  );
}

