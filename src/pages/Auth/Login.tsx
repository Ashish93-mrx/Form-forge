import { useEffect, useState } from "react";
import { login } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";
import loginPic from "../../../public/images/loginPic.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      let message = "Login failed. Please try again.";

      switch (err.code) {
        case "auth/invalid-email":
          message = "Invalid email format.";
          break;
        case "auth/user-not-found":
          message = "No account found with this email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password.";
          break;
        case "auth/too-many-requests":
          message = "Too many attempts. Try again later.";
          break;
      }
      setError(message);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@gmail.com");
    setPassword("demo@123");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-indigo-200 via-indigo-50 to-white">
      <div className="flex justify-center items-center w-full md:w-1/2 px-4">
        <div className="bg-white shadow-xl p-8 w-full max-w-md rounded-lg">
          <h1 className="text-3xl font-bold mb-2 text-center font-cinzel text-gray-800">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6 font-mono">
            Sign in to continue with <span className="font-semibold">FormFroge</span>
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
                className="w-full bg-gray-50 border-b-2 border-gray-300 focus:border-indigo-500 px-2 py-3 font-mono"
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
                className="w-full bg-gray-50 border-b-2 border-gray-300 focus:border-indigo-500 px-2 py-3 font-mono pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 cursor-pointer top-9 text-gray-500"
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
              className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <button
            onClick={handleDemoLogin}
            className="w-full mt-4 border cursor-pointer border-indigo-500 text-indigo-600 py-2 rounded-md font-mono hover:bg-indigo-50 transition"
          >
            Use Demo Credentials
          </button>

          <p className="text-center text-sm text-gray-500 mt-6 font-mono">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
        <img src={loginPic} alt="Login illustration" className="w-full h-auto" />
      </div>
    </div>
  );
}