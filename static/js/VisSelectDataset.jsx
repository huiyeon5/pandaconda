import React from "react";
import "../css/VisualisationPage";
import VisSelectDataSetItem from "./VisSelectDatasetItem";

export default class VisSelectDataSet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const datasetItemComponents = this.props.datasetItems.map(function(
      datasetItem
    ) {
      return (
        <VisSelectDataSetItem
          key={datasetItem.id}
          id={datasetItem.id}
          name={datasetItem.name}
        />
      );
    });

    return (
      <div className="vis-select-dataset vis-card-grid">
        <div className="vis-card-title">Select Your Dataset</div>
        <form className="form">{datasetItemComponents}</form>
      </div>
    );
  }
}
