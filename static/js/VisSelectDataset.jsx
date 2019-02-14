import React from "react";
import "../css/VisualisationPage";
import VisSelectDatasetItem from "./VisSelectDatasetItem";
import VisChartSidebarSelection from "./VisChartSidebarSelection";

export default class VisSelectDataSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasetType: "personal",
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
        if (this.state.datasetType === "personal") {
          this.setState({ data: this.props.datasetNames["yourData"] });
        } else {
          this.setState({ data: this.props.datasetNames["groupData"] });
        }
      }
    );
  }

  render() {
    const selectDatasetHandler = this.props.selectDatasetHandler;
    const datasetItemComponents = this.state.data.map(function(datasetItem, i) {
      return (
        <VisSelectDatasetItem
          id={i}
          key={i}
          name={datasetItem}
          selectDatasetHandler={selectDatasetHandler}
        />
      );
    });

    return (
      <div
        className="vis-select-dataset vis-card-grid"
        style={{ display: "grid", gridTemplateRows: "80px 30px 1fr" }}
      >
        <div className="vis-card-title">Select Your Dataset</div>
        <VisChartSidebarSelection
          selectionTitle="Dataset Type: "
          dropdownValues={["personal", "group"]}
          default="-"
          update={this.updateDatasetType}
        />
        <form className="form">{datasetItemComponents}</form>
      </div>
    );
  }
}
