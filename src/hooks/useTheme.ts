'use client';

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const themeName = theme === 'system' ? (systemTheme || 'light') : (theme || 'light');
  
  const toggleTheme = () => {
    setTheme(themeName === 'light' ? 'dark' : 'light');
  };

  return { 
    themeName: (mounted ? themeName : 'light') as 'light' | 'dark', 
    toggleTheme,
    mounted 
  };
};
