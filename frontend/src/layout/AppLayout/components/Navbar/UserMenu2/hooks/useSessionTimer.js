import { useState, useEffect } from "react";

export const useSessionTimer = (expirationTime, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [showExtendButton, setShowExtendButton] = useState(false);

  useEffect(() => {
    if (!expirationTime) return;

    const updateRemainingTime = () => {
      const currentTime = Date.now();
      const remainingTime = Math.max(0, expirationTime - currentTime);
      setTimeLeft(remainingTime);

      // // 만료 시간이 10분 이하일 때 연장 버튼 표시
      if (remainingTime <= 60 * 10 * 1000 && remainingTime > 0) {
        setShowExtendButton(true);
      } else {
        setShowExtendButton(false);
      }

      // 만료 시간이 0이 되면 자동 로그아웃
      if (remainingTime === 0) {
        onExpire();
      }
    };

    updateRemainingTime();
    const intervalId = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [expirationTime, onExpire]);

  return { timeLeft, showExtendButton };
};
