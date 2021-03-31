import React from "react";
import "../style/sidebar.css";
import { Link } from "react-router-dom";

import homeIcon from "../images/home.svg";
import leaderboardIcon from "../images/bar-chart.svg";
import gameIcon from "../images/cards.svg";
function NavBar() {
  return (
    <div className="sidebar">
      <Link to="/">
        <div className="sidebar-item">
          <img alt={"Home Page Link"} src={homeIcon} />
        </div>
      </Link>
      <Link to="/leaderboard">
        <div className="sidebar-item">
          <img alt={"Leaderboard Icon"} src={leaderboardIcon}></img>
        </div>
      </Link>
      <Link to="/games">
        <div className="sidebar-item">
          <img alt={"Games Page Link"} src={gameIcon}></img>
        </div>
      </Link>
    </div>
  );
}
export default NavBar;
