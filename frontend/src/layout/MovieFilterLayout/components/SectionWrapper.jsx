import React from "react";
import { Col, Row } from "react-bootstrap";

const SectionWrapper = ({ sectionProps, rowProps, colProps, children }) => {
  return (
    <section {...sectionProps}>
      <Row {...rowProps}>
        {colProps 
          ? <Col {...colProps}>{children}</Col> 
          : children}
      </Row>
    </section>
  );
};

export default SectionWrapper;
