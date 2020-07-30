import React, { Component } from "react";

class ResultRow extends Component {
  constructor(props) {
    super(props);
    let username = "";
    let points = 0;
    let cash = 0;
    let bountyCash = 0;
    this.usernameChange = this.usernameChange.bind(this);
    this.pointsChange = this.pointsChange.bind(this);
    this.cashChange = this.cashChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderBountyField = this.renderBountyField.bind(this);
  }

  handleChange() {
    this.props.setRowData({
      rowId: this.props.rowId,
      username: this.username,
      points: this.points,
      cash: this.cash,
      bountyCash: this.bountyCash,
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

  bountyChange(event) {
    this.bountyCash = event.target.value;
    this.handleChange();
  }
  //use a datalist for the players
  renderBountyField() {
    if (this.props.gameType === "pko") {
      return (
        <>
          <label>Bounty Cash</label>
          <input type="number" onChange={this.bountyChange} />
        </>
      );
    }
  }
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
        {this.renderBountyField()}
      </form>
    );
  }
}

export default ResultRow;
