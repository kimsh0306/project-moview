import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BSNavbarBrand = ({ children, to, ...props }) => (
  <Navbar.Brand as={Link} to={to} {...props}>
    {children}
  </Navbar.Brand>
);

export default BSNavbarBrand;
