import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { authenticateAction } from "../../../../../redux/actions/authenticateAction";
import AlertModal from "../../../../../common/AlertModal/AlertModal";
import ConfirmModal from "../../../../../common/ConfirmModal/ConfirmModal";
import "./UserMenu.style.css";

const UserMenu = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [showExtendButton, setShowExtendButton] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(null);

  const userState = useSelector((state) => state.auth.user);
  const { userId, exp: expirationTime } = userState || {};

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userState) return;
    if (expirationTime) {
      const updateRemainingTime = () => {
        const currentTime = Date.now();
        const remainingTime = Math.max(0, expirationTime - currentTime);
        setTimeLeft(remainingTime);

        // 만료 시간이 10분 이하일 때 연장 버튼 표시
        if (remainingTime <= 60 * 10 * 1000 && remainingTime > 0) {
          setShowExtendButton(true);
        } else {
          setShowExtendButton(false);
        }

        // 만료 시간이 0이 되면 자동 로그아웃
        if (remainingTime === 0) {
          handleLogout();
        }
      };

      updateRemainingTime(); // 처음 실행 시 남은 시간 업데이트

      // 매초 남은 시간 업데이트
      const intervalId = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(intervalId);
    }
  }, [userState, expirationTime]);

  useEffect(() => {
    if (showExtendButton) {
      setShowConfirmModal("로그인 만료 10분 전입니다. 연장하시겠습니까?");
    }
  }, [showExtendButton]);

  // 시간 형식 변환
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleLogout = () => {
    if (showConfirmModal) setShowConfirmModal(null);
    dispatch(authenticateAction.logout());
    setShowAlertModal("로그아웃되었습니다");
    navigate("/");
  };

  // 세션 연장 함수
  const handleExtendSession = () => {
    dispatch(authenticateAction.extendSession());
    if (showConfirmModal) setShowConfirmModal(null);
  };

  const handleConfirmClose = () =>  setShowConfirmModal(null);
  const handleAlertClose = () =>  setShowAlertModal(null);

  return (
    <>
      <div className="user_menu d-flex align-items-center me-3">
        {userState ? (
          <>
            <div className="exp-time d-flex align-items-center me-2">
              <span
                style={{
                  width: "61px",
                  textAlign: "end",
                }}
              >
                인증 만료
              </span>
              <span
                style={{
                  width: "43px",
                  textAlign: "end",
                }}
              >
                <strong>{formatTime(timeLeft)}</strong>
              </span>
              {showExtendButton ? (
                <Button
                  className="extend-token-btn ms-2"
                  variant="outline-primary"
                  size="sm"
                  onClick={handleExtendSession}
                >
                  연장
                </Button>
              ) : null}
            </div>
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={
                <Popover data-bs-theme="dark" style={{ color: "white" }}>
                  <Popover.Header as="h3">{userId || "Guest"}</Popover.Header>
                  <Popover.Body>
                    <Button
                      onClick={handleLogout}
                      size="sm"
                      variant="outline-primary"
                    >
                      로그아웃
                    </Button>
                  </Popover.Body>
                </Popover>
              }
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid orange",
                  borderRadius: "50%",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                  alt="user"
                />
              </div>
            </OverlayTrigger>
          </>
        ) : (
          <button
            className="login-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
        )}
      </div>
      <ConfirmModal
        show={showConfirmModal}
        handleClose={handleConfirmClose}
        handleConfirm={handleExtendSession}
      />
      <AlertModal show={showAlertModal} handleClose={handleAlertClose} />
    </>
  );
};

export default UserMenu;
