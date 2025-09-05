import React, { useRef } from "react";
import { Form } from "react-bootstrap";

const BSToggle = ({ className, label = null, onChange, checked }) => {
  const switchRef = useRef(null);

  const handleLabelClick = () => {
    if (switchRef.current) {
      switchRef.current.click();
    }
  };

  return (
    <Form.Group className={`${className} d-flex align-items-center`}>
      {label && (
        <Form.Label
          className="label m-0 me-2"
          onClick={handleLabelClick}
        >
          {label}
        </Form.Label>
      )}
      <Form.Check
        ref={switchRef}
        type="switch"
        onChange={onChange}
        checked={checked}
      />
    </Form.Group>
  );
};

export default BSToggle;
