import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { dashboard, settings, analytics } from "../../assets/index";

const SIDEBAR_ITEMS = [
  { icon: dashboard, label: "Dashboard", href: "/dashboard" },
  { icon: analytics, label: "Analytics", href: "/analytics" },
  { icon: settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith("/form/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "md:w-64" : "md:w-20"
        }`}
      >
        <nav className="flex flex-col gap-1 p-2 w-full">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              title={!isOpen ? item.label : ""}
            >
              <img src={item.icon} alt="" className="h-6 w-6 flex-shrink-0" />
              {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40 w-64 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1 p-4">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={closeSidebar}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <img src={item.icon} alt="" className="h-6 w-6 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
