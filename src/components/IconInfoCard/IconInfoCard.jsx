import Card from "../ui/Card/Card.jsx";

export default function IconInfoCard({ icon: Icon, title, description, stage, className = "" }) {
  return (
    <Card className={`services-card glass-card ${className}`.trim()}>
      <div className="services-icon" aria-hidden="true">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {stage && (
        <div className="services-stage" aria-hidden="true">
          <span>{stage}</span>
          <span className="services-stage-line" />
        </div>
      )}
    </Card>
  );
}
