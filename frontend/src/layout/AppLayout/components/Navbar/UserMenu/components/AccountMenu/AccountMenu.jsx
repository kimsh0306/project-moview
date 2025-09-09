import React from "react";
import { useConfirm } from "contexts/modal/ConfirmModalContext";
import { useAuthActions } from "hooks/auth/useAuthActions";
import BSOverlayTrigger from "components/lib/BSOverlayTrigger/BSOverlayTrigger";
import AtomButton from "components/atoms/AtomButton";
import { Popover, Image } from "react-bootstrap";
import "./AccountMenu.style.scss";

const AccountMenu = ({ userId }) => {
  const { logout, deleteAccount } = useAuthActions();

  const { showConfirm } = useConfirm();

  const handleLogout = async () => {
    const confirmed = await showConfirm({
      message: "로그아웃 하시겠습니까?",
    });

    if (confirmed) logout();
  };

  const handleDeleteAccount = async () => {
    const confirmed = await showConfirm({
      message: "계정을 삭제하시겠습니까?",
    });

    if (confirmed) deleteAccount();
  };

  const popover = (
    <Popover id="pop">
      <Popover.Header className="text-center" as="h3">
        {userId || "Guest"}
      </Popover.Header>
      <Popover.Body>
        <AtomButton onClick={handleLogout}>로그아웃</AtomButton>
        <span className="mx-1">|</span>
        <AtomButton onClick={handleDeleteAccount}>회원탈퇴</AtomButton>
      </Popover.Body>
    </Popover>
  );

  return (
    <BSOverlayTrigger overlay={popover}>
      <Image
        className="user-avatar"
        width={30}
        height={30}
        src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
        alt="User Profile Image"
        roundedCircle
      />
    </BSOverlayTrigger>
  );
};

export default AccountMenu;
