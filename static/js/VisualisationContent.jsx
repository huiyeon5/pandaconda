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
      test: true,
      selectedDataset: null,
      selectedChartType: null,
      hasGroup:null
    };
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.postData = this.postData.bind(this);
    this.navPageHandler = this.navPageHandler.bind(this);
    this.selectDatasetHandler = this.selectDatasetHandler.bind(this);
    this.selectChartTypeHandler = this.selectChartTypeHandler.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI("/has_group")
      .then(result => {
        if(result.status === 200 || result.status === 300) {
            this.callBackendAPI("/get_group_user_dataset")
            .then(res => {
                this.setState({ datasetNames: res, hasGroup:true });
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            this.setState({hasGroup:false})
        }
      }).catch(err => {
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
    let inputSet = {
      currentPage: value
    }
    if (value === "selection") {
      inputSet.selectedDataset = null;
      inputSet.selectedChartType = null;
    }
    console.log(inputSet)
    this.setState(inputSet);
  }

  selectDatasetHandler(value) {
    this.setState({ selectedDataset: value });
  }

  selectChartTypeHandler(value) {
    this.setState({ selectedChartType: value });
  }

  render() {
    if(this.state.hasGroup) {
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
              selectedDataset={this.state.selectedDataset}
              selectedChartType={this.state.selectedChartType}
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
    } else if(this.state.hasGroup === false){
        return (
            <div style={{position:`absolute`, top:`45%`, left:`50%`, transform:`translate(-50%, -50%)`, display:`flex`, flexDirection:`column`, alignItems:`center`, justifyContent:`center`}}>
                Please apply for a group to use the application!
                <button style={{width:200,  display:`flex`, justifyContent:`center`, alignItems:`center`, marginTop:30}} onClick={() => window.location = "/manage"}>Apply for Group</button>
            </div>
        )
    } else{
        return (
            <div></div>
        )
    }
  }
}
