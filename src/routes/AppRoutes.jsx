import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton.jsx";
import Home from "../pages/Home/Home.jsx";
import useScrollToTop from "../hooks/useScrollToTop.js";

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard.jsx"));
const AdminLogin = lazy(() => import("../pages/Admin/AdminLogin.jsx"));
const ProtectedAdminRoute = lazy(() => import("../pages/Admin/ProtectedAdminRoute.jsx"));
const About = lazy(() => import("../pages/About/About.jsx"));
const Blog = lazy(() => import("../pages/Blog/Blog.jsx"));
const BlogPost = lazy(() => import("../pages/Blog/BlogPost.jsx"));
const CaseDetail = lazy(() => import("../pages/Cases/CaseDetail.jsx"));
const Cases = lazy(() => import("../pages/Cases/Cases.jsx"));
const Contact = lazy(() => import("../pages/Contact/Contact.jsx"));
const ClaroDiagnostic = lazy(() => import("../pages/ClaroDiagnostic/ClaroDiagnostic.jsx"));
const DesignSystem = lazy(() => import("../pages/DesignSystem/DesignSystem.jsx"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound.jsx"));
const Schedule = lazy(() => import("../pages/Schedule/Schedule.jsx"));
const DigitalCard = lazy(() => import("../pages/DigitalCard/DigitalCard.jsx"));
const Services = lazy(() => import("../pages/Services/Services.jsx"));
const Privacy = lazy(() => import("../pages/Privacy/Privacy.jsx"));
const ThankYou = lazy(() => import("../pages/ThankYou/ThankYou.jsx"));
const ShortLinkRedirect = lazy(() => import("../pages/ShortLink/ShortLinkRedirect.jsx"));

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function GlobalWhatsAppButton() {
  const { pathname } = useLocation();
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/");

  return isBlogPage ? null : <WhatsAppButton />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:slug" element={<CaseDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/diagnostico-claro" element={<ClaroDiagnostic />} />
          <Route path="/agendamentos" element={<Schedule />} />
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/cartao" element={<DigitalCard />} />
          <Route path="/r/:slug" element={<ShortLinkRedirect />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <GlobalWhatsAppButton />
    </BrowserRouter>
  );
}
