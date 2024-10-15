import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Button, Form } from "react-bootstrap";
import { ImNotification } from "react-icons/im";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import SuccessJoinModal from "./components/SuccessJoinModal/SuccessJoinModal";
import "./JoinPage.style.css";

const initData = {
  user_id: "",
  name: "",
  email: "",
  password: "",
};

const JoinPage = () => {
  const [userData, setUserData] = useState(initData);
  const [resData, setResData] = useState();
  const [errorData, setErrorData] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inputRefs = useRef([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setErrorData();
    if (userData.user_id === "") {
      inputRefs.current[0].focus();
      setErrorData("아이디를 입력해주세요.");
      return;
    }
    if (userData.name === "") {
      inputRefs.current[1].focus();
      setErrorData("이름을 입력해주세요.");
      return;
    }
    if (userData.email === "") {
      inputRefs.current[2].focus();
      setErrorData("이메일을 입력해주세요.");
      return;
    }
    if (userData.password === "") {
      inputRefs.current[3].focus();
      setErrorData("비밀번호를 입력해주세요.");
      return;
    }
    setShowLoading(true);
    axios
      .post("https://project-moview-api.vercel.app/users", userData)
      .then((res) => {
        const { _id, user_id } = res.data;
        localStorage.setItem("userId", user_id);
        localStorage.setItem("userNum", _id);
        setResData(res.data);
        setShowSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setErrorData(error.response.data);
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  return (
    <>
      <div className="join-page">
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
        <Form
          className="form-area"
          onChange={handleInputChange}
          onSubmit={handleJoinSubmit}
        >
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
            <p className="error-text">
              <ImNotification className="me-2" />
              {errorData}
            </p>
          )}
          <Button variant="primary" type="submit" className="w-100">
            회원가입
          </Button>
        </Form>
        <div
          className="mt-2 text-center"
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </div>
      </div>
      <SuccessJoinModal
        show={showSuccess}
        resData={resData}
      />
      <LoadingModal show={showLoading} />
    </>
  );
};

export default JoinPage;
