import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Button, Form } from "react-bootstrap";
import { ImNotification } from "react-icons/im";
import { authenticateAction } from "../../redux/actions/authenticateAction";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import "./LoginPage.style.css";

const LoginPage = () => {
  const [loginPayload, setLoginPayload] = useState();
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
    if (!user) return;
    console.log("user:", user);
    navigate("/");
  }, [user]);

  useEffect(() => {
    if (!error) return;
    error.response
      ? setErrorMessage(error.response.data.message)
      : setErrorMessage(error.message);
  }, [error]);

  const handleInputChange = (e) => {
    setLoginPayload((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage();

    if (loginPayload.user_id === "") {
      inputRefs.current[0].focus();
      setErrorMessage("아이디를 입력해주세요.");
      return;
    }
    if (loginPayload.password === "") {
      inputRefs.current[1].focus();
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    dispatch(authenticateAction.login(loginPayload));
  };

  return (
    <>
      <div className="login-page">
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
          onSubmit={handleLoginSubmit}
        >
          <Form.Group className="mb-3" controlId="user_id">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              ref={(el) => (inputRefs.current[0] = el)}
              type="text"
              placeholder="아이디 입력"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              ref={(el) => (inputRefs.current[1] = el)}
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
          <Button className="w-100" type="submit" variant="primary">
            로그인
          </Button>
        </Form>
        <div
          className="mt-2 text-center"
          onClick={() => {
            navigate("/join");
          }}
        >
          회원가입
        </div>
      </div>
      <LoadingModal show={loading} />
    </>
  );
};

export default LoginPage;
