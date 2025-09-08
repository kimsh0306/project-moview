import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const BSNavbarNav = ({ className, menus, ...rest }) => {
  const location = useLocation();
  return (
    <Nav className={`${className} me-auto my-2 my-lg-0`} activeKey={location.pathname} navbarScroll {...rest}>
      {menus.map((menu) => (
        <Nav.Link
          as={Link}
          to={menu.pathname}
          key={menu.name}
          eventKey={menu.pathname}
        >
          {menu.name}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default BSNavbarNav;
