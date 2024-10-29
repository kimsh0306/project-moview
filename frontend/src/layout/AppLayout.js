import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CustomNavbar from './components/CustomNavbar/CustomNavbar';

const AppLayout = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 600px 이상 내려갔을 때 버튼을 보여줌
      if (window.scrollY > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      };
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // 스크롤 기능
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <CustomNavbar />
      <Outlet />
      {showButton && (
        <Button
          onClick={scrollToTop}
          style={{
            width: "50px",
            height: "50px",
            padding: 0,
            borderRadius: "50%",
            position: "fixed",
            bottom: "20px",
            right: "20px",
          }}
        >
          Top
        </Button>
      )}
    </>
  )
}

export default AppLayout
