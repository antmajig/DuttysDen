import React, { Component } from "react";
import "../style/table.css";
import "../style/style.css";
import LoadingSpinner from "./LoadingSpinner.jsx";
import SeasonDropdown from "./SeasonDropdown.jsx";
import PlayerSeasonChart from "./PlayerSeasonChart";
class Leaderboard extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      error: null,
      items: [],
      seasons: null,
      displayedSeason: null,
    };
    this.seasonSelected = this.seasonSelected.bind(this);
  }

  seasonSelected(seasonID) {
    this.setState({ isLoaded: false });
    this.pullLeaderboardData(Number(seasonID));
  }

  async pullLeaderboardData(SeasonID) {
    this.setState({ displayedSeason: SeasonID });
    const fetchStr = "/api/leaderboard/" + SeasonID;
    await fetch(fetchStr)
      .then((res) => res.json())
      .then((data) => this.setState({ isLoaded: true, items: data }));
  }

  async pullSeasons() {
    await fetch("/api/season")
      .then((res) => res.json())
      .then((data) => this.setState({ isLoaded: true, seasons: data }));
  }

  async componentDidMount() {
    //push with latest season
    await this.pullSeasons();
    const seasons = this.state.seasons;
    const latestSeason = seasons[seasons.length - 1];
    this.pullLeaderboardData(latestSeason.SeasonID);
  }

  render() {
    const { isLoaded, items } = this.state;
    return (
      <div className="content">
        {isLoaded ? (
          <>
            <div
              className="content-item"
              style={{
                justifyContent: "flex-start",
                marginTop: "5%",
              }}
            >
              <SeasonDropdown
                seasons={this.state.seasons}
                seasonSelected={this.seasonSelected}
              />
              <table>
                <thead>
                  <tr>
                    <th align="center" colSpan="4">
                      <h5 align="center" fontWeight="bold">
                        Season {this.state.displayedSeason}
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
                        <a href={`/player/${item.PlayerID}`}>
                          {item.PlayerName}
                        </a>
                      </td>
                      <td>{item.GamesPlayed}</td>
                      <td>{item.Points.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PlayerSeasonChart season={this.state.displayedSeason} />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}

export default Leaderboard;
