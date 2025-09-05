import React from "react";
import BSToggle from "components/lib/BSToggle/BSToggle";
import "./ThemeToggle.style.scss";

const ThemeToggle = ({...rest}) => {
  return (
    <BSToggle {...rest} />
  );
};

export default ThemeToggle;
