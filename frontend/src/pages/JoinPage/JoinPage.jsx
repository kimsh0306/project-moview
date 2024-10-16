import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Button, Form } from "react-bootstrap";
import { ImNotification } from "react-icons/im";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import SuccessJoinModal from "./components/SuccessJoinModal/SuccessJoinModal";
import { authenticateAction } from "../../redux/actions/authenticateAction";
import "./JoinPage.style.css";

const initData = {
  user_id: "",
  name: "",
  email: "",
  password: "",
};

const JoinPage = () => {
  const [joinPayload, setJoinPayload] = useState(initData);
  const [errorMessage, setErrorMessage] = useState();

  const { user, loading, error } = useSelector((state) => state.auth);

  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (!error) return;
    error.response
      ? setErrorMessage(error.response.data.message)
      : setErrorMessage(error.message);
  }, [error]);

  const handleInputChange = (e) => {
    setJoinPayload((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setErrorMessage();

    if (joinPayload.user_id === "") {
      inputRefs.current[0].focus();
      setErrorMessage("아이디를 입력해주세요.");
      return;
    }
    if (joinPayload.name === "") {
      inputRefs.current[1].focus();
      setErrorMessage("이름을 입력해주세요.");
      return;
    }
    if (joinPayload.email === "") {
      inputRefs.current[2].focus();
      setErrorMessage("이메일을 입력해주세요.");
      return;
    }
    if (joinPayload.password === "") {
      inputRefs.current[3].focus();
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    dispatch(authenticateAction.join(joinPayload));
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
          {errorMessage && (
            <p className="error-text">
              <ImNotification className="me-2" />
              {errorMessage}
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
      <SuccessJoinModal show={user} user={user} />
      <LoadingModal show={loading} />
    </>
  );
};

export default JoinPage;
