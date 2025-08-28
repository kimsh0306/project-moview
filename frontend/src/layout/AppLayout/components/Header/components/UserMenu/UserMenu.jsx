import React from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import ConfirmModal from "common/ConfirmModal/ConfirmModal";
import CustomToast from "common/CustomToast/CustomToast";
import { useUserMenu } from "./useUserMenu";
import "./UserMenu.style.css";

const UserMenu = () => {
  const {
    userState,
    timer,
    popover,
    loginButtonProps,
    modals,
    toast,
  } = useUserMenu();

  return (
    <>
      <div className="user_menu d-flex align-items-center me-3">
        {userState ? (
          <>
            <div className="exp-time d-flex align-items-center me-2">
              <span style={{ width: "61px", textAlign: "end" }}>인증 만료</span>
              <span style={{ width: "43px", textAlign: "end" }}>
                <strong>{timer.formattedTime}</strong>
              </span>
              {timer.showExtendButton && (
                <Button
                  className="extend-token-btn ms-2"
                  variant="outline-primary"
                  size="sm"
                  onClick={timer.onExtend}
                >
                  연장
                </Button>
              )}
            </div>
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={
                <Popover>
                  <Popover.Header as="h3">{popover.userId || "Guest"}</Popover.Header>
                  <Popover.Body>
                    <div className="text-center mt-1">
                      <span onClick={popover.onLogoutClick} className="pointer">
                        로그아웃
                      </span>
                      <span className="mx-1">|</span>
                      <span
                        onClick={popover.onDeleteAccountClick}
                        className="pointer"
                      >
                        회원탈퇴
                      </span>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  border: "1px solid orange",
                  borderRadius: "50%",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  style={{ width: "100%", objectFit: "cover" }}
                  src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                  alt="user"
                />
              </div>
            </OverlayTrigger>
          </>
        ) : (
          <Button className="login-btn" {...loginButtonProps}>
            로그인
          </Button>
        )}
      </div>
      {userState && (
        <>
          <ConfirmModal {...modals.extendSession} />
          <ConfirmModal {...modals.logout} />
          <ConfirmModal {...modals.deleteAccount} />
        </>
      )}
      <CustomToast {...toast} />
    </>
  );
};

export default UserMenu;