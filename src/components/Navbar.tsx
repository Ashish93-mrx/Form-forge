import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSidebar } from "../context/SidebarContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center h-16">
      <div className="flex items-center gap-4">
        {location.pathname !== "/" && (
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 cursor-pointer"
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <Link to="/" className="font-bold text-lg whitespace-nowrap">
          FormForge
        </Link>
      </div>

      <div className="flex items-center space-x-4 my-2">
        {user ? (
          <>
            {location.pathname !== "/dashboard" && (
              <Link to="/dashboard" className="hover:text-gray-300 transition">
                Dashboard
              </Link>
            )}
            {location.pathname !== "/form/create" && (
              <Link
                to="/form/create"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-4 py-1 rounded-lg font-semibold transition shadow-lg"
              >
                + Create Form
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 cursor-pointer px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <Link to="/login" className="hover:text-gray-300 transition">
                Login
              </Link>
            )}
            {location.pathname !== "/signup" && (
              <Link to="/signup" className="hover:text-gray-300 transition">
                Signup
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
