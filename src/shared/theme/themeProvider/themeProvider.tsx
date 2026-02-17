import React from 'react';
import { useTheme } from '@/shared/theme/useTheme/useTheme.tsx';
import { ThemeContext } from '@/shared/theme/themeProvider/themeContext.ts';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

