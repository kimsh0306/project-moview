import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ImNotification } from "react-icons/im";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import "./LoginPage.style.css";

const initData = {
  user_id: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(initData);
  const [errorData, setErrorData] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    };
  }, []);

  const handleInput = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorData();
    if (userData.user_id === "") {
      inputRefs.current[0].focus();
      setErrorData("아이디를 입력해주세요.");
      return;
    };
    if (userData.password === "") {
      inputRefs.current[1].focus();
      setErrorData("비밀번호를 입력해주세요.");
      return;
    };
    setShowLoading(true);
    axios
      .post("https://project-moview-api.vercel.app/users/login", userData)
      .then((res) => {
        console.log("로그인 성공:", res.data);
        const { _id, user_id, my_lists } = res.data;
        localStorage.setItem("userId", user_id);
        localStorage.setItem("userNum", _id);
        dispatch({
          type: "LOGIN",
          payload: { myMovies: my_lists.movies },
        });
        navigate("/");
      })
      .catch((error) => {
        const { message } = error.response.data;
        console.error(error);
        console.log("로그인 실패:", message);
        setErrorData(message);
      })
      .finally(() => {
        setShowLoading(false);
      });
  };

  const handleLoadingClose = () => setShowLoading(false);

  return (
    <>
      <div className="login-page">
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
          <Form onChange={handleInput} onSubmit={handleLogin}>
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
            {errorData && <p><ImNotification className="me-2"/>{errorData}</p>}
            <Button className="w-100" type="submit" variant="primary">
              로그인
            </Button>
          </Form>
        </div>
        <div
          className="mt-2 text-center"
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          회원가입
        </div>
      </div>
      <LoadingModal show={showLoading} handleClose={handleLoadingClose} />
    </>
  );
};

export default LoginPage;
