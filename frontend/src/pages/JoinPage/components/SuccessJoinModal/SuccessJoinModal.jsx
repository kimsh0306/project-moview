import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const SuccessJoinModal = ({ show, user }) => {
  const navigate = useNavigate();

  if (!show || !user) return null;

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>회원가입 완료!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{`${user.userName}님, 회원가입이 완료되었습니다.`}</p>
        <dl>
          <div className="d-flex">
            <dt style={{ width: "4rem" }}>아이디</dt>
            <dd>{user.userId}</dd>
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
