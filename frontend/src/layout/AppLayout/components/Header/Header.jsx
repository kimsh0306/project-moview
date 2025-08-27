import React, {useContext} from "react";
import { ThemeContext } from "context/ThemeContext";
import NavbarScroll from "./components/NavbarScroll";

const menuItems = [
  { name: "영화", pathName: "/movies" },
  { name: "내가 찜한 영화", pathName: "/my-list" },
];

const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);

    const handleThemeChange = () =>
      setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    
  return (
    <header className="header">
      <NavbarScroll
        brandName="Moview"
        menuItems={menuItems}
        theme={theme}
        handleThemeChange={handleThemeChange}
      />
    </header>
  );
};

export default Header;
