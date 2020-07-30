import React, { Component } from "react";
import Table from "react-bootstrap/Table";
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
    fetch("/playerlist")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ items: data, isLoaded: true });
        console.log(this.state.items);
      });
  }

  componentDidMount() {
    this.getSQLResults();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <div className="leaderboard">
        {isLoaded ? (
          <div>
            <Table striped bordered hover size="sm" variant="dark">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Real Name</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td>{item.PlayerName}</td>
                    <td>{item.RealName}</td>
                    <td>{item.Location}</td>
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

export default PlayerList;