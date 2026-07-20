export default function CookieBanner({ onAccept }) {
  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao
          continuar navegando, você concorda com a nossa{" "}
          <a href="/privacidade">Política de Privacidade</a>.
        </p>
        <button className="btn btn-primary btn-cookie" type="button" onClick={onAccept}>
          Entendi e Aceito
        </button>
      </div>
    </div>
  );
}
