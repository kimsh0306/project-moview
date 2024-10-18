import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // 리액트 부트 스트랩의 컬러 모드 사용하려면 dom 접근 필요
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Form.Group controlId="theme-switch" className="fom-group">
      <Form.Label>{theme === "dark" ? "밝은 테마" : "어두운 테마"}</Form.Label>
      <Form.Check
        type="switch"
        onChange={handleThemeChange}
        checked={theme === "dark"}
      />
    </Form.Group>
  );
};

export default ThemeSwitch;
