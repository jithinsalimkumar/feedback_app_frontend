import { Navigate } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";

export default function NotFoundRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
}
