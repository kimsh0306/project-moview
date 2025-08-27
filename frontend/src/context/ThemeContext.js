import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 테마 상태 관리
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    // 다크/라이트 테마를 로컬 스토리지와 HTML 속성에 동기화
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};