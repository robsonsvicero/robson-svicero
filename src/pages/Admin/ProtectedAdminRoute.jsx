import { Navigate, useLocation } from "react-router-dom";
import { useAdminSession } from "./useAdminSession.js";

export default function ProtectedAdminRoute({ children }) {
  const { session, isLoading } = useAdminSession();
  const location = useLocation();

  if (isLoading) {
    return (
      <main className="admin-auth">
        <p className="meta">Carregando painel...</p>
      </main>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
