import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CreateNewSeason from "./Components/CreateNewSeason.jsx";
import NavBar from "./Components/NavBar.jsx";
import PlayerList from "./Components/PlayerList.jsx";
import CreatePlayerForm from "./Components/CreatePlayerForm.jsx";
import ResultsInputForm from "./Components/ResultsInputForm.jsx";
import Leaderboard from "./Components/Leaderboard.jsx";
import GamesPage from "./Components/GamesPage.jsx";
import GamePage from "./Components/GamePage.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Route path="/admin/add-season" exact component={CreateNewSeason} />
      <Route path="/playerlist" exact component={PlayerList} />
      <Route path="/leaderboard" exact component={Leaderboard} />
      <Route path="/admin/add-player" exact component={CreatePlayerForm} />
      <Route path="/admin/add-game" exact component={ResultsInputForm} />
      <Route path="/games" exact component={GamesPage} />
      <Route path="/game/:gameid" exact component={GamePage} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
