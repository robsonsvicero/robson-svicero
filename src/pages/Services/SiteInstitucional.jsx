import { getServiceBySlug } from "../../data/services.js";
import ServiceDetail from "./ServiceDetail.jsx";

export default function SiteInstitucional() {
  return <ServiceDetail service={getServiceBySlug("site-institucional")} />;
}
