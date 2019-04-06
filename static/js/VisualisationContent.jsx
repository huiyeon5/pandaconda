import React from "react";
import "../css/VisualisationPage";
import VisSelection from "./VisSelection";
import VisRecAnalysis from "./VisRecAnalysis";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import VisChart from "./VisChart";

var $ = require("jquery");

export default class VisualisationContent extends React.Component {
  constructor() {
    super();
    this.state = {
      // Current page var
      currentPage: "selection",
      // User info var
      hasGroup:null,
      datasetNames: {},
      // Select dataset var
      selectedDataset: null,
      selectedDatasetEntities: [],
      // Select chart var
      selectedChartType: null,
      // Select entity recommended analysis var
      selectedEntity: null,
      selectedAnalysis: null,
      selectedEntityVariableData: null,
      // Select next page
      selectedNextPage: null,
      // Hard-coded chart types
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
        }
      ],
      
    };
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.postData = this.postData.bind(this);
    this.navPageHandler = this.navPageHandler.bind(this);
    this.selectDatasetHandler = this.selectDatasetHandler.bind(this);
    this.selectChartTypeHandler = this.selectChartTypeHandler.bind(this);
    this.selectEntityHandler = this.selectEntityHandler.bind(this);
  }

  /*Check if the user has a group, if have, get all the user's datasets and update "datasetNames" in state*/
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

  /*Post API call template*/
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

  /* Get API call template */
  async callBackendAPI(url) {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  /* Change the current page, triggered when click "next" or "back" button */
  // TODO: need to edit this to account for "rec" page
  navPageHandler(value) {
    let inputSet = {
      currentPage: value
    }
    if (value === "selection") {
      // Reset dataset var
      inputSet.selectedDataset = null;
      inputSet.selectedDatasetEntities = [];
      // Reset chart var
      inputSet.selectedChartType = null;
      // Reset rec var
      inputSet.selectedEntity = null;
      inputSet.selectedAnalysis = null;
      inputSet.selectedEntityVariableData = null;
    }
    console.log(inputSet)
    this.setState(inputSet);
  }

  /*  Handler triggered when a dataset is selected
      - Update state "selectedDataset"
      - Call API to get entities of the selected dataset
      - Update state "selectedDatasetEntities"
  */
  selectDatasetHandler(value) {
    this.setState(
      { selectedDataset: value },
      () => {
        if (this.state.selectedDataset) {
          this.postData(
            "/get_entities_from_dataset_api", 
            {dataset: this.state.selectedDataset}
          ).then(res => {
            if (res.status === 200 && res.data) {
              this.setState({ selectedDatasetEntities : res.data })
            }
          }) 
        }
      }
    )
  }

  /*  Handler triggered when a Chart Type is selected
      - Update state "selectedChartType"
      - Reset state "selectedEntity"
  */
 // TODO: might need to clear the selection option here?
  selectChartTypeHandler(value) {
    if (value) { 
      this.setState({ 
        selectedChartType: value, 
        selectedEntity: null, 
        selectedEntityVariableData: null, 
        selectedAnalysis: null,
        selectedNextPage: "chart",
      });
    } else {
      this.setState({ 
        selectedChartType: null,
        selectedNextPage: null,
      });
    }
  }

  /*  Handler triggered when an Entity Analysis is selected 
      - Update both "selectedEntity" and "selectedAnalysis" in state
      - Call API to get the analysis data based on the selection
      - Update state of the data
  */
  selectEntityHandler(value, analysis) {
    console.log("selectEntityHandler")
    if (value && analysis) {
      this.setState(
        { selectedEntity: value,
          selectedAnalysis: analysis,
          selectedNextPage: "rec",
        },
        () => {
          this.postData("/get_prebuilt_analysis", {
            dataset: this.state.selectedDataset,
            entity: this.state.selectedEntity,
            analysis: this.state.selectedAnalysis
          }).then (res => {
            console.log(res)
            if (res.headers && res.values) {
              this.setState({ selectedEntityVariableData: res})
            }
          })
        }
      );
    }else {
      this.setState({ 
        selectedEntity: null,
        selectedAnalysis: null,
        selectedNextPage: null,
      })
    }
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
        /* Go to selection page */
        if (this.state.currentPage === "selection") {
          return (
            <VisSelection
              // Page navigation handler
              handler={this.navPageHandler}
              // Dataset
              datasetNames={this.state.datasetNames}
              selectDatasetHandler={this.selectDatasetHandler}
              // Chart
              chartTypes={this.state.chartTypes}
              selectChartTypeHandler={this.selectChartTypeHandler}
              // Entity
              selectedDatasetEntities={this.state.selectedDatasetEntities}
              selectEntityHandler={this.selectEntityHandler}
              // Check "Enable/Disable" Next Button
              selectedDataset={this.state.selectedDataset}
              selectedChartType={this.state.selectedChartType}
              selectedAnalysis={this.state.selectedAnalysis}
              selectedEntity={this.state.selectedEntity}
              selectedEntityVariableData={this.state.selectedEntityVariableData}
              // Page navigation Next Button
              selectedNextPage={this.state.selectedNextPage}
            />
          );
        /* Go to chart page */
        } else if (this.state.currentPage === "chart") {
          return (
            <VisChart
              handler={this.navPageHandler}
              dataset={this.state.selectedDataset}
              chart={this.state.selectedChartType}
              selectedDatasetEntities={this.state.selectedDatasetEntities}
            />
          );
        /* Go to rec page */
        } else if (this.state.currentPage === "rec") {
          console.log("Go to rec page")
          return (
            <VisRecAnalysis 
              handler={this.navPageHandler}
              selectedEntity={this.state.selectedEntity}
              selectedDataset={this.state.selectedDataset}
              selectedAnalysis={this.state.selectedAnalysis}
              selectedEntityVariableData={this.state.selectedEntityVariableData}
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
