import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Button, Form } from "react-bootstrap";
import { ImNotification } from "react-icons/im";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import SuccessJoinModal from "./components/SuccessJoinModal/SuccessJoinModal";
import { authenticateAction } from "../../redux/actions/authenticateAction";
import "./JoinPage.style.css";

const initPayload = {
  user_id: null,
  password: null,
  name: null,
  email: null,
};
const initErrorMessage = {
  server: null,
  user_id: null,
  password: null,
  name: null,
  email: null,
};

const JoinPage = () => {
  const [joinPayload, setJoinPayload] = useState(initPayload);
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
    if (!error?.join) return;
    // 서버에서 응답받은 에러 저장
    setErrorMessage((prev) => ({ ...prev, server: error.join }));
  }, [error]);

  useEffect(() => {
    // payload 유효성 검사, 에러 발생 시 저장
    Object.keys(joinPayload).map((item) => {
      if (joinPayload[item]) {
        const itemError = validateItem(item, joinPayload[item]);
        itemError
          ? setErrorMessage((prev) => ({ ...prev, [item]: itemError }))
          : setErrorMessage((prev) => ({ ...prev, [item]: null }));
      }
    });
  }, [joinPayload]);

  const validateItem = (item, itemValue) => {
    switch (item) {
      case "user_id":
        if (
          itemValue.length < 4 ||
          !/^[a-z0-9]+$/.test(itemValue) ||
          !/[a-z]/.test(itemValue)
        ) {
          console.log("!!");
          return "4자 이상, 영문 소문자와 숫자만 사용해 주세요.";
        }
        return null;

      case "password":
        if (
          itemValue.length < 6 ||
          !/[a-z]/.test(itemValue) ||
          !/[0-9]/.test(itemValue) ||
          !/[!@#$%^&*]/.test(itemValue)
        ) {
          return "6자 이상, 영문 소문자, 숫자, 특수문자를 사용해 주세요.";
        }
        return null;

      case "name":
        if (itemValue.length > 10) {
          return "10자 이하로 입력해 주세요.";
        }
        return null;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(itemValue)) {
          return "유효한 이메일 주소를 입력해 주세요.";
        }
        return null;

      default:
        return null;
    }
  };

  const handleInputChange = (e) => {
    setJoinPayload((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setErrorMessage((prev) => ({ ...prev, server: null }));

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
          {Object.keys(joinPayload).map((item, idx) => {
            return (
              <Form.Group
                className="mb-3"
                controlId={item}
                key={`${item}-${idx}`}
              >
                <Form.Label>
                  {(item === "user_id" && "아이디") ||
                    (item === "password" && "패스워드") ||
                    (item === "name" && "이름") ||
                    (item === "email" && "이메일")}
                </Form.Label>
                <Form.Control
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type={item === "password" ? "password" : "text"}
                  placeholder={
                    (item === "user_id" && "아이디 입력") ||
                    (item === "password" && "패스워드 입력") ||
                    (item === "name" && "이름 입력") ||
                    (item === "email" && "이메일 입력")
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
            variant="primary"
            type="submit"
            className="w-100"
            disabled={
              !joinPayload.user_id ||
              !joinPayload.password ||
              !joinPayload.name ||
              !joinPayload.email ||
              errorMessage.user_id ||
              errorMessage.password ||
              errorMessage.name ||
              errorMessage.email
            }
          >
            회원가입
          </Button>
        </Form>
        <div
          className="mt-2 text-center pointer"
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
