import React from "react";
import ConfirmModal from "common/ConfirmModal/ConfirmModal";

const UserModals = ({
  showExtendSessionModal,
  showLogoutModal,
  showDeleteAccountModal,
  onCloseExtendSession,
  onCloseLogout,
  onCloseDeleteAccount,
  onConfirmExtendSession,
  onConfirmLogout,
  onConfirmDeleteAccount,
}) => {
  return (
    <>
      <ConfirmModal
        show={showExtendSessionModal}
        handleClose={onCloseExtendSession}
        handleConfirm={onConfirmExtendSession}
      />
      <ConfirmModal
        show={showLogoutModal}
        handleClose={onCloseLogout}
        handleConfirm={onConfirmLogout}
      />
      <ConfirmModal
        show={showDeleteAccountModal}
        handleClose={onCloseDeleteAccount}
        handleConfirm={onConfirmDeleteAccount}
      />
    </>
  );
};

export default UserModals;
