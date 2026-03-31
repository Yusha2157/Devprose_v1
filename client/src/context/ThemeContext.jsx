import { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

/**
 * ThemeProvider — dark-mode only, matching the reference dashboard design.
 * Keeps the provider structure intact so nothing breaks downstream.
 */
export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
