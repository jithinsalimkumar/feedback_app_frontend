import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LogsIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md transition-colors duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-700 font-semibold"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo & Navigation */}
      <div className="flex items-center gap-6">
        <div
          className="flex items-center gap-2 text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <LogsIcon size={32} />
          <span>FeedApp</span>
        </div>

        <div className="flex space-x-2">
          {role === "user" && (
            <NavLink to="/feedback" className={linkClass}>
              Feedback
            </NavLink>
          )}
          {role === "admin" && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
        </div>
      </div>

      {/* User Info & Logout */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600 italic">Role: {role}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
