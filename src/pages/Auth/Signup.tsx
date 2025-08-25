import { useState } from "react";
import { signup } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
    setError("Please enter both email and password.");
    return;
  }
    try {
      await signup(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

    return (
      <div className="flex min-h-screen bg-gradient-to-b from-indigo-200 via-indigo-50 to-white">
                {/* Right side - Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
          <img
            src="public/images/signUpPic.svg"
            alt="Login illustration"
            className="w-full h-auto"
          />
        </div>
        {/* Left side - Form */}
        <div className="flex justify-center items-center w-full md:w-1/2 px-4">
          <div className="bg-white shadow-xl p-8 w-full max-w-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center font-cinzel text-gray-800">
               Create Your Account
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6 font-mono">
            Start building beautiful forms with{" "}
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
                Sign in
              </button>
            </form>
  
            <p className="text-center text-sm text-gray-500 mt-6 font-mono">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
  

      </div>
    );

}
