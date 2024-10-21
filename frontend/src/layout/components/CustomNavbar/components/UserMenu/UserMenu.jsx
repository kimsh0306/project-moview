import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticateAction } from "../../../../../redux/actions/authenticateAction";

const UserMenu = () => {
  const userState = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authenticateAction.logout());
    navigate("/");
  };

  return (
    <div className="d-flex align-items-center me-3">
      {userState ? (
        <>
          <button className="login-btn" onClick={handleLogout}>
            {userState.userId}
          </button>
          <div
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid orange",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              style={{
                width: "100%",
                objectFit: "cover",
              }}
              src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
              alt="user"
            />
          </div>
        </>
      ) : (
        <>
          <button
            className="login-btn"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
        </>
      )}
    </div>
  );
};

export default UserMenu;
