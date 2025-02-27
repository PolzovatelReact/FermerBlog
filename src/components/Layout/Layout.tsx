import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Heder";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
