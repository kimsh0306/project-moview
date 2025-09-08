import React from "react";
import { Link } from "react-router-dom";
import "./LoginButton.style.scss";

const LoginButton = () => {
  return (
    <Link className="login-btn" to="/login">
      로그인
    </Link>
  );
};

export default LoginButton;
