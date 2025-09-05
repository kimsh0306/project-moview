import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const BSNavbarNav = ({ menus, ...props }) => {
  const location = useLocation();
  return (
    <Nav className="me-auto" activeKey={location.pathname} {...props}>
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
