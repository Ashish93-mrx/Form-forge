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

      <div className="space-x-4">
        {user ? (
          <>
          {location.pathname !== "/dashboard" && (
            <Link to="/dashboard">Dashboard</Link>
            )}
            <button
              onClick={logout}
              className="bg-red-500 cursor-pointer px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname !== "/login" && (
              <Link to="/login">Login</Link>
            )}
            {location.pathname !== "/signup" && (
              <Link to="/signup">Signup</Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
