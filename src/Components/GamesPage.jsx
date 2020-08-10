import React from "react";
import { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

class GamesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedGames: false,
      games: [],
    };
  }
  getGames() {
    fetch("/games/5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          loadedGames: true,
          games: data,
        });
      });
  }

  componentDidMount() {
    this.getGames();
  }
  render() {
    const { loadedGames, games } = this.state;
    return (
      <div className="leaderboard">
        {loadedGames ? (
          <div>
            <Table striped bordered hover size="sm" variant="dark">
              <thead>
                <tr>
                  <th>Game Name</th>
                  <th>Date Player</th>
                  <th>Number of Players</th>
                  <th>Game Type</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr>
                    <Link to={`/game/${game.GameID}`}>
                      <td>{game.GameName}</td>
                    </Link>
                    <td>{game.Date}</td>
                    <td>0</td>
                    <td>{game.GameType}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    );
  }
}

export default GamesPage;
