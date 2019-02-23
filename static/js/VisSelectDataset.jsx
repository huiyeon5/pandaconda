import React from "react";
import "../css/VisualisationPage";
import VisSelectDatasetItem from "./VisSelectDatasetItem";
import VisChartSidebarSelection from "./VisChartSidebarSelection";
import { faDirections } from "@fortawesome/free-solid-svg-icons";

export default class VisSelectDataSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetType: "",
      data: []
    };
    this.updateDatasetType = this.updateDatasetType.bind(this);
  }

  // componentDidMount() {
  //   this.setState({ data: this.props.datasetNames["yourData"] });
  // }

  updateDatasetType(value) {
    console.log("value: " + value);
    this.setState(
      {
        datasetType: value
      },
      () => {
        if (this.state.datasetType === "Your Uploaded Datasets") {
          this.setState({ data: this.props.datasetNames["yourData"] });
        } else {
          this.setState({ data: this.props.datasetNames["groupData"] });
        }
      }
    );
  }

  render() {
    const selectDatasetHandler = this.props.selectDatasetHandler;
    let datasetItemComponents = this.state.data.map(function(datasetItem, i) {
      return (
        <VisSelectDatasetItem
          id={i}
          key={i}
          name={datasetItem}
          selectDatasetHandler={selectDatasetHandler}
        />
      );
    });
    if (datasetItemComponents.length == 0) {
      datasetItemComponents = undefined;
    }

    return (
      <div
        className="vis-select-dataset vis-card-grid"
        style={{ display: "grid", gridTemplateRows: "80px 30px 1fr" }}
      >
        <div className="vis-card-title">Select Your Dataset</div>
        <div
          style={{ width: `100%`, display: `flex`, justifyContent: `center` }}
        >
          <VisChartSidebarSelection
            selectionTitle="Please choose the dataset to be visualised: "
            dropdownValues={["Your Uploaded Datasets", "Group's Uploaded Datasets"]}
            default="-"
            update={this.updateDatasetType}
          />
        </div>
        <form className="form" style={{display: `flex`, flexDirection: `column`}}>{(this.state.datasetType == "" || datasetItemComponents !== undefined) ? datasetItemComponents : <div style={{display: `flex`, flexDirection: `column`, alignItems: `center`, justifyContent: `center`}}>No dataset found</div>}</form>
      </div>
    );
  }
}
