import React from "react";
import { Component } from "react";
import BackgroundParticles from "./BackgroundParticles.jsx";

import "../style/style.css";

import ddLogo from "../images/DDLogo_Text.png";

class HomePage extends Component {
  render() {
    return (
      <div className="content">
        <div className="background-particles">
          <BackgroundParticles />
        </div>
        <div className="content-item" style={{ minHeight: "100vh" }}>
          <img
            alt={"Dutty's Den Logo"}
            src={ddLogo}
            style={{ maxWidth: "90%", height: "auto" }}
          ></img>
        </div>
      </div>
    );
  }
}
export default HomePage;
