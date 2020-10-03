import React from "react";
import { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner.jsx";
import FadeIn from "react-fade-in";
import "../index.css";
class GamesListing extends Component {
  constructor(props) {
    super();
    this.state = {
      loadedGames: false,
      games: [],
    };
  }

  async getGames() {
    await fetch("/games/5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          loadedGames: true,
          games: data,
        });
      });

    let games = this.state.games;
    games.sort(function (a, b) {
      return new Date(b.Date) - new Date(a.Date);
    });
    this.setState({ games });
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const returnDate = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(date);
    return returnDate;
  }

  componentDidMount() {
    this.getGames();
  }
  render() {
    const { loadedGames, games } = this.state;
    return (
      <div className="leaderboard">
        {loadedGames ? (
          <FadeIn>
            <div>
              <Table striped bordered hover size="sm" variant="dark">
                <thead>
                  <tr>
                    <th>Season</th>
                    <th>Game Name</th>
                    <th>Date</th>
                    <th>Game Type</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr key={game.GameID}>
                      <td>{game.SeasonID}</td>
                      <td>
                        <Link className="linkText" to={`/game/${game.GameID}`}>
                          {game.GameName}
                        </Link>
                      </td>
                      <td>{this.formatDate(game.Date)}</td>
                      <td>{game.GameType}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </FadeIn>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}

export default GamesListing;
