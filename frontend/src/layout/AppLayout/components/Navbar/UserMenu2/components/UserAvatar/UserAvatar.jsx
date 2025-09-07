import React from "react";
import { OverlayTrigger, Popover, Image } from "react-bootstrap";

const UserAvatar = ({ userId, onLogout, onDeleteAccount }) => {
  const popover = (
    <Popover>
      <Popover.Header as="h3">{userId || "Guest"}</Popover.Header>
      <Popover.Body>
        <div className="text-center mt-1">
          <span onClick={onLogout} className="pointer">
            로그아웃
          </span>
          <span className="mx-1">|</span>
          <span onClick={onDeleteAccount} className="pointer">
            회원탈퇴
          </span>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom"
      overlay={popover}
    >
      <Image
        width={30}
        height={30}
        src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
        alt="user"
        roundedCircle
      />
    </OverlayTrigger>
  );
};

export default UserAvatar;
