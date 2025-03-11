import { useState, useCallback } from 'react';
import { themeQuartz, ThemeDefaultParams } from 'ag-grid-community';

export const lightTheme = themeQuartz.withParams({
  columnBorder: '1px solid #ccc',
  backgroundColor: '#ffffff',
  headerBackgroundColor: '#f3f4f6',
  rowHoverColor: '#f9fafb',
  selectedRowBackgroundColor: '#e5edff',
  borderColor: '#e5e7eb',
} as Partial<ThemeDefaultParams>);

export const darkTheme = themeQuartz.withParams({
  columnBorder: '1px solid #374151',
  backgroundColor: '#1f2937',
  headerBackgroundColor: '#111827',
  rowHoverColor: '#374151',
  selectedRowBackgroundColor: '#2563eb',
  borderColor: '#374151',
  foregroundColor: '#ffffff',
} as Partial<ThemeDefaultParams>);

export interface ThemeStyles {
  '--toolbar-bg': string;
  '--toolbar-border-color': string;
  '--button-border-color': string;
  '--button-color': string;
  '--button-hover-color': string;
  '--button-hover-border-color': string;
  '--button-hover-bg': string;
  '--button-active-color': string;
  '--button-active-border-color': string;
  '--divider-color': string;
}

export interface UseThemeResult {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentTheme: typeof lightTheme;
  themeClass: string;
  themeStyles: ThemeStyles;
  inputClassName: string;
}

export function useTheme(): UseThemeResult {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const themeStyles: ThemeStyles = {
    '--toolbar-bg': isDarkMode ? '#1f2937' : '#ffffff',
    '--toolbar-border-color': isDarkMode ? '#374151' : '#e8e8e8',
    '--button-border-color': isDarkMode ? '#4b5563' : '#d9d9d9',
    '--button-color': isDarkMode ? '#e5e7eb' : '#595959',
    '--button-hover-color': isDarkMode ? '#60a5fa' : '#1677ff',
    '--button-hover-border-color': isDarkMode ? '#60a5fa' : '#1677ff',
    '--button-hover-bg': isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(22, 119, 255, 0.1)',
    '--button-active-color': isDarkMode ? '#3b82f6' : '#0958d9',
    '--button-active-border-color': isDarkMode ? '#3b82f6' : '#0958d9',
    '--divider-color': isDarkMode ? '#374151' : '#e8e8e8'
  };

  const inputClassName = `w-24 px-3 py-2 border rounded ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white'
      : 'bg-white border-gray-300 text-gray-700'
  }`;

  return {
    isDarkMode,
    toggleTheme,
    currentTheme: isDarkMode ? darkTheme : lightTheme,
    themeClass: isDarkMode ? 'theme-dark' : 'theme-light',
    themeStyles,
    inputClassName
  };
} 