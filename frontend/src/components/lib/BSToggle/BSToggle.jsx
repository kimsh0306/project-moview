import React from "react";
import { Form } from "react-bootstrap";

const BSToggle = ({ className, label = null, onChange, checked }) => {
  return (
    <Form.Group className={`${className} fom-group d-flex align-items-center`}>
      {label && <Form.Label className="label m-0 me-2">{label}</Form.Label>}
      <Form.Check type="switch" onChange={onChange} checked={checked} />
    </Form.Group>
  );
};

export default BSToggle;
