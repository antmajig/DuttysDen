import React from 'react';
import '../nav.css'
import { Link } from 'react-router-dom'
function NavBar() {
    return (
        <div>
            <nav className="navBar">
                <li>DuttysDen</li>
                <Link to="/playerlist">
                    <li>Players</li>
                </Link>
                <Link to="leaderboard">
                    <li>Leaderboard</li>
                </Link>
            </nav>
        </div>
    );
}
export default NavBar;