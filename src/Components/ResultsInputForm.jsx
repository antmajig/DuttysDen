import React, { Component } from "react";
import ResultRow from "./ResultRow";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
class NumberOfPlayersInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.numOfPlayersChange(event.target.value);
  }

  render() {
    return (
      <div>
        <Form.Group>
          <Form.Label>Number of players</Form.Label>
          <Form.Control type="number" onChange={this.handleChange} />
        </Form.Group>
      </div>
    );
  }
}

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
      loadedPlayers: false,
      gameType: "main",
    };
    this.setNumberOfPlayers = this.setNumberOfPlayers.bind(this);
    this.setRowData = this.setRowData.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.gameTypeChange = this.gameTypeChange.bind(this);
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
        />
      );
    }
    return rows;
  }

  gameTypeChange(event) {
    this.setState({
      gameType: event.target.value,
    });
    console.log(event.target.value);
  }

  parseGameInput() {}

  sendForm() {
    //pull all row data
    //pull game name
    //pull counts towards points
    //calculate the points
    //check the validity of the input data
    //send payload to express
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
        this.setState({ players: data, loadedPlayers: true });
      });
  }

  render() {
    const loadedPlayers = this.state.loadedPlayers;
    return (
      <div>
        {loadedPlayers ? (
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Game Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Game Name"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Game Type</Form.Label>
                  <Form.Control
                    name="Game Type"
                    as="select"
                    onChange={this.gameTypeChange}
                  >
                    <option value="main">Main</option>
                    <option value="turbo">Turbo</option>
                    <option value="pko">PKO</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Points</Form.Label>
                <Form.Control type="checkbox" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Season</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
              <NumberOfPlayersInput
                numOfPlayersChange={this.setNumberOfPlayers}
              />
              {this.getRows()}
              <Form.Group>
                <Form.Control type="submit" onClick={this.sendForm} />
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
