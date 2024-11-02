import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import MyListPage from '../pages/MyListPage/MyListPage';
import ConfirmModal from '../common/ConfirmModal/ConfirmModal';

const PrivateRoute = () => {
  const [showConfirmModal, setShowConfirmModal] = useState();

  const userState = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (userState) return;
    setShowConfirmModal("로그인이 필요한 서비스입니다. 로그인하시겠습니까?")
  }, [])

  useEffect(() => {
    if (showConfirmModal === "홈으로...") navigate("/")
  }, [showConfirmModal])

  const handleConfirm = () => navigate("/login")
  const handleClose = () => setShowConfirmModal("홈으로...")

  if (!userState) {
    return <ConfirmModal show={showConfirmModal} handleClose={handleClose} handleConfirm={handleConfirm} />
  }

  return (
    <>
      <MyListPage />
      <ConfirmModal
        show={showConfirmModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    </>
  )
}

export default PrivateRoute
