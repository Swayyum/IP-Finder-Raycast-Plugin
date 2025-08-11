//Copyright © 2025 Sam Analytic Solutions
//All rights reserved.

import { getPreferenceValues } from "@raycast/api";

export interface ThemePreferences {
  themePreference: "auto" | "light" | "dark";
  colorScheme: "blue" | "green" | "purple" | "orange" | "red";
  showNetworkMap: boolean;
  mapLayout: "hierarchical" | "radial" | "grid";
}

export const getThemePreferences = (): ThemePreferences => {
  const preferences = getPreferenceValues<ThemePreferences>();
  return {
    themePreference: preferences.themePreference || "auto",
    colorScheme: preferences.colorScheme || "blue",
    showNetworkMap: preferences.showNetworkMap !== false,
    mapLayout: preferences.mapLayout || "hierarchical",
  };
};

export const getCurrentTheme = (): "light" | "dark" => {
  const preferences = getThemePreferences();

  if (preferences.themePreference === "auto") {
    // For auto theme, default to light theme
    // In a real implementation, you could detect system theme
    // but for now, we'll use light as default
    return "light";
  }

  return preferences.themePreference;
};

export const getColorScheme = () => {
  const preferences = getThemePreferences();
  return preferences.colorScheme;
};

export const getMapLayout = () => {
  const preferences = getThemePreferences();
  return preferences.mapLayout;
};

export const shouldShowNetworkMap = () => {
  const preferences = getThemePreferences();
  return preferences.showNetworkMap;
};

// Color palette for different schemes
export const colorPalettes = {
  blue: {
    primary: "#007AFF",
    secondary: "#5AC8FA",
    accent: "#007AFF",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
  },
  green: {
    primary: "#30D158",
    secondary: "#32D74B",
    accent: "#30D158",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
  },
  purple: {
    primary: "#AF52DE",
    secondary: "#BF5AF2",
    accent: "#AF52DE",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
  },
  orange: {
    primary: "#FF9F0A",
    secondary: "#FFB340",
    accent: "#FF9F0A",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
  },
  red: {
    primary: "#FF453A",
    secondary: "#FF6961",
    accent: "#FF453A",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
  },
};

export const getColorPalette = (scheme: string = "blue") => {
  return (
    colorPalettes[scheme as keyof typeof colorPalettes] || colorPalettes.blue
  );
};

// Theme-aware colors
export const getThemeColors = (theme: "light" | "dark") => {
  return {
    background: theme === "dark" ? "#1C1C1E" : "#F5F5F7",
    surface: theme === "dark" ? "#2C2C2E" : "#FFFFFF",
    text: theme === "dark" ? "#FFFFFF" : "#000000",
    textSecondary: theme === "dark" ? "#8E8E93" : "#6D6D70",
    border: theme === "dark" ? "#38383A" : "#D1D1D6",
    shadow: theme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)",
  };
};
