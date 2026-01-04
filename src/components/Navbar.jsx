import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-14 border-b flex items-center justify-between px-6 bg-background">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-semibold text-lg">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>

        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium">U</span>
        </div>
      </div>
    </header>
  );
}
