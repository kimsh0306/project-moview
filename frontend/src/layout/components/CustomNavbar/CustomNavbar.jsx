import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch";
import UserMenu from "./components/UserMenu/UserMenu";
import "./CustomNavbar.style.css";

const CustomNavbar = () => {
  const [keyword, setKeyword] = useState("");
  
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    if (!keyword) {
      alert("검색할 영화를 입력해주세요.");
      return;
    };
    navigate(`/search?q=${keyword}`);
    setKeyword("");
  };

  const handelMyList = () => {
    navigate("/my-list");
  };

  return (
    <Navbar bg="black" data-bs-theme="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand onClick={() => { navigate('/') }}>
        <strong>Moview</strong>
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
        <Form className="form d-flex" onSubmit={searchByKeyword}>
          <Form.Control
            type="search"
            placeholder="제목"
            aria-label="Search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            size="sm"
            data-bs-theme="dark"
          />
          <Button
            type="submit"
            size="sm"
          >
            검색
          </Button>
        </Form>
      </Navbar.Collapse>
    </Container>
    <div className='added-item'>
      <UserMenu />
      <ThemeSwitch />
    </div>
  </Navbar>
  )
}

export default CustomNavbar
