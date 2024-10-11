import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar
} from 'react-bootstrap';
import "./AppLayout.style.css";

const AppLayout = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [keyword, setKeyword] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userNum = localStorage.getItem('userNum');
    if (userId && userNum) {
      setUserData({ user_id: userId, _id: userNum });
    };

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

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 스크롤 기능
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const searchByKeyword = (event) => {
    event.preventDefault();
    if (!keyword) {
      alert("검색할 영화를 입력해주세요.");
      return;
    };
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  const handleLogout = () => {
    setUserData();
    localStorage.removeItem('userId')
    localStorage.removeItem('userNum')
  };

  const handelMyList = () => {
    if (!userData) {
      navigate("/login");
      return;
    };
    navigate("/my-list");
  };

  return (
    <>
      <Navbar bg="black" data-bs-theme="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand onClick={() => { navigate('/') }}>
            Moview
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '6.25rem' }}
              navbarScroll
            >
              <Nav.Link onClick={() => { navigate('/movies') }}>영화</Nav.Link>
              <Nav.Link onClick={handelMyList}>내가 찜한 영화</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="제목"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                data-bs-theme="dark"
              />
              <Button
                type="submit"
              >
                검색
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
        <div className='added-item'>
          <div className='d-flex align-items-center me-2'>
            {userData
              ?
              <>
                <button className='login-btn' onClick={handleLogout}>{userData.user_id}</button>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid orange",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}>
                  <img
                    style={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                    alt="user image"
                  />
                </div>
              </>
              :
              <>
                <button className='login-btn' onClick={() => { navigate('/login') }}>로그인</button>
              </>
            }
          </div>
          <Form.Group controlId="theme-switch" className="fom-group">
            <Form.Label>{theme === "dark" ? "밝은 테마" : "어두운 테마"}</Form.Label>
            <Form.Check
              type="switch"
              onChange={toggleTheme}
              checked={theme === 'dark'}
            />
          </Form.Group>

        </div>
      </Navbar>
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
