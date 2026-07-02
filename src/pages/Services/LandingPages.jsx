import { getServiceBySlug } from "../../data/services.js";
import ServiceDetail from "./ServiceDetail.jsx";

export default function LandingPages() {
  return <ServiceDetail service={getServiceBySlug("landing-pages")} />;
}
