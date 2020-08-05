import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
class ResultRow extends Component {
  constructor(props) {
    super(props);
    let username = "";
    let cash = 0;
    let bountyCash = 0;
    this.usernameChange = this.usernameChange.bind(this);
    this.cashChange = this.cashChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderBountyField = this.renderBountyField.bind(this);
    this.bountyChange = this.bountyChange.bind(this);
  }

  handleChange() {
    this.props.setRowData({
      rowId: this.props.rowId,
      username: this.username,
      points: 0,
      cash: Number(this.cash),
      bountyCash: Number(this.bountyCash),
    });
  }

  usernameChange(event) {
    this.username = event.target.value;
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
  renderBountyField() {
    if (this.props.gameType === "PKO") {
      return (
        <div>
          <Col>
            <Form.Label size="sm">Bounty Cash</Form.Label>
            <Form.Control
              size="sm"
              type="number"
              onChange={this.bountyChange}
            />
          </Col>
        </div>
      );
    }
  }
  render() {
    const players = this.props.players;
    const rowId = this.props.rowId;
    return (
      <div key={rowId}>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label size="sm">Username</Form.Label>
              <Form.Control
                type="text"
                list="data"
                size="sm"
                required
                onChange={this.usernameChange}
              />
              <datalist id="data">
                {players.map((item) => (
                  <option key={item.PlayerID} value={item.PlayerName} />
                ))}
              </datalist>
            </Col>
            <Col xs="auto">
              <Form.Label size="sm">Cash</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                onChange={this.cashChange}
              />
            </Col>
            {this.renderBountyField()}
          </Form.Row>
        </Form.Group>
      </div>
    );
  }
}

export default ResultRow;
