import React from "react";
import { useTheme } from "hooks/theme/useTheme";
import { NAV_MENUS } from "constants/NavMenus";
import BSNavbar from "components/lib/BSNavbar/BSNavbar";
import UserControls from "./UserControls/UserControls";
import SearchBar from "./SearchBar/SearchBar";
import "./Navbar.style.scss";

const Navbar = () => {
  const { theme, isDark } = useTheme();

  return (
    <BSNavbar
      brandName="Moview"
      menus={NAV_MENUS}
      userControlNode={UserControls}
      searchBarNode={SearchBar}
      // Navbar props
      bg={isDark ? "dark" : "white"}
      data-bs-theme={theme} 
      expand="lg"
    />
  );
};

export default Navbar;
