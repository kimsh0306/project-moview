import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import CheckResModal from "./components/CheckResModal/CheckResModal";
import "./SignUpPage.style.css";

const initData = {
  user_id: "",
  name: "",
  email: "",
  password: "",
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initData);
  const [resData, setResData] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState();

  const handleLoadingClose = () => setShowLoading(false);
  const handleModalClose = () => setShowModal(false);

  const handleInput = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleOkBtn = (e) => navigate("/");

  const handelSignUp = () => {
    setIsError(false);
    setShowLoading(true);
    axios
      .post("https://project-moview-api.vercel.app/users", userData)
      .then((res) => {
        console.log("회원가입 성공:", res.data);
        setResData(res.data);
      })
      .catch((error) => {
        const { message } = error.response.data;
        console.error(error);
        console.error("회원가입 실패:", message);
        setIsError(true);
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  useEffect(() => {
    if (!resData) return;
    const { _id, user_id } = resData;
    localStorage.setItem("userId", user_id);
    localStorage.setItem("userNum", _id);
    setShowModal(true);
  }, [resData]);

  return (
    <>
      <div className="sign-up-page">
        <div className="form-area">
          <Form onChange={handleInput}>
            <Form.Group className="mb-3" controlId="user_id">
              <Form.Label>아이디</Form.Label>
              <Form.Control type="text" placeholder="아이디 입력" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>사용자 이름</Form.Label>
              <Form.Control type="text" placeholder="사용자 이름 입력" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" placeholder="이메일 입력" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="비밀번호 입력" />
            </Form.Group>
            {isError && <p>이미 존재하는 사용자입니다.</p>}
            <Button variant="primary" className="w-100" onClick={handelSignUp}>
              회원가입
            </Button>
          </Form>
        </div>
      </div>
      {resData && (
        <CheckResModal
          showModal={showModal}
          handleModalClose={handleModalClose}
          resData={resData}
          handleOkBtn={handleOkBtn}
        />
      )}
      <LoadingModal show={showLoading} handleClose={handleLoadingClose} />
    </>
  );
};

export default SignUpPage;
