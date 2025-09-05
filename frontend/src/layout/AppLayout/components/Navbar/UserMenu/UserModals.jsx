import React from 'react';
import ConfirmModal from 'common/ConfirmModal/ConfirmModal';
import CustomToast from 'common/CustomToast/CustomToast';

const UserModals = ({ userState, modals, toast }) => {
  if (!userState) return null;

  return (
    <>
      <ConfirmModal {...modals.extendSession} />
      <ConfirmModal {...modals.logout} />
      <ConfirmModal {...modals.deleteAccount} />
      <CustomToast {...toast} />
    </>
  );
};

export default UserModals;
