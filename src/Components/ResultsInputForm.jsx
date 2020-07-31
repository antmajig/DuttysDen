import React, { Component } from "react";
import ResultRow from "./ResultRow";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

//on page load, pull all the usernames so that we can fill our rows
//do form validation (no 2 usernames of the same value)
//check to see if the sql query executed correctly.

class ResultInputForm extends Component {
  constructor() {
    super();
    this.state = {
      numberOfPlayers: 0,
      rowData: [],
      players: [],
      seasons: [],
      loaded: false,
      gameType: "main",
      gameName: "",
      points: false,
      season: 0,
    };
    this.setNumberOfPlayers = this.setNumberOfPlayers.bind(this);
    this.setRowData = this.setRowData.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.parseGameInput = this.parseGameInput.bind(this);
  }

  setNumberOfPlayers(numOfPlayers) {
    this.setState({ numberOfPlayers: numOfPlayers });
  }

  setRowData(row) {
    this.state.rowData[row.rowId] = row;
  }

  getRows() {
    let rows = [];
    for (let i = 0; i < this.state.numberOfPlayers; i++) {
      rows.push(
        <ResultRow
          rowId={i}
          setRowData={this.setRowData}
          players={this.state.players}
          gameType={this.state.gameType}
          key={i}
        />
      );
    }
    return rows;
  }

  handleChange(event) {
    const target = event.target;
    const value = target.name === "points" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  parseGameInput() {
    const numberOfPlayers = this.state.rowData.length;
    for (let i = 0; i < numberOfPlayers; i++) {
      let username = this.state.rowData[i].username;
      console.log(this.state.players);
      let found =
        this.state.players.filter((player) => player.PlayerName === username)
          .length > 0;

      if (!found) {
        return "Invalid username input";
      }
    }

    let foundSeason =
      this.state.seasons.filter(
        (season) => season.SeasonID === Number(this.state.season)
      ).length > 0;
    if (!foundSeason) {
      return "Invalid season input";
    }
  }

  sendForm() {
    //pull all row data
    //pull game name
    //pull counts towards points
    //calculate the points
    //check the validity of the input data
    //send payload to express
    console.log(this.parseGameInput());

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "test" }),
    };
    fetch("/add-game", requestOptions)
      .then((response) => response.json)
      .then((data) => console.log(data));
  }

  componentDidMount() {
    fetch("/playerlist")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ players: data, loaded: true });
      });

    fetch("/season")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ seasons: data, loaded: true });
      });
  }

  render() {
    const loaded = this.state.loaded;
    return (
      <div>
        {loaded ? (
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Game Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="gameName"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} xs="auto">
                  <Form.Label>Game Type</Form.Label>
                  <Form.Control
                    name="Game Type"
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option value="main">Main</option>
                    <option value="turbo">Turbo</option>
                    <option value="pko">PKO</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} xs="auto">
                  <Form.Label>Points</Form.Label>
                  <Form.Control
                    name="points"
                    type="checkbox"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Season</Form.Label>
                <Form.Control
                  name="season"
                  type="number"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of players</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfPlayers"
                  onChange={this.handleChange}
                />
              </Form.Group>
              {this.getRows()}
              <Form.Group>
                <Form.Control
                  type="button"
                  value="submit"
                  onClick={this.sendForm}
                />
              </Form.Group>
            </Form>
          </div>
        ) : (
          <div>
            <h1>loading</h1>
          </div>
        )}
      </div>
    );
  }
}

export default ResultInputForm;
