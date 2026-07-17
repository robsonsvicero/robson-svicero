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
    const timeoutId = window.setTimeout(() => {
      reject(new Error("Tempo limite ao inicializar o Facebook SDK."));
    }, 10000);

    function finalizeResolve(FB) {
      window.clearTimeout(timeoutId);
      resolve(FB);
    }

    function finalizeReject(error) {
      window.clearTimeout(timeoutId);
      reject(error);
    }

    window.fbAsyncInit = () => {
      if (!window.FB) {
        finalizeReject(new Error("Facebook SDK indisponivel."));
        return;
      }

      window.FB.init({
        appId: appId || undefined,
        version: sdkVersion,
        xfbml: false,
      });
      finalizeResolve(window.FB);
    };

    if (existingScript) {
      const checkInterval = window.setInterval(() => {
        if (window.FB) {
          window.clearInterval(checkInterval);
          finalizeResolve(window.FB);
        }
      }, 100);

      window.setTimeout(() => window.clearInterval(checkInterval), 10000);
      return;
    }

    const script = document.createElement("script");
    script.id = sdkId;
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = sdkSrc;
    script.onerror = () => finalizeReject(new Error("Nao foi possivel carregar o Facebook SDK."));
    document.body.appendChild(script);
  });
}

function waitForCommentsIframe(container, timeoutMs = 6000) {
  return new Promise((resolve, reject) => {
    if (!container) {
      reject(new Error("Container de comentarios nao encontrado."));
      return;
    }

    const hasIframe = () => Boolean(container.querySelector("iframe"));
    if (hasIframe()) {
      resolve();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!hasIframe()) return;
      observer.disconnect();
      window.clearTimeout(timeoutId);
      resolve();
    });

    observer.observe(container, { childList: true, subtree: true });

    const timeoutId = window.setTimeout(() => {
      observer.disconnect();
      reject(new Error("Facebook nao renderizou o iframe de comentarios."));
    }, timeoutMs);
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

      if (!appId) {
        setStatus("error");
        return;
      }

      setStatus("loading");

      try {
        const FB = await loadFacebookSdk(appId);
        if (!isMounted) return;

        await new Promise((resolve) => {
          FB.XFBML.parse(commentsRef.current, resolve);
        });

        await waitForCommentsIframe(commentsRef.current);
        if (isMounted) setStatus("ready");
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
          data-lazy="false"
        />
      </div>

      {status === "loading" && <p className="meta">Carregando comentarios...</p>}
      {status === "error" && (
        <div className="stack" style={{ gap: "var(--space-2)" }}>
          <p className="meta">Nao foi possivel carregar os comentarios do Facebook neste momento.</p>
          <p className="meta">
            Verifique se a URL do artigo esta publicada, se o dominio esta liberado no app do Facebook
            e se nao ha bloqueio de cookies/scripts no navegador.
          </p>
        </div>
      )}
    </section>
  );
}
