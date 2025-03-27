import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import themes from "../styles/theme";

type Theme = "light" | "dark";

export type ThemeContextType = {
  toggleTheme: () => void;
  theme: typeof themes["light"];
  themeName: "light" | "dark";
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName(prev => prev === "light" ? "dark" : "light");
  };

  const currentTheme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeName, theme: currentTheme }}>
      <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
