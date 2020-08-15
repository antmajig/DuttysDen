import React, { Component } from "react";
import Table from "react-bootstrap/Table";
class GamePage extends Component {
  constructor(props) {
    super(props);
    this.getGameData = this.getGameData.bind(this);
    this.state = {
      dataLoaded: false,
      data: [],
      players: [],
    };
    this.getUsername = this.getUsername.bind(this);
  }

  async getGameData() {
    const {
      match: { params },
    } = this.props;
    const fetchString = "/game/" + params.gameid;
    await fetch(fetchString)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataLoaded: true,
          data: data,
        });
      });

    await fetch("/playerlist")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          players: data,
        });
      });
  }

  componentDidMount() {
    this.getGameData();
  }

  formatCash(cash) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cash);
  }

  getUsername(userID) {
    let pExists = this.state.players.filter(
      (player) => userID === player.PlayerID
    );
    if (pExists.length > 0) {
      return pExists[0].PlayerName;
    }
  }

  render() {
    const { dataLoaded, data } = this.state;
    return (
      <div className="leaderboard">
        {dataLoaded ? (
          <Table striped bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th align="center" colSpan="4">
                  <h5 align="center" fontWeight="bold">
                    {data.gameData[0].GameName}
                  </h5>
                </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Placement</th>
                <th>Username</th>
                <th>Points</th>
                <th>Cash</th>
              </tr>
            </thead>
            <tbody>
              {data.resultData.map((result) => (
                <tr key={result.ResultID}>
                  <td>{result.Position}</td>
                  <td>{this.getUsername(result.PlayerID)}</td>
                  <td>{result.Points}</td>
                  <td>{this.formatCash(result.Cash)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h1>Not Loading</h1>
        )}
      </div>
    );
  }
}
export default GamePage;