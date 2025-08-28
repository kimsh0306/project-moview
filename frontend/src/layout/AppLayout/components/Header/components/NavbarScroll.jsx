import React, { useState } from "react";
import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import SwitchControl from "common/SwitchControl/SwitchControl";
import UserMenu from "./UserMenu/UserMenu";
import "./NavbarScroll.css";

const NavbarScroll = ({ brandName, menuItems, theme, handleThemeChange }) => {
  const [keyword, setKeyword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (eventKey) => navigate(eventKey);

  const handleKeywordSubmit = (event) => {
    event.preventDefault();
    if (!keyword) {
      alert("검색할 영화를 입력해주세요.");
      return;
    }
    navigate(`/search?q=${keyword}`);
    setKeyword("");
  };

  return (
    <Navbar
      bg={theme === "dark" ? theme : "white"}
      data-bs-theme={theme}
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/")}>
          <strong>{brandName}</strong>
        </Navbar.Brand>
        {/* 추가한 설정들 - 1.로그인 설정(예정) 2.다크 테마 설정 */}
        <div className="added-items d-flex align-items-center">
          <UserMenu />
          <SwitchControl
            label="다크 테마"
            onChange={handleThemeChange}
            checked={theme === "dark"}
          />
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll d">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
            activeKey={location.pathname}
            onSelect={handleMenuClick}
          >
            {menuItems.map((menu) => {
              return (
                <Nav.Link eventKey={menu.pathName} key={menu.name}>
                  {menu.name}
                </Nav.Link>
              );
            })}
          </Nav>
          <Form className="d-flex" onSubmit={handleKeywordSubmit}>
            <Form.Control
              className="me-1"
              type="text"
              placeholder="제목"
              aria-label="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              data-bs-theme={theme}
              size="sm"
            />
            <Button type="submit" size="sm">
              검색
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarScroll;
