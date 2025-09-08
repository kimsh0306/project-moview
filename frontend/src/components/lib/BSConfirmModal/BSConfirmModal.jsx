import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImNotification } from "react-icons/im";

const BSConfirmModal = ({
  show,
  onHide,
  message,
  onClick,
  confirmVariant = "primary",
  cancelVariant = "primary",
  confirmText = "확인",
  cancelText = "취소",
  ...rest
}) => {
  if (!show) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      {...rest}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <ImNotification />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={cancelVariant} onClick={onHide}>
          {cancelText}
        </Button>
        <Button variant={confirmVariant} onClick={onClick}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BSConfirmModal;
