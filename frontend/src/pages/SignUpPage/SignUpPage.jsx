import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navbar } from "react-bootstrap";
import { ImNotification } from "react-icons/im";
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
  const [errorData, setErrorData] = useState();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInput = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handelSignUp = () => {
    setErrorData();
    if (userData.user_id === "") {
      inputRefs.current[0].focus();
      setErrorData("아이디를 입력해주세요.");
      return;
    };
    if (userData.name === "") {
      inputRefs.current[1].focus();
      setErrorData("이름을 입력해주세요.");
      return;
    };
    if (userData.email === "") {
      inputRefs.current[2].focus();
      setErrorData("이메일을 입력해주세요.");
      return;
    };
    if (userData.password === "") {
      inputRefs.current[3].focus();
      setErrorData("비밀번호를 입력해주세요.");
      return;
    };
    setShowLoading(true);
    axios
      .post("https://project-moview-api.vercel.app/users", userData)
      .then((res) => {
        console.log("회원가입 성공:", res.data);
        const { _id, user_id } = res.data;
        localStorage.setItem("userId", user_id);
        localStorage.setItem("userNum", _id);
        setResData(res.data);
        setShowModal(true);
      })
      .catch((error) => {
        const { message } = error.response.data;
        console.error(error);
        console.error("회원가입 실패:", message);
        setErrorData(message);
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  const handleLoadingClose = () => setShowLoading(false);
  const handleModalClose = () => setShowModal(false);
  const handleOkBtn = (e) => navigate("/");

  return (
    <>
      <div className="sign-up-page">
        <div>
          <Navbar>
            <Navbar.Brand
              className="fs-2"
              onClick={() => {
                navigate("/");
              }}
            >
              <strong>Moview</strong>
            </Navbar.Brand>
          </Navbar>
        </div>
        <div className="form-area">
          <Form onChange={handleInput}>
            <Form.Group className="mb-3" controlId="user_id">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                ref={(el) => (inputRefs.current[0] = el)}
                type="text"
                placeholder="아이디 입력"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>사용자 이름</Form.Label>
              <Form.Control
                ref={(el) => (inputRefs.current[1] = el)}
                type="text"
                placeholder="사용자 이름 입력"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                ref={(el) => (inputRefs.current[2] = el)}
                type="email"
                placeholder="이메일 입력"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                ref={(el) => (inputRefs.current[3] = el)}
                type="password"
                placeholder="비밀번호 입력"
              />
            </Form.Group>
            {errorData && (
              <p>
                <ImNotification className="me-2" />
                {errorData}
              </p>
            )}
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
