import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton.jsx";
import Home from "../pages/Home/Home.jsx";
import useScrollToTop from "../hooks/useScrollToTop.js";

const GA_MEASUREMENT_ID = "G-WP7DM0BXVE";
let analyticsInitialized = false;

function ensureAnalyticsInitialized() {
  if (analyticsInitialized || typeof window === "undefined") return;
  ReactGA.initialize(GA_MEASUREMENT_ID);
  analyticsInitialized = true;
}

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
const ClaroMethodPage = lazy(() => import("../pages/ClaroMethod/ClaroMethod.jsx"));
const DesignSystem = lazy(() => import("../pages/DesignSystem/DesignSystem.jsx"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound.jsx"));
const Schedule = lazy(() => import("../pages/Schedule/Schedule.jsx"));
const DigitalCard = lazy(() => import("../pages/DigitalCard/DigitalCard.jsx"));
const FaqPage = lazy(() => import("../pages/Faq/FaqPage.jsx"));
const CriacaoDeSites = lazy(() => import("../pages/CriacaoDeSites/CriacaoDeSites.jsx"));
const Precos = lazy(() => import("../pages/Precos/Precos.jsx"));
const Privacy = lazy(() => import("../pages/Privacy/Privacy.jsx"));
const ThankYou = lazy(() => import("../pages/ThankYou/ThankYou.jsx"));
const ShortLinkRedirect = lazy(() => import("../pages/ShortLink/ShortLinkRedirect.jsx"));
const Agendamento = lazy(() => import("../pages/Agendamento/Agendamento.jsx"));
const UXDesign = lazy(() => import("../pages/Servicos/UXDesign.jsx"));
const IdentidadeVisual = lazy(() => import("../pages/Servicos/IdentidadeVisual.jsx"));
const SeoService = lazy(() => import("../pages/Servicos/SeoService.jsx"));
const GestaoGMN = lazy(() => import("../pages/Servicos/GestaoGMN.jsx"));

function ScrollToTop() {
  useScrollToTop();
  return null;
}

function GlobalWhatsAppButton() {
  const { pathname } = useLocation();
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/");

  return isBlogPage ? null : <WhatsAppButton />;
}

function HomeOrBlogPreview() {
  const { search } = useLocation();
  const previewSlug = new URLSearchParams(search).get("preview");

  if (!previewSlug) return <Home />;

  return <Navigate to={`/blog/${encodeURIComponent(previewSlug)}?preview=1`} replace />;
}

function RouteAnalytics() {
  const location = useLocation();
  const lastTrackedPath = useRef("");

  useEffect(() => {
    ensureAnalyticsInitialized();

    const page = `${location.pathname}${location.search}${location.hash}`;

    // Evita pageview duplicado no StrictMode durante desenvolvimento.
    if (lastTrackedPath.current === page) return;
    lastTrackedPath.current = page;

    ReactGA.send({
      hitType: "pageview",
      page,
      title: document.title,
    });
  }, [location.hash, location.pathname, location.search]);

  return null;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <RouteAnalytics />
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomeOrBlogPreview />} />
          <Route path="/criacao-de-sites" element={<CriacaoDeSites />} />
          <Route path="/precos" element={<Precos />} />
          <Route path="/servicos" element={<Navigate to="/servicos/ux-design" replace />} />
          <Route path="/servicos/ux-design" element={<UXDesign />} />
          <Route path="/servicos/identidade-visual" element={<IdentidadeVisual />} />
          <Route path="/servicos/seo" element={<SeoService />} />
          <Route path="/servicos/gestao-gmn" element={<GestaoGMN />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:slug" element={<CaseDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/diagnostico-claro" element={<ClaroDiagnostic />} />
          <Route path="/metodo-claro" element={<ClaroMethodPage />} />
          <Route path="/agendamentos" element={<Schedule />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/faq" element={<FaqPage />} />
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
