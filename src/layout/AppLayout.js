import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar
} from 'react-bootstrap';
import styles from "./AppLayout.module.css";

const AppLayout = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const searchByKeyword = (event) => {
    event.preventDefault();
    if(!keyword) {
      alert("검색할 영화를 입력해주세요.");
      return;
    };
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div>
      <Navbar bg="black" data-bs-theme="dark" expand="lg" className="bg-body-dark">
        <Container fluid>
          <Navbar.Brand className={styles["navbar-brand"]} onClick={() => {navigate('/')}}>
            <div className={styles["navbar-logo"]}>
              <img width={50} src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
              <Nav.Link onClick={() => {navigate('/movies')}}>movies</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="제목"
                className={styles["search-input"]}
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button className={styles["search-btn"]} type="submit" size="sm">검색</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default AppLayout
