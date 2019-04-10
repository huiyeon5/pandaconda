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

  componentDidMount() {
    var filters = this.props.prevFilters;
    var list = []
    if(filters) {
        filters.forEach(filter => {
            var f = <VisChartSidebarFilter 
                        columns={this.props.headers} 
                        updateSpecificFilterObject={this.props.updateSpecificFilterObject}
                        key={list.length}
                        filterIndex={list.length}
                        uniqueValues={this.props.uniqueValues}
                        prevFilter={filter}
                    />
            
            list.push(f);
        })

        this.setState({
            filterChildren:list
        })
    }
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
          tempList.push(this.props.headers[i])
        }
      }
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
            defaultValue={this.props.prevXAxis ? this.props.prevXAxis : null}
            />
          <VisChartSidebarSelection
            selectionTitle="Y-Axis: "
            dropdownValues={this.state.nonCategoryHeaders}
            update={this.updateSelectedYAxis}
            defaultValue={this.props.prevYAxis ? this.props.prevYAxis : null}
            />
          <VisChartSidebarSelection
            selectionTitle="Aggregate Method: "
            dropdownValues={["SUM", "AVG", "COUNT"]}
            update={this.props.updateSelectedAggregate}
            defaultValue={this.props.prevAggregate ? this.props.prevAggregate : null}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <VisChartSidebarTopKToggle
            topKTog={this.props.topKTog}
            plotlyType={this.props.plotlyType}
            toggleTopK={this.props.toggleTopK}
            updateTopKSort={this.props.updateTopKSort}
            updateTopKLimit={this.props.updateTopKLimit}
            prevTopKSort={this.props.prevTopKSort ? this.props.prevTopKSort : null}
            prevTopKLimit={this.props.prevTopKLimit ? this.props.prevTopKLimit :null}
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
