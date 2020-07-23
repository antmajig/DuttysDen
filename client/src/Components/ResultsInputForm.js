import React, { Component } from "react";

class ResultRow extends Component {
  constructor(props) {
    super(props);
    let username = "";
    let points = 0;
    let cash = 0;
    this.usernameChange = this.usernameChange.bind(this);
    this.pointsChange = this.pointsChange.bind(this);
    this.cashChange = this.cashChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.setRowData({
      rowId: this.props.rowId,
      username: this.username,
      points: this.points,
      cash: this.cash,
    });
  }

  usernameChange(event) {
    this.username = event.target.value;
    this.handleChange();
  }

  pointsChange(event) {
    this.points = event.target.value;
    this.handleChange();
  }

  cashChange(event) {
    this.cash = event.target.value;
    this.handleChange();
  }
  //use a datalist for the players
  render() {
    const players = this.props.players;
    console.log(players);
    return (
      <form>
        <label>Username</label>
        <input type="text" list="data" onChange={this.usernameChange} />
        <datalist id="data">
          {players.map((item) => (
            <option key={item.playerID} value={item.PlayerName} />
          ))}
        </datalist>
        <label>Points</label>
        <input type="number" onChange={this.pointsChange} />
        <label>Cash</label>
        <input type="number" onChange={this.cashChange} />
      </form>
    );
  }
}

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
    };
    this.setNumberOfPlayers = this.setNumberOfPlayers.bind(this);
    this.setRowData = this.setRowData.bind(this);
    this.sendForm = this.sendForm.bind(this);
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
        />
      );
    }
    return rows;
  }

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
            {this.getRows()}
            <input type="submit" value="submit game" onClick={this.sendForm} />
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
