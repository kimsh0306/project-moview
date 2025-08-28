import React from 'react';
import { Button } from 'react-bootstrap';

const LoggedOutMenu = ({ loginButtonProps }) => {
  return (
    <Button className="login-btn" {...loginButtonProps}>
      로그인
    </Button>
  );
};

export default LoggedOutMenu;
