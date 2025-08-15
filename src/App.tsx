import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./core/components/Login";     // ensure file names & paths match case
import Signup from "./core/components/Signup";
import Dashboard from "./core/components/Dashboard";
import { AuthProvider } from "./shared/context/AuthContext";
import ProtectedRoute from "./core/guard/ProtectecGuard";
import NotFoundRedirect from "./core/guard/NotFoundRedirecGuardt";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Toaser */}
          <Toaster duration={3000} />
          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
