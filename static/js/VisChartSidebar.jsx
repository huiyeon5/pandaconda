import React from "react";
import VisChartSidebarSelection from "./VisChartSidebarSelection";
import VisChartSidebarButton from "./VisChartSidebarButton";
import VisChartSidebarFilter from "./VisChartSidebarFilter";
import VisChartSidebarTopKToggle from "./VisChartSidebarTopKToggle";

export default class VisChartSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nonCategoryHeaders: [],
      filterChildren: [],
      xaxis: null,
      yaxis: null,
      aggregate: null,
    };
    this.appendFilter = this.appendFilter.bind(this);
    this.updateSelectedXAxis = this.updateSelectedXAxis.bind(this);
    this.updateSelectedYAxis = this.updateSelectedYAxis.bind(this);
    this.updateSelectedAggregate = this.updateSelectedAggregate.bind(this);
  }

  appendFilter() {
    this.props.addFilterObject();
    this.setState((prevState, props) => ({
      filterChildren: [
        ...prevState.filterChildren,
        <VisChartSidebarFilter
          columns={this.props.headers}
          //   updateSelectedFilter={this.props.updateSelectedFilter}
          updateSpecificFilterObject={this.props.updateSpecificFilterObject}
          key={prevState.filterChildren.length}
          filterIndex={prevState.filterChildren.length}
          //   filterValueSelection={this.props.filterValueSelection}
          uniqueValues={this.props.uniqueValues}
        />
      ]
    }));
  }

  removeAllFilters() {
    this.setState({ filterChildren: [] });
    this.props.removeFilterObjects();
  }

  updateSelectedXAxis(value) { this.setState({ xaxis: value }); }

  updateSelectedYAxis(value) { this.setState({ yaxis: value }); }

  updateSelectedAggregate(value) { this.setState({ aggregate: value }); }

  render() {
    if (this.state.nonCategoryHeaders.length == 0 && this.props.headers.length != 0) {
      var tempList = []
      for(let i = 0; i < this.props.headers.length; i++){
        if (!this.props.selectedDatasetEntities.includes(this.props.headers[i])) {
          console.log("inside")
          tempList.push(this.props.headers[i])
        }
      }
      console.log("tempList: ")
      console.log(tempList)
      this.setState({nonCategoryHeaders: tempList}, () => {console.log("done update")})
    }
    return (
      <div className="vis-display-sidebar vis-card-grid-config">
        <div className="vis-card-title">CONFIGURATION</div>
        <div style={{ marginLeft: "20px"}}>
          <VisChartSidebarSelection
            selectionTitle="X-Axis: "
            dropdownValues={this.props.selectedDatasetEntities}
            update={this.updateSelectedXAxis}
          />
          <VisChartSidebarSelection
            selectionTitle="Y-Axis: "
            dropdownValues={this.state.nonCategoryHeaders}
            update={this.updateSelectedYAxis}
          />
          <VisChartSidebarSelection
            selectionTitle="Aggregate Method: "
            dropdownValues={["SUM", "AVG", "COUNT"]}
            update={this.updateSelectedAggregate}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <VisChartSidebarTopKToggle
            topKTog={this.props.topKTog}
            plotlyType={this.props.plotlyType}
            toggleTopK={this.props.toggleTopK}
            updateTopKSort={this.props.updateTopKSort}
            updateTopKLimit={this.props.updateTopKLimit}
          />
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <button onClick={() => this.appendFilter()} style={{ margin: "25px", textAlign: "center", fontSize: "12px" }}>
              Add Filter
            </button>
            <button onClick={() => this.removeAllFilters()} style={{ margin: "25px", textAlign: "center", fontSize: "12px" }}>
              Remove All Filters
            </button>
          </div>
          {this.state.filterChildren.map(filterChild => filterChild)}
        </div>
        <VisChartSidebarButton onClick={() => this.props.runQuery(this.state.xaxis, this.state.yaxis, this.state.aggregate)} />
      </div>
    );
  }
}
