import React from "react";
import "../nav.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="navBar">
      <ul>
      <Link to="/">
        <li>Dutty's Den</li>
      </Link>
      <Link to="/playerlist">
        <li className="nav-link">Players</li>
      </Link>
      <Link to="/leaderboard">
        <li className="nav-link">Leaderboard</li>
      </Link>
      <Link to="/games">
        <li className="nav-link">Games</li>
      </Link>
      </ul>
    </div>
  );
}
export default NavBar;
