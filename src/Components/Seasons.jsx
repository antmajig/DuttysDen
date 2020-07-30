import React, { Component } from "react";

class Seasons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didLoad: false,
      seasonData: [],
    };
  }

  componentDidMount() {}

  render() {
    const didLoad = this.state.didLoad;

    return (
        {didLoad ? (
            <h1>Did Load</h1>
         ) :
        (
            <h1>Didn't load</h1>
        )
        }   
    )    
    };
}
