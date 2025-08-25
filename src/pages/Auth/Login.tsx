import { useEffect, useState } from "react";
import { login } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

    useEffect(() => {
      if(user) {
        console.log(user,"user");
        navigate("/dashboard");
      }
    },[]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  // Client-side validation first
  if (!email.trim() || !password.trim()) {
    setError("Please enter both email and password.");
    return;
  }

  try {
    await login(email, password);
    navigate("/dashboard");
  } catch (err: any) {
    let message = "Something went wrong. Please try again.";

    if (err.code) {
      switch (err.code) {
        case "auth/invalid-email":
          message = "Invalid email format. Please check your email.";
          break;
        case "auth/user-not-found":
          message = "No account found with this email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
          break;
        case "auth/too-many-requests":
          message = "Too many failed attempts. Try again later.";
          break;
        default:
          message = "Login failed. Please check your credentials.";
      }
    }
    setError(message);
  }
};

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-indigo-200 via-indigo-50 to-white">
      {/* Left side - Form */}
      <div className="flex justify-center items-center w-full md:w-1/2 px-4">
        <div className="bg-white shadow-xl p-8 w-full max-w-md rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-center font-cinzel text-gray-800">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6 font-mono">
            Sign in to continue building with{" "}
            <span className="font-semibold">FormFroge</span>
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center font-mono">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-mono text-gray-600">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-gray-50 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-0 focus:outline-none px-2 py-3 sm:text-sm transition-colors duration-200 font-mono"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="block text-sm mb-1 font-mono text-gray-600">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-gray-50 border-0 border-b-2 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-0 focus:outline-none px-2 py-3 sm:text-sm transition-colors duration-200 font-mono pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6 font-mono">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img
          src="public/images/loginPic.svg"
          alt="Login illustration"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
