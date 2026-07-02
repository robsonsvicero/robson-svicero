import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import AdminLogin from "../pages/Admin/AdminLogin.jsx";
import ProtectedAdminRoute from "../pages/Admin/ProtectedAdminRoute.jsx";
import About from "../pages/About/About.jsx";
import Blog from "../pages/Blog/Blog.jsx";
import BlogPost from "../pages/Blog/BlogPost.jsx";
import CaseDetail from "../pages/Cases/CaseDetail.jsx";
import Cases from "../pages/Cases/Cases.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import Home from "../pages/Home/Home.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Schedule from "../pages/Schedule/Schedule.jsx";
import Frontend from "../pages/Services/Frontend.jsx";
import IdentityVisual from "../pages/Services/IdentityVisual.jsx";
import LandingPages from "../pages/Services/LandingPages.jsx";
import Services from "../pages/Services/Services.jsx";
import SiteCreationPage from "../pages/Services/SiteCreationPage.jsx";
import UIUX from "../pages/Services/UIUX.jsx";
import useScrollToTop from "../hooks/useScrollToTop.js";

function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Services />} />
        <Route path="/servicos/identidade-visual" element={<IdentityVisual />} />
        <Route path="/servicos/ui-ux-design" element={<UIUX />} />
        <Route path="/servicos/front-end-react" element={<Frontend />} />
        <Route path="/servicos/landing-pages" element={<LandingPages />} />
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
    </BrowserRouter>
  );
}
