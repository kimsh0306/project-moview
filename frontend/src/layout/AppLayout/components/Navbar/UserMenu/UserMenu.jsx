import React from "react";
import { useUserMenu } from "./useUserMenu";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";
import UserModals from "./UserModals";
import "./UserMenu.style.scss";

const UserMenu = () => {
  const hookData = useUserMenu();

  return (
    <div  className="user_menu d-flex align-items-center">
      {hookData.userState ? (
        <LoggedInMenu timer={hookData.timer} popover={hookData.popover} />
      ) : (
        <LoggedOutMenu loginButtonProps={hookData.loginButtonProps} />
      )}
      <UserModals
        userState={hookData.userState}
        modals={hookData.modals}
        toast={hookData.toast}
      />
    </div>
  );
};

export default UserMenu;
