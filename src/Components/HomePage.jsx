import React from "react";
import { Component } from "react";
import BackgroundParticles from "./BackgroundParticles.jsx"
import "../index.css";
class HomePage extends Component {
  render() {
    return (
      <div id="main">
        <div id="backgroundParticles">       
           <BackgroundParticles/>
        </div>
        <div id="center">
          <div id="homePageImage">
            <img src="fatseal1.jpg"></img>
          </div> 
        </div>
      </div>
    );
  }
}
export default HomePage;
