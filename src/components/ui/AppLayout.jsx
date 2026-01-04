import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Heart,
  MessageSquare,
  Brain,
  Home,
  Settings,
  ChevronLeft,
  Moon,
  Sun,
  Scale,
} from "lucide-react";
import { Button } from "./button";
import { useTheme } from "../../context/ThemeContext";

const AppLayout = ({ children, showBackButton = false, onBack }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Relationship Court", href: "/court", icon: Scale },
    { name: "English Lab", href: "/english-lab", icon: MessageSquare },
    { name: "Research Hub", href: "/study-tools", icon: Brain },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {showBackButton ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack || (() => navigate(-1))}
                  className="mr-2"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              ) : (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              )}

              <Link to="/" className="ml-2 md:ml-0 flex items-center">
                <Scale className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  Growth
                  <span className="text-primary-600 dark:text-primary-400">
                    Tools
                  </span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  asChild
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={`${
                    isActive(item.href)
                      ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Link to={item.href}>
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                </Button>
              ))}

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-2 text-gray-700 dark:text-gray-300"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">{children}</main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around items-center h-16">
          {navigation.slice(0, 4).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
