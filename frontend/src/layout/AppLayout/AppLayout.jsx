import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "layout/AppLayout/components/Navbar/Navbar";
import CompanyInfo from "layout/AppLayout/components/CompanyInfo/CompanyInfo";

const AppLayout = () => {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <CompanyInfo />
      </footer>
    </>
  );
};

export default AppLayout;
