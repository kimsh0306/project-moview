import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImNotification } from "react-icons/im";

const AlertModal = ({ show, handleClose }) => {
  if (!show) return null;

  return (
    <Modal show={show} centered backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>
          <ImNotification />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{show}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
