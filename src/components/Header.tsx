import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 backdrop-blur-xl bg-white/70 dark:bg-black/50 z-10 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200" />
            <div className="relative bg-white dark:bg-gray-900 rounded-full p-2">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
            DreamCanvas AI
          </h1>
        </div>
        
        <button
          onClick={toggleDarkMode}
          className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 group"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-200" />
          <div className="relative">
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;