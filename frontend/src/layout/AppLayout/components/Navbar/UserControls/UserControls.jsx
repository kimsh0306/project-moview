import React from "react";
import { useTheme } from "hooks/theme/useTheme";
import BSToggle from "components/lib/BSToggle/BSToggle";
import UserMenu from "../UserMenu/UserMenu";
import "./UserControls.style.scss";

function UserControls() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="user-controls">
      <UserMenu />
      <BSToggle
        className="theme-control"
        label="다크 테마"
        onChange={toggleTheme}
        checked={isDark}
      />
    </div>
  );
}

export default UserControls;