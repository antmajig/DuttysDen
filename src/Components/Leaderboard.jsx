import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "../leaderboard.css";
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
          <div>
            <Table striped bordered hover size="sm" variant="dark">
              <thead>
                <th align="center" colspan="4">
                  <h5 align="center" font-weight="bold">
                    Season 5
                  </h5>
                </th>
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
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.PlayerID}</td>
                    <td>{item.GamesPlayed}</td>
                    <td>{item.Points}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

export default Leaderboard;
