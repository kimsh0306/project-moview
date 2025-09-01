import React from "react";
import { Button } from "react-bootstrap";
import useScrollTo from "hooks/utils/useScrollTo";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const { isShowTopBtn, handleTopBtnClick } = useScrollTo(600);

  if (!isShowTopBtn) return null;

  return (
    <Button
      className="scroll-to-top-btn"
      variant="primary"
      onClick={handleTopBtnClick}
      aria-label="맨 위로 이동"
    >
      Top
    </Button>
  );
};

export default ScrollToTop;
