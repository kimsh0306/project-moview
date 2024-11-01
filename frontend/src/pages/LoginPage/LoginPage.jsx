import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Button, Form } from "react-bootstrap";
import { ImNotification } from "react-icons/im";
import { authenticateAction } from "../../redux/actions/authenticateAction";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import "./LoginPage.style.css";

const initPayload = {
  user_id: null,
  password: null,
};
const initErrorMessage = {
  server: null,
  user_id: null,
  password: null,
};

const LoginPage = () => {
  const [loginPayload, setLoginPayload] = useState(initPayload);
  const [errorMessage, setErrorMessage] = useState(initErrorMessage);

  const { user, loading, error } = useSelector((state) => state.auth);

  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticateAction.resetError());

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
    if (!error?.login) return;
    // 서버에서 응답받은 에러 저장
    setErrorMessage((prev) => ({ ...prev, server: error.login }));
  }, [error]);

  useEffect(() => {
    // payload 유효성 검사, 에러 발생 시 저장
    Object.keys(loginPayload).map((item) => {
      if (loginPayload[item]) {
        const itemError = validateItem(item, loginPayload[item]);
        itemError
          ? setErrorMessage((prev) => ({ ...prev, [item]: itemError }))
          : setErrorMessage((prev) => ({ ...prev, [item]: null }));
      }
    });
  }, [loginPayload]);

  const validateItem = (item, itemValue) => {
    switch (item) {
      case "user_id":
        if (
          itemValue.length < 4 ||
          !/^[a-z0-9]+$/.test(itemValue) ||
          !/[a-z]/.test(itemValue)
        ) {
          console.log("!!");
          return "유효 아이디: 4자 이상, 영문 소문자와 숫자";
        }
        return null;

      case "password":
        if (
          itemValue.length < 6 ||
          !/[a-z]/.test(itemValue) ||
          !/[0-9]/.test(itemValue) ||
          !/[!@#$%^&*]/.test(itemValue)
        ) {
          return "유효 비밀번호: 6자 이상, 영문 소문자, 숫자, 특수문자 포함";
        }
        return null;

      default:
        return null;
    }
  };

  const handleInputChange = (e) => {
    setLoginPayload((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage((prev) => ({ ...prev, server: null }));

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
          {Object.keys(loginPayload).map((item, idx) => {
            return (
              <Form.Group className="mb-3" controlId={item}>
                <Form.Label>
                  {(item === "user_id" && "아이디") ||
                    (item === "password" && "패스워드")}
                </Form.Label>
                <Form.Control
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type={item === "password" ? "password" : "text"}
                  placeholder={
                    (item === "user_id" && "아이디 입력") ||
                    (item === "password" && "패스워드 입력")
                  }
                />
                {errorMessage[item] && (
                  <Form.Text className="error-text">
                    {errorMessage[item]}
                  </Form.Text>
                )}
              </Form.Group>
            );
          })}
          {errorMessage.server && (
            <p className="error-text">
              <ImNotification className="me-2" />
              {errorMessage.server}
            </p>
          )}
          <Button
            className="w-100"
            type="submit"
            variant="primary"
            disabled={
              !loginPayload.user_id ||
              !loginPayload.password ||
              errorMessage.user_id ||
              errorMessage.password
            }
          >
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
