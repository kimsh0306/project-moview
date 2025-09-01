import { useEffect, useState, useCallback } from "react";

const useScrollTo = (threshold = 600) => {
  const [isShowTopBtn, setIsShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShowTopBtn(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const handleTopBtnClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // 특정 위치로 스크롤하는 함수
  const scrollToPosition = useCallback((position) => {
    window.scrollTo({
      top: position,
      behavior: "smooth"
    });
  }, []);

  // 특정 요소로 스크롤하는 함수
  const scrollToElement = useCallback((elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, []);

  return { 
    isShowTopBtn, 
    handleTopBtnClick, 
    scrollToPosition, 
    scrollToElement 
  };
};

export default useScrollTo;
