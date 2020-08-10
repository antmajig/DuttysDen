import React, { Component } from "react";
import Table from "react-bootstrap/Table";
class GamePage extends Component {
  constructor(props) {
    super(props);
    this.getGameData = this.getGameData.bind(this);
    this.state = {
      dataLoaded: false,
      data: [],
    };
  }

  getGameData() {
    const {
      match: { params },
    } = this.props;
    const fetchString = "/game/" + params.gameid;
    fetch(fetchString)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          dataLoaded: true,
          data: data,
        });
      });
  }

  componentDidMount() {
    this.getGameData();
  }

  render() {
    const { dataLoaded, data } = this.state;
    return (
      <div className="leaderboard">
        {dataLoaded ? (
          <Table striped bordered hover size="sm" variant="dark">
            <thead>
              <th align="center" colspan="4">
                <h5 align="center" font-weight="bold">
                  {data.gameData[0].GameName}
                </h5>
              </th>
            </thead>
            <thead>
              <th>Placement</th>
              <th>Username</th>
              <th>Cash</th>
              <th>Points</th>
            </thead>
            <tbody>
              {data.resultData.map((result) => (
                <tr>
                  <td>{result.Position}</td>
                  <td>{result.PlayerID}</td>
                  <td>{result.Cash}</td>
                  <td>{result.Points}</td>
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
