import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImNotification } from "react-icons/im";

const CheckLoginModal = ({ show, setShow }) => {
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

  if(!show) return null;

  return (
    <>
      <Modal
        show={show}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><ImNotification/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          로그인이 필요한 서비스입니다. 로그인하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CheckLoginModal;
