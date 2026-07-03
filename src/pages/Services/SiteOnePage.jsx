import { getServiceBySlug } from "../../data/services.js";
import ServiceDetail from "./ServiceDetail.jsx";

export default function SiteOnePage() {
  return <ServiceDetail service={getServiceBySlug("site-one-page")} />;
}
