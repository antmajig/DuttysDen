import React from "react";
import "../nav.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <nav className="navBar">
      <li>Dutty's Den</li>
      <Link to="/playerlist">
        <li className="nav-link">Players</li>
      </Link>
      <Link to="/leaderboard">
        <li className="nav-link">Leaderboard</li>
      </Link>
      <Link to="/games">
        <li className="nav-link">Games</li>
      </Link>
    </nav>
  );
}
export default NavBar;
