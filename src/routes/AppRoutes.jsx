import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
const NotFound = lazy(() => import("../pages/NotFound/NotFound.jsx"));
const Schedule = lazy(() => import("../pages/Schedule/Schedule.jsx"));
const Frontend = lazy(() => import("../pages/Services/Frontend.jsx"));
const IdentityVisual = lazy(() => import("../pages/Services/IdentityVisual.jsx"));
const LandingPages = lazy(() => import("../pages/Services/LandingPages.jsx"));
const Services = lazy(() => import("../pages/Services/Services.jsx"));
const SiteCreationPage = lazy(() => import("../pages/Services/SiteCreationPage.jsx"));
const SiteInstitucional = lazy(() => import("../pages/Services/SiteInstitucional.jsx"));
const SiteOnePage = lazy(() => import("../pages/Services/SiteOnePage.jsx"));
const UIUX = lazy(() => import("../pages/Services/UIUX.jsx"));

function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/servicos/identidade-visual" element={<IdentityVisual />} />
          <Route path="/servicos/ui-ux-design" element={<UIUX />} />
          <Route path="/servicos/front-end-react" element={<Frontend />} />
          <Route path="/servicos/landing-pages" element={<LandingPages />} />
          <Route path="/servicos/site-one-page" element={<SiteOnePage />} />
          <Route path="/servicos/site-institucional" element={<SiteInstitucional />} />
          <Route path="/servicos/sites-institucionais" element={<SiteInstitucional />} />
          <Route path="/criacao-de-sites" element={<SiteCreationPage />} />
          <Route path="/criacao-de-sites/:slug" element={<SiteCreationPage />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:slug" element={<CaseDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/agendamentos" element={<Schedule />} />
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
    </BrowserRouter>
  );
}
