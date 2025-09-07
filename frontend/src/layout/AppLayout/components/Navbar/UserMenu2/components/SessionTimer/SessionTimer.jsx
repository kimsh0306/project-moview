import React from "react";
import { Button } from "react-bootstrap";
import { formatTime } from "utils/formatTime";

const SessionTimer = ({ timeLeft, showExtendButton, onExtendSession }) => {
  return (
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
      {showExtendButton && (
        <Button
          className="extend-token-btn ms-2"
          variant="outline-primary"
          size="sm"
          onClick={onExtendSession}
        >
          연장
        </Button>
      )}
    </div>
  );
};

export default SessionTimer;
