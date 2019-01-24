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
      datasetNames: [],
      chartTypes: [
        {
          id: "scatter",
          name: "Line Chart"
        },
        {
          id: "bar",
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
      test: true,
      actualData: null
    };
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.postData = this.postData.bind(this);
    this.navPageHandler = this.navPageHandler.bind(this);
    this.selectDatasetHandler = this.selectDatasetHandler.bind(this);
    this.selectChartTypeHandler = this.selectChartTypeHandler.bind(this);
    this.getActualData = this.getActualData.bind(this);
  }

  componentDidMount() {
    console.log("In ComponentDidMount method");
    this.callBackendAPI("/get_all_dataset_api")
      .then(res => {
        // console.log("==Datasets Names Response==");
        // console.log(res);
        // console.log(res.datasetNames);
        this.setState({ datasetNames: res.datasetNames });
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
    this.setState({ selectedDataset: value }, this.getActualData);
  }

  getActualData() {
      this.postData("/get_data_api", {selectedData: this.state.selectedDataset})
      .then(res => {
          this.setState({actualData: res})
      }).catch(err => console.log(err))
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
      return (
        <VisChart
          handler={this.navPageHandler}
          dataset={this.state.selectedDataset}
          chart={this.state.selectedChartType}
          actualData={this.state.actualData}
        />
      );
    }
  }
}
