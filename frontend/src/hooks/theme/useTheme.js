import { useContext } from "react";
import { ThemeContext } from "contexts/theme/ThemeContext";

// 커스텀 훅
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};
