import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const SuccessJoinModal = ({ show, resData }) => {
  const navigate = useNavigate();

  if (!show || !resData) return null;

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>회원가입 완료!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`${resData.name}님, ${resData.message}`}</p>
        <dl>
          <div className="d-flex">
            <dt style={{ width: "4rem" }}>아이디</dt>
            <dd>{resData.user_id}</dd>
          </div>
          <div className="d-flex">
            <dt style={{ width: "4rem" }}>회원번호</dt>
            <dd>{resData._id}</dd>
          </div>
        </dl>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => navigate("/")}>완료</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessJoinModal;
