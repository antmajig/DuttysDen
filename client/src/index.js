import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './Components/NavBar'
import PlayerList from './Components/PlayerList'
import CreatePlayerForm from './Components/CreatePlayerForm'
import ResultsInputForm from './Components/ResultsInputForm'
import Leaderboard from './Components/Leaderboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Route path="/playerlist" exact component={PlayerList} />
      <Route path="/leaderboard" exact component={Leaderboard} />
      <Route path="/admin/add-player" exact component={CreatePlayerForm} />
      <Route path="/admin/add-game" exact component={ResultsInputForm} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);