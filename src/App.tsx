import Navbar from "./components/Navbar";
import Sidebar from "./components/layout/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { SidebarProvider, useSidebar } from "./context/SidebarContext";
import { useLocation } from "react-router-dom";
import "./index.css";
import { Toaster } from "sonner";

function AppContent() {
  const { isOpen } = useSidebar();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex">
        {!isHomePage && <Sidebar />}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            !isHomePage && isOpen ? "md:ml-64" : !isHomePage ? "md:ml-20" : ""
          }`}
        >
          <AppRoutes />
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  );
}