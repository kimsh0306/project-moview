import React from "react";
import { Form } from "react-bootstrap";

const SwitchControl = ({ label, onChange, checked }) => {
  return (
    <div className="switch-control">
      <Form.Group className="fom-group d-flex align-items-center">
        <Form.Label className="m-0 me-2">{label}</Form.Label>
        <Form.Check type="switch" onChange={onChange} checked={checked} />
      </Form.Group>
    </div>
  );
};

export default SwitchControl;
