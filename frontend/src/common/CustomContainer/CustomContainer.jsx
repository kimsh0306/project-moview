import React from "react";
import { Container } from "react-bootstrap";

const CustomContainer = ({ className = "", children }) => {
  return (
    <Container fluid className={`p-5 ${className}`}>
      {children}
    </Container>
  );
};

export default CustomContainer;
