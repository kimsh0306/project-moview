import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import BSNavbarBrand from './BSNavbarBrand';
import BSNavbarToggle from './BSNavbarToggle';
import BSNavbarCollapse from './BSNavbarCollapse';
import BSNavbarNav from './BSNavbarNav';

const BSNavbar = ({ 
  bg = "white",
  theme = "light", 
  expand = "lg",
  children,
  ...props 
}) => {
  return (
    <header>
      <Navbar 
        bg={bg} 
        data-bs-theme={theme} 
        expand={expand}
        {...props}
      >
        <Container fluid>
          {children}
        </Container>
      </Navbar>
    </header>
  );
};

// 하위 컴포넌트들을 속성으로 연결
BSNavbar.Brand = BSNavbarBrand;
BSNavbar.Toggle = BSNavbarToggle;
BSNavbar.Collapse = BSNavbarCollapse;
BSNavbar.Nav = BSNavbarNav;

export default BSNavbar;
