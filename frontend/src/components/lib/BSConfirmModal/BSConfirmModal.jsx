import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImNotification } from "react-icons/im";

const BSConfirmModal = ({
  show,
  onHide,
  onClick,
  title,
  message,
  confirmVariant = "primary",
  confirmText = "확인",
  ...rest
}) => {
  if (!show) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={true}
      {...rest}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title || <ImNotification />}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={confirmVariant} onClick={onClick}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BSConfirmModal;
