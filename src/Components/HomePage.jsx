import React from "react";
import { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../index.css";
class HomePage extends Component {
  render() {
    return (
      <div className="caroselContainer">
        <Carousel>
          <Carousel.Item>
            <img className="d-block" src="fatseal1.jpg" alt="First slide" />
            <Carousel.Caption>
              <h3>Welcome to Dutty's Den</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block" src="fatseal3.jpeg" alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block" src="fatseal2.jpg" alt="Third slide" />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
export default HomePage;
