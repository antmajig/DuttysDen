import React, { Component } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";
import FadeIn from "react-fade-in";
import "../style/dd-table.css"

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
    this.renderBounty = this.renderBounty.bind(this);
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

  renderBountyHeader() {
    const isPKO = this.state.data.gameData[0].GameType === "PKO";
    if (isPKO) {
      return <th>Bounty Cash</th>;
    }
  }

  renderBounty(bountyCash) {
    const isPKO = this.state.data.gameData[0].GameType === "PKO";
    if (isPKO) {
      return <td>{this.formatCash(bountyCash)}</td>;
    }
  }

  render() {
    const { dataLoaded, data } = this.state;
    return (
      <div className="container">
        {dataLoaded ? (
          <FadeIn>
            <table className="dd-table">
              <thead>
                <tr>
                  <th align="center" colSpan="5">
                    <h5 align="center" fontWeight="bold">
                      {data.gameData[0].GameName}
                    </h5>
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Points</th>
                  <th>Cash</th>
                  {this.renderBountyHeader()}
                </tr>
              </thead>
              <tbody>
                {data.resultData.map((result) => (
                  <tr key={result.ResultID}>
                    <td>{result.Position + 1}</td>
                    <td>{this.getUsername(result.PlayerID)}</td>
                    <td>{result.Points}</td>
                    <td>{this.formatCash(result.Cash)}</td>
                    {this.renderBounty(result.BountyCash)}
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeIn>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}
export default GamePage;
