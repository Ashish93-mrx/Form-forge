import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <AppRoutes />
      <Toaster richColors position="top-right" />
    </div>
  );
}
