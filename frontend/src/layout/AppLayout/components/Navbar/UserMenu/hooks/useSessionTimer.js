import { useState, useEffect } from "react";

export const useSessionTimer = (expirationTime, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!expirationTime) { setTimeLeft(null); return; }

    const tick = () => {
      const remaining = Math.max(0, expirationTime - Date.now());
      setTimeLeft(remaining);

      // 만료 시간이 0이 되면 자동 로그아웃
      if (remaining === 0) {
        onExpire();
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expirationTime]);

  return { timeLeft };
};
