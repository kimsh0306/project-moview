import React from 'react';
import { Navbar } from 'react-bootstrap';

const BSNavbarCollapse = ({ children, ...props }) => (
  <Navbar.Collapse {...props}>
    {children}
  </Navbar.Collapse>
);

export default BSNavbarCollapse;
