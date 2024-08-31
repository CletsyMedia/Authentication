import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Laptop } from "lucide-react";

const themeOptions = [
  { value: 'light', label: 'Light Mode' },
  { value: 'dark', label: 'Dark Mode' },
  { value: 'system', label: 'System Default' }
];

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSystemDark, setIsSystemDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="size-4" />;
      case 'light':
        return <Sun className="size-4" />;
      case 'system':
      default:
        return <Laptop className="size-4" />;
    }
  };

  const getThemeClasses = () => {
    if (theme === 'system') {
      return isSystemDark ? 
        "bg-gray-800 text-gray-100" : 
        "bg-gray-200 text-gray-900";
    }

    switch (theme) {
      case 'dark':
        return "bg-gray-800 text-gray-100";
      case 'light':
        return "bg-gray-200 text-gray-900";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  const handleThemeChange = (value) => {
    toggleTheme(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsSystemDark(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`relative`}>
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`btn ${getThemeClasses()} border-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200`}
      >
        {getIcon()}
      </button>
      {isDropdownOpen && (
        <ul className={`absolute top-full -right-16 mt-2 w-48 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 ${getThemeClasses()}`}>
          {themeOptions.map(({ value, label }) => (
            <li key={value}>
              <button 
                onClick={() => handleThemeChange(value)} 
                className="w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded-lg transition-colors"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeToggler;
