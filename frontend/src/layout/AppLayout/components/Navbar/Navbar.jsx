import React from "react";
import { useTheme } from "hooks/theme/useTheme";
import { NAV_MENUS } from "constants/NavMenus";
import BSNavbar from "components/lib/BSNavbar/BSNavbar";
import UserMenu from "./UserMenu/UserMenu";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import SearchBar from "./SearchBar/SearchBar";
import "./Navbar.style.scss";

const UserControls = () => {
  return (
    <div className="user-controls">
      <UserMenu />
      <ThemeToggle />
    </div>
  );
};

const Navbar = () => {
  const { theme, isDark } = useTheme();
  return (
    <BSNavbar bg={isDark ? "dark" : "white"} theme={theme}>
      <BSNavbar.Brand to="/">Moview</BSNavbar.Brand>
      {/* 추가한 컴포넌트 */}
      <UserControls />
      <BSNavbar.Toggle />
      <BSNavbar.Collapse>
        <BSNavbar.Nav menus={NAV_MENUS} />
        {/* 검색바 분리 */}
        <SearchBar />
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

export default Navbar;
