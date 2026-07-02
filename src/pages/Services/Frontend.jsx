import { getServiceBySlug } from "../../data/services.js";
import ServiceDetail from "./ServiceDetail.jsx";

export default function Frontend() {
  return <ServiceDetail service={getServiceBySlug("front-end-react")} />;
}
