import React from "react";
import { useTheme } from "hooks/theme/useTheme";
import BSToggle from "components/lib/BSToggle/BSToggle";
import "./ThemeToggle.style.scss";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <BSToggle
      className="theme-control"
      label="다크 테마"
      onChange={toggleTheme}
      checked={isDark}
    />
  );
};

export default ThemeToggle;
