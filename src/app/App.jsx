import { useEffect, useState } from "react";
import Clarity from "@microsoft/clarity";
import AppRoutes from "../routes/AppRoutes.jsx";
import CookieBanner from "../components/CookieBanner/CookieBanner.jsx";

let clarityInitialized = false;

function startClarity() {
  const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;
  if (!clarityProjectId || clarityInitialized) return;

  clarityInitialized = true;
  Clarity.init(clarityProjectId);
  Clarity.consent(true);
}

export default function App() {
  const [cookieConsent, setCookieConsent] = useState(() => {
    if (typeof window === "undefined") return null;
    const storedConsent = window.localStorage.getItem("cookieConsent");
    return storedConsent === "true" ? "accepted" : storedConsent;
  });

  useEffect(() => {
    if (cookieConsent === "accepted") {
      startClarity();
    }
  }, [cookieConsent]);

  const saveConsent = (consent) => {
    window.localStorage.setItem("cookieConsent", consent);
    setCookieConsent(consent);
  };

  return (
    <>
      <AppRoutes />
      {!cookieConsent && (
        <CookieBanner
          onAccept={() => saveConsent("accepted")}
          onReject={() => saveConsent("rejected")}
        />
      )}
    </>
  );
}
