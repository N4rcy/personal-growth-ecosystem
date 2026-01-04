import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const Settings = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 border-gray-300 dark:border-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </label>
                <div className="flex justify-between items-center p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <span className="text-gray-700 dark:text-gray-300">
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </span>
                  <Button
                    onClick={toggleTheme}
                    variant="outline"
                    className="text-sm border-gray-300 dark:border-gray-700"
                  >
                    {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Configuration
                </label>
                <div className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    DeepSeek API Status
                  </p>
                  <div className="flex items-center">
                    <div
                      className={`h-2 w-2 rounded-full mr-2 ${
                        import.meta.env.VITE_DEEPSEEK_API_KEY
                          ? "bg-accent-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm">
                      {import.meta.env.VITE_DEEPSEEK_API_KEY
                        ? "API Key Configured"
                        : "API Key Missing"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                About This App
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Personal Growth Ecosystem v1.0 • Built with React & DeepSeek AI
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                All data is stored locally in your browser.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
