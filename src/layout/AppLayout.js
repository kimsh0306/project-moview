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

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
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

  return (
    <>
      <Navbar bg="black" data-bs-theme="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand onClick={() => { navigate('/') }}>
            MovieUn
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '6.25rem' }}
              navbarScroll
            >
              <Nav.Link onClick={() => { navigate('/movies') }}>영화</Nav.Link>
              <Nav.Link onClick={() => { navigate('/my-list') }}>내가 찜한 영화</Nav.Link>
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
        <Form.Group controlId="theme-switch" className="fom-group">
          <Form.Label>{theme === "dark" ? "밝은 테마" : "어두운 테마"}</Form.Label>
          <Form.Check
            type="switch"
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
        </Form.Group>
      </Navbar>
      <Outlet />
    </>
  )
}

export default AppLayout
