// src/components/ui/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FilePlus, Files, Scale, Settings } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const Sidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems = [
    { path: "/", label: t?.sidebar?.home || "Home", icon: <Home size={20} /> },
    {
      path: "/case",
      label: t?.sidebar?.newCase || "New Case",
      icon: <FilePlus size={20} />,
    },
    {
      path: "/cases",
      label: t?.sidebar?.myCases || "My Cases",
      icon: <Files size={20} />,
    },
    {
      path: "/verdict",
      label: t?.sidebar?.verdict || "Verdict",
      icon: <Scale size={20} />,
    },
    {
      path: "/settings",
      label: t?.sidebar?.settings || "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex-1 flex flex-col min-h-0 pt-4">
        <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
