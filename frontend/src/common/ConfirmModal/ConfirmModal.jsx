import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImNotification } from "react-icons/im";

const ConfirmModal = ({ show, handleClose, handleOk }) => {
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <ImNotification />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{show}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleOk}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
