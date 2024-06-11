import React, { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import Navbar from "../components/navbar/Navbar";
import LeftBar from "../components/leftBar/LeftBar";
import RightBar from "../components/rightBar/RightBar";
import { Outlet } from "react-router-dom";



const Layout = () => {
    const { darkMode } = useContext(DarkModeContext);
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

export default Layout;