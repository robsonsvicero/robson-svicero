import { credibilityBarContent } from "../../content/siteContent.js";

export default function CredibilityBar() {
  return (
    <section
      className="trusted"
      data-od-id="credibilidade-bar"
      aria-label="Competencias e credibilidade"
    >
      <div className="container trusted-content">
        <span className="meta">{credibilityBarContent.label}</span>
        <div className="trust-list" aria-label="Competencias principais">
          {credibilityBarContent.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
