import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import "../index.css";

class CreatePlayerForm extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" name="name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Real Name:</Form.Label>
            <Form.Control type="text" name="name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location:</Form.Label>
            <Form.Control type="text" name="name" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default CreatePlayerForm;
