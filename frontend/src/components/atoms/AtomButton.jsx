import React from "react";
import "./AtomButton.style.scss";

const AtomButton = ({className="", children, ...rest}) => {
  return (
    <button className={`atom-button ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default AtomButton;
