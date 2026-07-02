import { getServiceBySlug } from "../../data/services.js";
import ServiceDetail from "./ServiceDetail.jsx";

export default function UIUX() {
  return <ServiceDetail service={getServiceBySlug("ui-ux-design")} />;
}
