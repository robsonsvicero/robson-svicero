import { partnersContent } from "../../content/siteContent.js";

export default function Partners() {
  return (
    <section className="partners-section" data-od-id="parceiros" aria-label="Parceiros">
      <div className="container">
        <div className="partners-header">
          <p className="eyebrow">{partnersContent.eyebrow}</p>
        </div>
        <div className="partners-logos">
          {partnersContent.partners.map((partner) => (
            <a
              className="partner-item"
              href={partner.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={partner.name}
              title={`Visitar o site de ${partner.name}`}
              key={partner.name}
            >
              <img src={partner.image} alt={partner.name} title={partner.name} />
              <p>{partner.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
