import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImNotification } from "react-icons/im";

const BSConfirmModal = ({
  show,
  onHide,
  message,
  onClick,
  btnVariant = "primary",
  btnValue = "확인",
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
        <Button variant={btnVariant} onClick={onClick}>
          {btnValue}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BSConfirmModal;
