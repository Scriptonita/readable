import React, { Component } from "react";
import logo from "../logo.svg";
import "../css/Home.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to VeoMamoneo</h2>
        </div>
        <p className="Home-intro">Categories</p>
      </div>
    );
  }
}

export default Home;
