import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ImNotification } from "react-icons/im";
import "./CustomToast.style.css";

const CustomToast = ({ show, setShow }) => {
  if (!show) return;

  return (
    <ToastContainer position="middle-center" className="custom-toast">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        animation={true}
        autohide
        bg="dark"
      >
        <Toast.Header>
          <ImNotification className="me-auto"/>
        </Toast.Header>
        <Toast.Body>{show}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;
