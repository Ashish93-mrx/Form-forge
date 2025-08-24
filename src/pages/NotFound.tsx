// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white px-6">
      {/* Illustration */}
      {/* <div className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-40 h-40 text-indigo-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9V5.25a.75.75 0 01.75-.75h3.75a.75.75 0 01.75.75V9m-6 0h6m-6 0v6m6-6v6m-6 0h6m-6 0V21m6-6v6"
          />
        </svg>
      </div> */}

      {/* Title */}
      <h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Oops! Page not found
      </h2>

      {/* Description */}
      <p className="text-gray-500 text-center max-w-md mb-6">
        The page you are looking for doesn’t exist or has been moved.  
        But don’t worry, you can go back and continue building amazing forms 🚀
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md shadow-md transition"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md transition"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
