import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LoadingModal from "../../common/LoadingModal/LoadingModal";
import "./LoginPage.style.css";

const initData = {
  user_id: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(initData);
  const [errorData, setErrorData] = useState();
  const [resData, setResData] = useState();
  const [showLoading, setShowLoading] = useState(false);

  const handleLoadingClose = () => setShowLoading(false);

  const handleInput = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorData();
    if (userData.user_id === "" || userData.password === "") {
      setErrorData("필수 값이 입력되지 않았습니다.");
      return;
    };
    setShowLoading(true);
    axios
      .post("https://project-moview-api.vercel.app/users/login", userData)
      .then((res) => {
        console.log("로그인 성공:", res.data);
        setResData(res.data);
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

  useEffect(() => {
    if (!resData) return;
    const { _id, user_id } = resData;
    localStorage.setItem("userId", user_id);
    localStorage.setItem("userNum", _id);
    // 로컬스토리지 저장 후 리다이렉트
    navigate("/");
  }, [resData]);

  return (
    <>
      <div className="login-page">
        <div className="form-area">
          <Form onChange={handleInput} onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="user_id">
              <Form.Label>아이디</Form.Label>
              <Form.Control type="text" placeholder="아이디 입력" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="비밀번호 입력" />
            </Form.Group>
            {errorData && <p>{errorData}</p>}
            <Button className="w-100" type="submit" variant="primary">
              로그인
            </Button>
            <div
              className="w-100 mt-2 text-center"
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              회원가입
            </div>
          </Form>
        </div>
      </div>
      <LoadingModal show={showLoading} handleClose={handleLoadingClose} />
    </>
  );
};

export default LoginPage;
