import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ImNotification } from "react-icons/im";
import "./CustomToast.style.css";

const CustomToast = ({ show, setShow }) => {
  if (!show) return;

  return (
    <div className="custom-toast">
      <ToastContainer position="middle-center">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          animation={true}
          autohide
        >
          <Toast.Header>
            <ImNotification className="me-auto" />
          </Toast.Header>
          <Toast.Body>{show}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default CustomToast;
