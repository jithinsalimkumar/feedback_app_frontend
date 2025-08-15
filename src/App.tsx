import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./core/components/Login";
import Signup from "./core/components/Signup";
import { AuthProvider } from "./shared/context/AuthContext";
import ProtectedRoute from "./core/guard/ProtectecGuard";
import NotFoundRedirect from "./core/guard/NotFoundRedirecGuardt";
import { Toaster } from "sonner";
import AdminDashboard from "./core/components/AdminDashboard";
import FeedbackForm from "./core/components/FeedbackForm";
import Layout from "./core/layout/Layout";

export default function App() {
  return (
    <AuthProvider>
     <Toaster
        position="top-right"
        richColors
      />
      <Router>
        <Routes>
          {/* Admin Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* User Feedback */}
          <Route
            path="/feedback"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Layout>
                  <FeedbackForm />
                </Layout>
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
