import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Clarity from "@microsoft/clarity";
import App from "./app/App.jsx";
import "./styles/global.css";

const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

if (clarityProjectId) {
  Clarity.init(clarityProjectId);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
