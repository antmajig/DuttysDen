import React, { Component } from "react";
import ResultRow from "./ResultRow";

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
      <label>
        Number of players:
        <input type="number" onChange={this.handleChange} />
      </label>
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
            <NumberOfPlayersInput
              numOfPlayersChange={this.setNumberOfPlayers}
            />
            <label>Game Name:</label>
            <input type="text" />
            <label>Game Type:</label>
            <select name="Game Type" onChange={this.gameTypeChange}>
              <option value="main">Main</option>
              <option value="turbo">Turbo</option>
              <option value="pko">PKO</option>
            </select>
            <label>Points:</label>
            <input type="checkbox" />
            {this.getRows()}
            <div>
              <input
                type="submit"
                value="submit game"
                onClick={this.sendForm}
              />
            </div>
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
