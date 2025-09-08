import React from "react";
import { useSelector } from "react-redux";
import SessionTimer from "./components/SessionTimer/SessionTimer";
import AccountMenu from "./components/AccountMenu/AccountMenu";
import LoginButton from "./components/LoginButton/LoginButton";
import "./UserMenu.style.scss";

const UserMenu = () => {
  const userState = useSelector((state) => state.auth.user);
  const { userId, exp: expirationTime } = userState || {};

  const LoginUserBlock = () => {
    return (
      <>
        <SessionTimer expirationTime={expirationTime} />
        <AccountMenu userId={userId} />
      </>
    );
  };

  return (
    <div className="user-menu d-flex align-items-center">
      {userState ? <LoginUserBlock /> : <LoginButton />}
    </div>
  );
};

export default UserMenu;
