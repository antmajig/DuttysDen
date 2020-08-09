import React, { Component } from "react";
import ResultRow from "./ResultRow";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import "../customForm.css";
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
      gameType: "Main",
      gameName: "",
      points: false,
      season: 0,
      gameDate: "",
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
      let findResult = this.state.players.filter(
        (player) => player.PlayerName === username
      );
      const found = findResult.length > 0;
      if (found) {
        this.state.rowData[i].PlayerID = findResult[0].PlayerID;
      } else {
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

    return "";
  }

  async sendForm(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      return;
    }
    const warningString = this.parseGameInput();
    if (warningString !== "") {
      alert(warningString);
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };

    let response = await fetch("/add-game", requestOptions);
    let jsonRes = await response.json();

    if (!jsonRes.success) {
      alert(jsonRes.error.sqlMessage);
    } else {
      alert("Game added!");
      form.reset();
    }
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
  //game date
  render() {
    const loaded = this.state.loaded;
    return (
      <div>
        {loaded ? (
          <div className="custom-form">
            <Form onSubmit={this.sendForm}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Game Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="gameName"
                    onChange={this.handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} xs="auto">
                  <Form.Label>Game Type</Form.Label>
                  <Form.Control
                    name="gameType"
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option value="Main">Main</option>
                    <option value="Turbo">Turbo</option>
                    <option value="PKO">PKO</option>
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
                  required
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  name="gameDate"
                  type="date"
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Number of players</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfPlayers"
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              <hr />
              {this.getRows()}
              <Form.Group>
                <Button type="submit">Submit Form</Button>
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
