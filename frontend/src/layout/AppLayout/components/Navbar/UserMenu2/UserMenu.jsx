import React from "react";
import { useSelector } from "react-redux";
import { useSessionTimer } from "./hooks/useSessionTimer";
import { useUserActions } from "./hooks/useUserActions";
import { useModals } from "./hooks/useModals";
import SessionTimer from "./components/SessionTimer/SessionTimer";
import UserAvatar from "./components/UserAvatar/UserAvatar";
import LoginButton from "./components/LoginButton/LoginButton";
import UserModals from "./components/UserModals/UserModals";
import CustomToast from "common/CustomToast/CustomToast";
import "./UserMenu.style.scss";

const UserMenu = () => {
  const userState = useSelector((state) => state.auth.user);
  const { userId, exp: expirationTime } = userState || {};

  const {
    showAlertToast,
    setShowAlertToast,
    handleExtendSession,
    handleLogout,
    handleDeleteAccount,
  } = useUserActions();

  const { timeLeft, showExtendButton } = useSessionTimer(
    expirationTime,
    handleLogout
  );

  const {
    showExtendSessionModal,
    showLogoutModal,
    showDeleteAccountModal,
    closeExtendSessionModal,
    closeLogoutModal,
    closeDeleteAccountModal,
    openLogoutModal,
    openDeleteAccountModal,
  } = useModals(showExtendButton);

  const handleExtendSessionConfirm = async () => {
    await handleExtendSession();
    closeExtendSessionModal();
  };

  const handleLogoutConfirm = async () => {
    await handleLogout();
    closeLogoutModal();
  };

  const handleDeleteAccountConfirm = async () => {
    await handleDeleteAccount();
    closeDeleteAccountModal();
  };

  return (
    <>
      <div className="user-menu d-flex align-items-center">
        {userState ? (
          <>
            <SessionTimer
              timeLeft={timeLeft}
              showExtendButton={showExtendButton}
              onExtendSession={handleExtendSessionConfirm}
            />
            <UserAvatar
              userId={userId}
              onLogout={openLogoutModal}
              onDeleteAccount={openDeleteAccountModal}
            />
          </>
        ) : (
          <LoginButton/>
        )}
      </div>

      {userState && (
        <UserModals
          showExtendSessionModal={showExtendSessionModal}
          showLogoutModal={showLogoutModal}
          showDeleteAccountModal={showDeleteAccountModal}
          onCloseExtendSession={closeExtendSessionModal}
          onCloseLogout={closeLogoutModal}
          onCloseDeleteAccount={closeDeleteAccountModal}
          onConfirmExtendSession={handleExtendSessionConfirm}
          onConfirmLogout={handleLogoutConfirm}
          onConfirmDeleteAccount={handleDeleteAccountConfirm}
        />
      )}

      <CustomToast show={showAlertToast} setShow={setShowAlertToast} />
    </>
  );
};

export default UserMenu;
