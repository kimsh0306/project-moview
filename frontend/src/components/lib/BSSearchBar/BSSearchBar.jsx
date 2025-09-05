import React from "react";
import { Button, Form } from "react-bootstrap";

const BSSearchBar = ({ className, onSubmit, buttonVal, ...rest }) => {
  return (
    <Form className={`${className} d-flex`} onSubmit={onSubmit}>
      <Form.Control className="me-1" {...rest} />
      <Button type="submit" size="sm">
        {buttonVal}
      </Button>
    </Form>
  );
};

export default BSSearchBar;
