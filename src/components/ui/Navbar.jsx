// src/components/ui/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/case", label: "New Case" },
    { path: "/cases", label: "My Cases" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-800 border-b flex items-center justify-between px-6 z-50">
      {/* Left side: logo */}
      <Link to="/" className="font-bold text-xl text-gray-900 dark:text-white">
        Relationship Court
      </Link>

      {/* Center: navigation links */}
      <div className="flex space-x-6">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition ${
                isActive ? "underline" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Right side: dark mode toggle */}
      <button
        onClick={toggleTheme}
        className="text-xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? "🌙" : "🔆"}
      </button>
    </nav>
  );
}
