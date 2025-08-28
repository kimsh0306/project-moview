import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// 절대 경로 인식 오류 때문에 상대 경로로 변경
import { authenticateAction } from "../../../../../../redux/actions/authenticateAction";
import { formatTime } from "utils/formatTime";

export const useUserMenu = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [showExtendButton, setShowExtendButton] = useState(false);
  const [showExtendSessionModal, setShowExtendSessionModal] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(null);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(null);
  const [showAlertToast, setShowAlertToast] = useState(null);

  const userState = useSelector((state) => state.auth.user);
  const { userId, exp: expirationTime } = userState || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(authenticateAction.logout());
      if (showLogoutModal) setShowLogoutModal(null);
      setShowAlertToast("로그아웃 완료");
      navigate("/");
    } catch (error) {
      setShowAlertToast("로그아웃 실패");
    }
  }, [dispatch, navigate, showLogoutModal]);

  useEffect(() => {
    if (!userState || !expirationTime) return;

    const updateRemainingTime = () => {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, expirationTime - currentTime);
      setTimeLeft(remainingTime);

      if (remainingTime <= 60 * 10 * 1000 && remainingTime > 0) {
        setShowExtendButton(true);
      } else {
        setShowExtendButton(false);
      }

      if (remainingTime === 0) {
        handleLogout();
      }
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState, expirationTime]);

  useEffect(() => {
    if (showExtendButton) {
      setShowExtendSessionModal("로그인 만료 10분 전입니다. 연장하시겠습니까?");
    }
  }, [showExtendButton]);

  const handleExtendSession = () => {
    dispatch(authenticateAction.extendSession());
    if (showExtendSessionModal) setShowExtendSessionModal(null);
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(authenticateAction.deleteAccount());
      if (showDeleteAccountModal) setShowDeleteAccountModal(null);
      setShowAlertToast("회원탈퇴 완료");
      navigate("/");
    } catch (error) {
      setShowAlertToast("회원탈퇴 실패");
    }
  };

  return {
    userState,
    timer: {
      formattedTime: formatTime(timeLeft),
      showExtendButton,
      onExtend: handleExtendSession,
    },
    popover: {
      userId,
      onLogoutClick: () => setShowLogoutModal("로그아웃하시겠습니까?"),
      onDeleteAccountClick: () => setShowDeleteAccountModal("회원탈퇴하시겠습니까?"),
    },
    loginButtonProps: {
      onClick: () => navigate("/login"),
    },
    modals: {
      extendSession: {
        show: showExtendSessionModal,
        handleClose: () => setShowExtendSessionModal(null),
        handleConfirm: handleExtendSession,
      },
      logout: {
        show: showLogoutModal,
        handleClose: () => setShowLogoutModal(null),
        handleConfirm: handleLogout,
      },
      deleteAccount: {
        show: showDeleteAccountModal,
        handleClose: () => setShowDeleteAccountModal(null),
        handleConfirm: handleDeleteAccount,
      },
    },
    toast: {
      show: showAlertToast,
      setShow: setShowAlertToast,
    },
  };
};
