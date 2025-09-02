import React from "react";
import NavbarScroll from "./components/NavbarScroll";

const menuItems = [
  { name: "영화", pathName: "/movies" },
  { name: "내가 찜한 영화", pathName: "/my-list" },
];

const Header = () => {
  return (
    <header>
      <NavbarScroll
        brandName="Moview"
        menuItems={menuItems}
      />
    </header>
  );
};

export default Header;
