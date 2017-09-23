import React from "react";
import "../css/Header.css";
import logo from "../logo.svg";

const Header = () => {
  return (
    <div className="Header-header">
      <img src={logo} className="Header-logo" alt="logo" />
      <h2>Welcome to VeoMamoneo</h2>
      <br />
    </div>
  );
};

export default Header;
