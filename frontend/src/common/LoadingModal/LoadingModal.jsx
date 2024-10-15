import React from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import "./LoadingModal.style.css";

const LoadingModal = ({ show }) => {
  if (!show) return null;

  return (
    <Modal
      className="loading"
      show={show}
      animation={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Modal>
  );
};

export default LoadingModal;
