import { useState, useEffect } from "react";

export const useModals = (showExtendButton) => {
  const [showExtendSessionModal, setShowExtendSessionModal] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(null);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(null);

  useEffect(() => {
    if (showExtendButton) {
      setShowExtendSessionModal("로그인 만료 10분 전입니다. 연장하시겠습니까?");
    }
  }, [showExtendButton]);

  const closeExtendSessionModal = () => setShowExtendSessionModal(null);
  const closeLogoutModal = () => setShowLogoutModal(null);
  const closeDeleteAccountModal = () => setShowDeleteAccountModal(null);

  const openLogoutModal = () => setShowLogoutModal("로그아웃하시겠습니까?");
  const openDeleteAccountModal = () => setShowDeleteAccountModal("회원탈퇴하시겠습니까?");

  return {
    showExtendSessionModal,
    showLogoutModal,
    showDeleteAccountModal,
    closeExtendSessionModal,
    closeLogoutModal,
    closeDeleteAccountModal,
    openLogoutModal,
    openDeleteAccountModal,
  };
};
