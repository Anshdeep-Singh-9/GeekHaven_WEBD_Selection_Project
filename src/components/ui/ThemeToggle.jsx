import React from 'react';
import { useTheme } from '../../context/theme_context';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-content">
        {isDarkMode ? (
          // Sun icon for light mode
          <svg
            className="theme-icon sun-icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="18"
            height="18"
          >
            <path d="M12 2v2a1 1 0 002 0V2a1 1 0 00-2 0zm0 18v2a1 1 0 002 0v-2a1 1 0 00-2 0zM5.64 7.05a1 1 0 00.7-.29 1 1 0 000-1.41A1 1 0 005.64 5a1 1 0 00-.7.29 1 1 0 000 1.41 1 1 0 00.7.29zm12.02 10.61a1 1 0 00.7-.29 1 1 0 000-1.41 1 1 0 00-1.41 0 1 1 0 000 1.41 1 1 0 00.71.29zM22 12h-2a1 1 0 000 2h2a1 1 0 000-2zM4 12H2a1 1 0 000 2h2a1 1 0 000-2zm15.36-7.36a1 1 0 00-1.41 0 1 1 0 000 1.41 1 1 0 001.41 0 1 1 0 000-1.41zM6.05 17.95a1 1 0 00-1.41 0 1 1 0 000 1.41 1 1 0 001.41 0 1 1 0 000-1.41zM12 6.5a5.5 5.5 0 105.5 5.5A5.51 5.51 0 0012 6.5zm0 9a3.5 3.5 0 113.5-3.5 3.5 3.5 0 01-3.5 3.5z" />
          </svg>
        ) : (
          // Moon icon for dark mode
          <svg
            className="theme-icon moon-icon"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="18"
            height="18"
          >
            <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.59 8.59 0 01.25-2A1 1 0 008 2.36a10.14 10.14 0 1014 11.69 1 1 0 00-.36-1.05zm-9.5 6.69A8.14 8.14 0 017.08 5.22v.27A10.15 10.15 0 0017.22 15.63a9.79 9.79 0 01-2.54.4 8.42 8.42 0 01-2.54-.34z" />
          </svg>
        )}
        <span className="theme-label">
          {isDarkMode ? 'Light' : 'Dark'}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;
