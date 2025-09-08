import React from "react";
import { OverlayTrigger } from "react-bootstrap";

const BSOverlayTrigger = ({
  trigger = "click",
  placement = "bottom",
  overlay,
  children,
  ...rest
}) => {
  return (
    <OverlayTrigger
      trigger={trigger}
      placement={placement}
      overlay={overlay}
      rootClose
      {...rest}
    >
      {children}
    </OverlayTrigger>
  );
};

export default BSOverlayTrigger;
