import { useEffect, useState, useCallback } from "react";

const useScrollTo = () => {
  const [isShowTopBtn, setIsShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShowTopBtn(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTopBtnClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return { isShowTopBtn, handleTopBtnClick };
};

export default useScrollTo;
