import { getServiceBySlug } from "../../data/services.js";
import ServiceDetail from "./ServiceDetail.jsx";

export default function IdentityVisual() {
  return <ServiceDetail service={getServiceBySlug("identidade-visual")} />;
}
