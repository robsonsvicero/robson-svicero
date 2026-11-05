import Button from "../ui/Button/Button.jsx";

export default function CookieBanner({ onAccept, onReject }) {
  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao
          continuar navegando, você concorda com a nossa{" "}
          <a href="/privacidade">Política de Privacidade</a>.
        </p>
        <div className="cookie-actions">
          <Button variant="secondary" size="sm" className="btn-cookie-reject" onClick={onReject}>
            Recusar
          </Button>
          <Button variant="primary" size="sm" className="btn-cookie" onClick={onAccept}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
