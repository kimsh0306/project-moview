import React from "react";

const AtomButton = ({children, ...rest}) => {
  return (
    <button {...rest}>
      {children}
    </button>
  );
};

export default AtomButton;
