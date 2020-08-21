import React from "react";
import { Component } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Table from "react-bootstrap/Table";
import FadeIn from "react-fade-in";

class PlayerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      data: null,
    };
    this.getPlayerData = this.getPlayerData.bind(this);
  }
  async getPlayerData() {
    const {
      match: { params },
    } = this.props;
    const fetchString = "/player/" + params.playerid;
    await fetch(fetchString)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataLoaded: true,
          data: data,
        });
        console.log(data);
      });
  }

  componentDidMount() {
    this.getPlayerData();
  }

  getGolds(playerData) {
    let numberOfGolds = 0;
    playerData.resultData.map((result) => {
      if (result.Position === 1) {
        numberOfGolds++;
      }
    });

    return numberOfGolds;
  }
  getSilvers(playerData) {
    let numberOfSilvers = 0;
    playerData.resultData.map((result) => {
      if (result.Position === 2) {
        numberOfSilvers++;
      }
    });

    return numberOfSilvers;
  }
  getBronzes(playerData) {
    let numberOfBronzes = 0;
    playerData.resultData.map((result) => {
      if (result.Position === 3) {
        numberOfBronzes++;
      }
    });

    return numberOfBronzes;
  }
  getTotalCash(playerData) {
    let totalCash = 0;
    playerData.resultData.map((result) => {
      totalCash += Number(result.Cash);
      totalCash += Number(result.BountyCash);
    });

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(totalCash);
  }

  render() {
    const isLoaded = this.state.dataLoaded;
    const playerData = this.state.data;
    return (
      <div className="leaderboard">
        {isLoaded ? (
          <FadeIn>
            <Table striped hover bordered size="sm" variant="dark">
              <tbody>
                <tr>
                  <th width="10%">Player Name</th>
                  <td> {playerData.playerData[0].PlayerName}</td>
                </tr>
                <tr>
                  <th>Total Cash</th>
                  <td>{this.getTotalCash(playerData)}</td>
                </tr>
                <tr>
                  <th>Golds</th>
                  <td>{this.getGolds(playerData)}</td>
                </tr>
                <tr>
                  <th>Silvers</th>
                  <td>{this.getSilvers(playerData)}</td>
                </tr>
                <tr>
                  <th>Bronzes</th>
                  <td>{this.getBronzes(playerData)}</td>
                </tr>
              </tbody>
            </Table>
          </FadeIn>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}

export default PlayerPage;
