import React from "react";
import "../css/VisualisationPage";
import VisSelection from "./VisSelection";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import VisChart from "./VisChart";

var $ = require("jquery");

export default class VisualisationContent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: "selection",
      datasetNames: [
        {
          id: "dataset-name-1",
          name: "inventory.csv"
        },
        {
          id: "dataset-name-2",
          name: "sku.csv"
        },
        {
          id: "dataset-name-3",
          name: "movement.csv"
        }
      ],
      chartTypes: [
        {
          id: "line-chart",
          name: "Line Chart"
        },
        {
          id: "column-chart",
          name: "Column Chart"
        },
        {
          id: "bar-chart",
          name: "Bar Chart"
        },
        {
          id: "stacked-bar-chart",
          name: "Stacked Bar Chart"
        },
        {
          id: "synchronised-line-chart",
          name: "Synchronised Line Chart"
        },
        {
          id: "scatter-chart",
          name: "Scatter Chart"
        },
        {
          id: "box-plot",
          name: "Box Plot"
        }
      ],
      test: true
    };
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.navPageHandler = this.navPageHandler.bind(this);
    this.selectDatasetHandler = this.selectDatasetHandler.bind(this);
    this.selectChartTypeHandler = this.selectChartTypeHandler.bind(this);
  }

  // componentDidMount() {
  //   console.log("In ComponentDidMount method");
  //   this.callBackendAPI("/get_all_dataset_api")
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.datasets);
  //       this.setState({ datasetNames: res.datasets });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // getData() {
  //   var sampleData = require("./SampleData.js").data;
  //   this.state = {
  //     data: sampleData
  //   };
  // }

  // GET METHOD CALL
  async callBackendAPI(url) {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  navPageHandler(value) {
    console.log("clicked " + value);
    this.setState({ currentPage: value });
  }

  selectDatasetHandler(value) {
    console.log("Change state of 'selectedDataset' to " + value);
    this.setState({ selectedDataset: value });
  }

  selectChartTypeHandler(value) {
    console.log("Change state of 'selectedChartType' to " + value);
    this.setState({ selectedChartType: value });
  }

  render() {
    if (this.state.currentPage === "selection") {
      console.log("Vis Selection");
      console.log(this.state);
      return (
        <VisSelection
          handler={this.navPageHandler}
          datasetItems={this.state.datasetNames}
          chartTypes={this.state.chartTypes}
          selectDatasetHandler={this.selectDatasetHandler}
          selectChartTypeHandler={this.selectChartTypeHandler}
        />
      );
    } else if (this.state.currentPage === "chart") {
      console.log("Vis Display");
      console.log(this.state);
      return <VisChart handler={this.navPageHandler} />;
    }
  }
}
