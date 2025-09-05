import React from "react";
import { useTheme } from "hooks/theme/useTheme";
import { NAV_MENUS } from "constants/NavMenus";
import BSNavbar from "components/lib/BSNavbar/BSNavbar";
import UserControls from "./UserControls/UserControls";
import UserMenu from "./UserMenu/UserMenu";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import SearchBar from "./SearchBar/SearchBar";
import "./Navbar.style.scss";

const Navbar = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  return (
    <BSNavbar bg={isDark ? "dark" : "white"} theme={theme}>
      <BSNavbar.Brand to="/">Moview</BSNavbar.Brand>
      {/* 추가한 컴포넌트 */}
      <div className="user-controls">
        <UserMenu />
        <ThemeToggle
          className="theme-control"
          label="다크 테마"
          onChange={toggleTheme}
          checked={isDark}
        />
      </div>
      {/* <UserControls /> */}
      <BSNavbar.Toggle />
      <BSNavbar.Collapse>
        <BSNavbar.Nav
          className="me-auto my-2 my-lg-0"
          menus={NAV_MENUS}
          navbarScroll
        />
        {/* 검색바 분리 */}
        <SearchBar />
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

export default Navbar;
