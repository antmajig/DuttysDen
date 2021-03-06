import React, { Component } from "react";
import LoadingSpinner from "./LoadingSpinner";
import FadeIn from "react-fade-in";
import { Link } from "react-router-dom";
import "../style/style.css";
class PlayerList extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  getSQLResults() {
    fetch("/api/playerlist")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ items: data, isLoaded: true });
      });
  }

  componentDidMount() {
    this.getSQLResults();
  }

  render() {
    const { isLoaded, items } = this.state;
    return (
      <div className="content">
        {isLoaded ? (
          <FadeIn>
            <table className="dd-table">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Real Name</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.PlayerID}>
                    <td>
                      <Link
                        className="linkText"
                        to={`/player/${item.PlayerID}`}
                      >
                        {item.PlayerName}
                      </Link>
                    </td>
                    <td>{item.RealName}</td>
                    <td>{item.Location}</td>
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

export default PlayerList;
