import { useEffect, useRef, useState } from "react";

const sdkId = "facebook-jssdk";
const sdkSrc = "https://connect.facebook.net/pt_BR/sdk.js";
const sdkVersion = "v20.0";

function ensureFacebookRoot() {
  if (document.getElementById("fb-root")) return;

  const root = document.createElement("div");
  root.id = "fb-root";
  document.body.prepend(root);
}

function loadFacebookSdk(appId) {
  ensureFacebookRoot();

  if (window.FB) return Promise.resolve(window.FB);

  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(sdkId);

    window.fbAsyncInit = () => {
      if (!window.FB) {
        reject(new Error("Facebook SDK indisponivel."));
        return;
      }

      window.FB.init({
        appId: appId || undefined,
        version: sdkVersion,
        xfbml: false,
      });
      resolve(window.FB);
    };

    if (existingScript) return;

    const script = document.createElement("script");
    script.id = sdkId;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = sdkSrc;
    script.onerror = () => reject(new Error("Nao foi possivel carregar o Facebook SDK."));
    document.body.appendChild(script);
  });
}

export default function FacebookComments({ url }) {
  const commentsRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID;

  useEffect(() => {
    let isMounted = true;

    async function renderComments() {
      if (!url) return;

      setStatus("loading");

      try {
        const FB = await loadFacebookSdk(appId);
        if (!isMounted) return;

        FB.XFBML.parse(commentsRef.current, () => {
          if (isMounted) setStatus("ready");
        });
      } catch (_error) {
        if (isMounted) setStatus("error");
      }
    }

    renderComments();

    return () => {
      isMounted = false;
    };
  }, [appId, url]);

  return (
    <section className="facebook-comments" aria-labelledby="facebook-comments-title">
      <div className="facebook-comments-header">
        <p className="eyebrow">Comunidade</p>
        <h2 id="facebook-comments-title">Comentarios</h2>
      </div>

      <div ref={commentsRef} className="facebook-comments-frame">
        <div
          className="fb-comments"
          data-href={url}
          data-width="100%"
          data-numposts="5"
          data-lazy="true"
        />
      </div>

      {status === "loading" && <p className="meta">Carregando comentarios...</p>}
      {status === "error" && (
        <p className="meta">
          Nao foi possivel carregar os comentarios do Facebook neste momento.
        </p>
      )}
    </section>
  );
}
