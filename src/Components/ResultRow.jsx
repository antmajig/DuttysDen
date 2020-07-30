import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
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
        <div>
          <Col>
            <Form.Label>Bounty Cash</Form.Label>
            <Form.Control type="number" onChange={this.bountyChange} />
          </Col>
        </div>
      );
    }
  }
  render() {
    const players = this.props.players;
    console.log(players);
    return (
      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              list="data"
              onChange={this.usernameChange}
            />
            <datalist id="data">
              {players.map((item) => (
                <option key={item.playerID} value={item.PlayerName} />
              ))}
            </datalist>
          </Col>
          <Col xs="auto">
            <Form.Label>Points</Form.Label>
            <Form.Control type="number" onChange={this.pointsChange} />
          </Col>
          <Col xs="auto">
            <Form.Label>Cash</Form.Label>
            <Form.Control type="number" onChange={this.cashChange} />
          </Col>
          {this.renderBountyField()}
        </Form.Row>
      </Form.Group>
    );
  }
}

export default ResultRow;
