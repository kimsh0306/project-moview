import React from "react";
import { Button } from "react-bootstrap";

const ScrollButton = ({ label, onClick }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        padding: 0,
        borderRadius: "50%",
        position: "fixed",
        bottom: "20px",
        right: "20px",
      }}
    >
      {label}
    </Button>
  );
};

export default ScrollButton;
