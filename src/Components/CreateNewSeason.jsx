import React, { Component } from "react";
import Form from "react-bootstrap/Form";
class CreateNewSeason extends Component {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Group>
            <Form.Label>Season Name:</Form.Label>
            <Form.Control type="text"></Form.Control>
            <Form.Label>Season Start</Form.Label>
            <Form.Control type="date"></Form.Control>
            <Form.Control type="submit"></Form.Control>
          </Form.Group>
        </Form.Group>
      </Form>
    );
  }
}

export default CreateNewSeason;
