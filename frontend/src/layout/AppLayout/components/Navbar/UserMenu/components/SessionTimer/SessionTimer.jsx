import React, { useState } from "react";
import { formatTime } from "utils/formatTime";
import { useAuthActions } from "hooks/auth/useAuthActions";
import { useSessionTimer } from "../../hooks/useSessionTimer";
import BSConfirmModal from "components/lib/BSConfirmModal/BSConfirmModal";
import { Button } from "react-bootstrap";
import "./SessionTimer.style.scss";

const TimerBlock = ({ timeLeft }) => {
  return (
    <div className="timer-block">
      <div className="timer-title">인증 만료</div>
      <div className="timer-time">
        <strong>{formatTime(timeLeft)}</strong>
      </div>
    </div>
  );
};

const ExtendSessionButton = ({ onClick }) => {
  return (
    <Button
      className="extend-btn ms-2"
      variant="outline-primary"
      size="sm"
      onClick={onClick}
    >
      연장
    </Button>
  );
};

const SessionTimer = ({ expirationTime }) => {
  const { logout, extendSession } = useAuthActions();
  const { timeLeft } = useSessionTimer(expirationTime, logout);

  const [isModalDismissed, setIsModalDismissed] = useState(false);

  // 파생값: ‘10분 이하’일 때만 버튼 노출
  const isShowExtendButton =
    timeLeft != null && timeLeft > 0 && timeLeft <= 60 * 60 * 1000;
  const shouldShowModal =
    timeLeft != null && timeLeft > 0 && timeLeft <= 59 * 60 * 1000;

  // 실제 모달 표시 여부 = 시간 조건 && 사용자가 닫지 않음
  const isOpenModal = shouldShowModal && !isModalDismissed;

  const handleModalHide = () => {
    setIsModalDismissed(true);
  };

  const handleExtendSession = () => {
    extendSession();
    setIsModalDismissed(true);
  };

  return (
    <>
      <div className="session-timer d-flex align-items-center me-2">
        <TimerBlock timeLeft={timeLeft} />
        {isShowExtendButton && <ExtendSessionButton onClick={extendSession} />}
      </div>
      <BSConfirmModal
        show={isOpenModal}
        onHide={handleModalHide}
        message="로그인을 연장하시겠습니까?"
        onClick={handleExtendSession}
      />
    </>
  );
};

export default SessionTimer;
