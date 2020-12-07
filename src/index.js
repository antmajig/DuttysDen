import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import CreateNewSeason from "./Components/CreateNewSeason.jsx";
import NavBar from "./Components/NavBar.jsx";
import PlayerList from "./Components/PlayerList.jsx";
import CreatePlayerForm from "./Components/CreatePlayerForm.jsx";
import ResultsInputForm from "./Components/ResultsInputForm.jsx";
import Leaderboard from "./Components/Leaderboard.jsx";
import GamesListing from "./Components/GamesListing.jsx";
import GamePage from "./Components/GamePage.jsx";
import HomePage from "./Components/HomePage.jsx";
import PlayerPage from "./Components/PlayerPage.jsx";
import Schedule from "./Components/Schedule.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Route path="/" exact component={HomePage} />
      <Route path="/admin/add-season" exact component={CreateNewSeason} />
      <Route path="/schedule" exact component={Schedule} />
      <Route path="/playerlist" exact component={PlayerList} />
      <Route path="/leaderboard" exact component={Leaderboard} />
      <Route path="/admin/add-player" exact component={CreatePlayerForm} />
      <Route path="/admin/add-game" exact component={ResultsInputForm} />
      <Route path="/games" exact component={GamesListing} />
      <Route path="/game/:gameid" exact component={GamePage} />
      <Route path="/player/:playerid" exact component={PlayerPage} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
