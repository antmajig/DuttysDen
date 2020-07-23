import React from "react";
import "../nav.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav className="navBar">
        <li>Duttys Den</li>
        <Link to="/playerlist">
          <li className="nav-link">Players</li>
        </Link>
        <Link to="leaderboard">
          <li className="nav-link">Leaderboard</li>
        </Link>
      </nav>
    </div>
  );
}
export default NavBar;
