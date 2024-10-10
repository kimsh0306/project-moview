import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./LoginPage.style.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="form-area">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" placeholder="아이디 입력" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호 입력" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            로그인
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
