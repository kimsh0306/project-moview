import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./ThemeSwitch.style.css";

const ThemeSwitch = ({theme, setTheme}) => {

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="theme-control">
      <Form.Group controlId="theme-switch" className="fom-group">
        <Form.Label>다크 테마</Form.Label>
        <Form.Check
          type="switch"
          onChange={handleThemeChange}
          checked={theme === "dark"}
        />
      </Form.Group>
    </div>
  );
};

export default ThemeSwitch;
