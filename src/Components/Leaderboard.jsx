import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../leaderboard.css";
import LoadingSpinner from "./LoadingSpinner.jsx";
import FadeIn from "react-fade-in";
import { Link } from "react-router-dom";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      items: [],
    };
  }

  pullLeaderboardData() {
    fetch("/leaderboard")
      .then((res) => res.json())
      .then((data) => this.setState({ isLoaded: true, items: data }));
  }

  componentDidMount() {
    this.pullLeaderboardData();
  }

  render() {
    const { isLoaded, items } = this.state;
    return (
      <div className="leaderboard">
        {isLoaded ? (
          <FadeIn>
            <div>
              <Table striped bordered hover size="sm" variant="dark">
                <thead>
                  <tr>
                    <th align="center" colSpan="4">
                      <h5 align="center" fontWeight="bold">
                        Season 5
                      </h5>
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Games Played</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.PlayerID}>
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          className="linkText"
                          to={`/player/${item.PlayerID}`}
                        >
                          {item.PlayerName}
                        </Link>
                      </td>
                      <td>{item.GamesPlayed}</td>
                      <td>{item.Points.toFixed(2)}</td>
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

export default Leaderboard;
