import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateAction } from "store/actions/authenticateAction";

export const useUserActions = () => {
  const [showAlertToast, setShowAlertToast] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleExtendSession = async () => {
    try {
      await dispatch(authenticateAction.extendSession());
    } catch (error) {
      setShowAlertToast("세션 연장 실패");
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(authenticateAction.logout());
      setShowAlertToast("로그아웃 완료");
      navigate("/");
    } catch (error) {
      setShowAlertToast("로그아웃 실패");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(authenticateAction.deleteAccount());
      setShowAlertToast("회원탈퇴 완료");
      navigate("/");
    } catch (error) {
      setShowAlertToast("회원탈퇴 실패");
    }
  };

  return {
    showAlertToast,
    setShowAlertToast,
    handleExtendSession,
    handleLogout,
    handleDeleteAccount,
  };
};
