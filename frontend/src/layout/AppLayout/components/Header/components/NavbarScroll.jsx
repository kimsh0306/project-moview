import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import SwitchControl from "common/SwitchControl/SwitchControl";
import UserMenu from "./UserMenu/UserMenu";
import "./NavbarScroll.css";
import SearchBar from "./SearchBar/SearchBar";

const NavbarScroll = ({ brandName, menuItems, theme, handleThemeChange }) => {
  console.log("!! NavbarScroll 리렌더")
  const location = useLocation();

  return (
    <Navbar
      bg={theme === "dark" ? theme : "white"}
      data-bs-theme={theme}
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
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
          >
            {menuItems.map((menu) => {
              return (
                <Nav.Link as={Link} to={menu.pathName} key={menu.name} >
                  {menu.name}
                </Nav.Link>
              );
            })}
          </Nav>
        <SearchBar theme={theme}/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarScroll;
