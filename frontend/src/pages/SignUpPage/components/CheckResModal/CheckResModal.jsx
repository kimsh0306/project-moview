import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CheckResModal = ({
  showModal,
  handleModalClose,
  resData,
  handleOkBtn,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={handleModalClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>회원가입 완료!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{`${resData.name}님, ${resData.message}`}</div>
        <div>아이디: {resData.user_id}</div>
        <div>회원번호: {resData._id}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOkBtn}>완료</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckResModal;
