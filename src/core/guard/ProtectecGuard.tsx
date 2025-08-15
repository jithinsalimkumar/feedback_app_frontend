import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";

type Props = { children: React.ReactElement };

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
