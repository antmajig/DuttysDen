import React from "react";
import { Component } from "react";
import Chart from "react-google-charts";

import "../style/style.css";

class PlayerSeasonChart extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false,
      error: null,
      season: props.season,
      seasonData: null,
    };
    this.pullChartData = this.pullChartData.bind(this);
  }

  async pullChartData() {
    const chartDataReq = "/api/chartData/season/" + this.props.season;
    let chartData = [];
    await fetch(chartDataReq)
      .then((res) => res.json())
      .then((data) => (chartData = data));

    if (chartData) {
      this.setState({ isLoaded: true, seasonData: chartData });
    }
  }
  async componentDidMount() {
    this.pullChartData();
  }
  render() {
    const { isLoaded, seasonData } = this.state;
    return (
      <>
        {isLoaded ? (
          <Chart
            chartType="LineChart"
            width={1000}
            height={500}
            loader={<div>Loading Chart</div>}
            data={seasonData.chartData}
            options={{
              hAxis: {
                title: "Games Played",
              },
              vAxis: {
                title: "Points",
              },
            }}
            rootProps={{ "data-testid": "1" }}
            legendToggle
          />
        ) : (
          <div>
            <h1>not loaded</h1>
          </div>
        )}
      </>
    );
  }
}
export default PlayerSeasonChart;

//For every player pull games they played that season in order of date played,
//
