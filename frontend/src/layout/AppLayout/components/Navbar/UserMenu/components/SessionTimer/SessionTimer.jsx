import React from "react";
import { formatTime } from "utils/formatTime";
import { useAuthActions } from "hooks/auth/useAuthActions";
import { useSessionTimer } from "../../hooks/useSessionTimer";
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

const SessionTimer = ({ expirationTime, onExtendSession }) => {
  const { logout } = useAuthActions();
  const { timeLeft } = useSessionTimer(expirationTime, logout);

  // 파생값: ‘10분 이하’일 때만 버튼 노출
  const isShowExtendButton =  timeLeft != null && timeLeft > 0 && timeLeft <= 10 * 60 * 1000;

  return (
    <div className="session-timer d-flex align-items-center me-2">
      <TimerBlock timeLeft={timeLeft} />
      {isShowExtendButton && <ExtendSessionButton onClick={onExtendSession} />}
    </div>
  );
};

export default SessionTimer;
