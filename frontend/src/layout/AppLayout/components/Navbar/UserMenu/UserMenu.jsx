import React from "react";
import { useSelector } from "react-redux";
import SessionTimer from "./components/SessionTimer/SessionTimer";
import AccountMenu from "./components/AccountMenu/AccountMenu";
import LoginButton from "./components/LoginButton/LoginButton";
import "./UserMenu.style.scss";

const LoginUserBlock = ({ userState }) => {
  return (
    <>
      <SessionTimer expirationTime={userState.exp} />
      <AccountMenu userId={userState.userId} />
    </>
  );
};

const UserMenu = () => {
  const userState = useSelector((state) => state.auth.user);

  return (
    <div className="user-menu d-flex align-items-center">
      {userState ? <LoginUserBlock userState={userState} /> : <LoginButton />}
    </div>
  );
};

export default UserMenu;
