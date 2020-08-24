import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../index.css";

class CreatePlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      realname: "",
      location: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    };

    fetch("/add-player", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.outcome === true) {
          alert("player created");
        } else {
          alert("Failed to create player");
        }
      });
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="custom-form">
        <Form>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Real Name:</Form.Label>
            <Form.Control
              type="text"
              name="realname"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location:</Form.Label>
            <Form.Control
              type="text"
              name="location"
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="button" onClick={this.submitForm}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default CreatePlayerForm;
