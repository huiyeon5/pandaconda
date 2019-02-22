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
      datasetNames: {},
      chartTypes: [
        {
          id: "scatter",
          mode: "lines",
          name: "Line Chart"
        },
        {
          id: "bar",
          mode: "",
          name: "Bar Chart & Top K Analysis"
        },
        {
          id: "scatter-chart",
          mode: "markers",
          name: "Scatter Plot"
        }
      ],
      test: true
    };
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.postData = this.postData.bind(this);
    this.navPageHandler = this.navPageHandler.bind(this);
    this.selectDatasetHandler = this.selectDatasetHandler.bind(this);
    this.selectChartTypeHandler = this.selectChartTypeHandler.bind(this);
  }

  componentDidMount() {
    // this.callBackendAPI("/get_all_dataset_api")
    //   .then(res => {
    //     this.setState({ datasetNames: res.datasetNames });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    this.callBackendAPI("/get_group_user_dataset")
      .then(res => {
        console.log("get call: datasetNames");
        console.log(res);
        this.setState({ datasetNames: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async postData(url, bodyObj) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyObj)
    });
    const body = await response.json();
    return body;
  }

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
    this.setState({ selectedDataset: value });
  }

  selectChartTypeHandler(value) {
    console.log("Change state of 'selectedChartType' to " + value);
    this.setState({ selectedChartType: value });
  }

  render() {
    if(localStorage.getItem('viz') !== null) {
        return (
            <VisChart
              handler={this.navPageHandler}
              dataset={this.state.selectedDataset}
              chart={this.state.selectedChartType}
            />
        );
    }
    if (this.state.currentPage === "selection") {
      return (
        <VisSelection
          handler={this.navPageHandler}
          datasetNames={this.state.datasetNames}
          chartTypes={this.state.chartTypes}
          selectDatasetHandler={this.selectDatasetHandler}
          selectChartTypeHandler={this.selectChartTypeHandler}
        />
      );
    } else if (this.state.currentPage === "chart") {
      return (
        <VisChart
          handler={this.navPageHandler}
          dataset={this.state.selectedDataset}
          chart={this.state.selectedChartType}
        />
      );
    }
  }
}
