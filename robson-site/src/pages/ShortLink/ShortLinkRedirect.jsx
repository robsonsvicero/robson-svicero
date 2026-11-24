import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../../lib/supabaseClient.js";

export default function ShortLinkRedirect() {
  const { slug } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    async function redirect() {
      if (!isSupabaseConfigured) {
        setError("Serviço de links indisponível.");
        return;
      }

      const { data, error: requestError } = await supabase.rpc("resolve_short_link", {
        p_slug: slug,
      });
      const destination = Array.isArray(data) ? data[0]?.destination_url : data?.destination_url;

      if (requestError || !destination) {
        setError("Este link não existe ou não está mais disponível.");
        return;
      }

      window.location.replace(destination);
    }

    redirect();
  }, [slug]);

  return (
    <main className="page-section container" style={{ minHeight: "70vh" }}>
      {error ? (
        <div className="stack">
          <p className="eyebrow">Link indisponível</p>
          <h1>{error}</h1>
          <Link className="btn" to="/">Voltar ao início</Link>
        </div>
      ) : (
        <p>Redirecionando...</p>
      )}
    </main>
  );
}
