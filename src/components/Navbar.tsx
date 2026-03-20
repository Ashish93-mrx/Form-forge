import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        FormForge
      </Link>

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
