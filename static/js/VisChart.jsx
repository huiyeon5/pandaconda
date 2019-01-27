import React from "react";
import "../css/VisualisationPage";
import VisNavBackButton from "./VisNavBackButton";
import VisNavNextButton from "./VisNavNextButton";
import VisChartSidebar from "./VisChartSidebar";
import VisChartDisplay from "./VisChartDisplay";

export default class VisChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xaxis: null,
      yaxis: null,
      aggregate: null,
      headers: [],
      headersUniqueValues: {},
      data: null,
      filter: []
    };
    this.updateSelectedXAxis = this.updateSelectedXAxis.bind(this);
    this.updateSelectedYAxis = this.updateSelectedYAxis.bind(this);
    this.updateSelectedAggregate = this.updateSelectedAggregate.bind(this);
    this.updateSelectedFilter = this.updateSelectedFilter.bind(this);
    this.addFilterObject = this.addFilterObject.bind(this);
    this.updateSpecificFilterObject = this.updateSpecificFilterObject.bind(this);
    this.postData = this.postData.bind(this);
    this.runQuery = this.runQuery.bind(this);
  }

  componentDidMount() {
    if (this.props.dataset) {
      this.postData("/get_headers_api", { selectedData: this.props.dataset })
        .then(res => {
          if (res.status === 200) {
            this.setState({ headers: res.headers });
          }
        })
        .then(() => {
          if (this.state.headers) {
            let tempDict = {};
            for (var i = 0; i < this.state.headers.length; i++) {
              tempDict[this.state.headers[i]] = null;
            }
            this.setState({ headersUniqueValues: tempDict });
          }
        })
        .then(() => {
          for (var i = 0; i < this.state.headers.length; i++) {
            let colName = this.state.headers[i];
            this.postData("/get_headers_unique_values_api", {
              dataset: this.props.dataset,
              column: colName
            })
              .then(res => {
                if (res.status === 200) {
                  this.setState(prevState => {
                    let tempHeadersUniqueValues = prevState.headersUniqueValues;
                    tempHeadersUniqueValues[colName] = res.data;
                    return { headersUniqueValues: tempHeadersUniqueValues };
                  });
                }
              })
              .catch(err =>
                console.log(colName, "column has no response", err)
              );
          }
        })
        .catch(err => console.log(err));
    }
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

  runQuery() {
    console.log("running");
    if (this.state.xaxis && this.state.yaxis && this.state.aggregate) {
      var queryObj = {
        selectedData: this.props.dataset,
        headers: [this.state.xaxis, this.state.yaxis],
        aggregate: this.state.aggregate,
        filter: this.state.filter
      };
      this.postData("/viz_filter_api", queryObj).then(res => {
        this.setState({ data: res.data });
      });
    } else {
      alert("Please make all the necessary Selections to run the charts!");
    }
  }

  updateSelectedXAxis(value) {
    this.setState({ xaxis: value });
  }

  updateSelectedYAxis(value) {
    this.setState({ yaxis: value });
  }

  updateSelectedAggregate(value) {
    this.setState({ aggregate: value });
  }

  updateSelectedFilter(value) {
    this.setState(prevState => ({
      filter: [...prevState.filter, value]
    }));
  }

  addFilterObject() {
    var obj = { column: null, condition: null, value: null };
    this.setState(prevState => ({
      filter: [...prevState.filter, obj]
    }));
  }

  updateSpecificFilterObject(i, key, value) {
    var filterList = this.state.filter;
    var obj = filterList[i];
    obj[key] = value;
    filterList[i] = obj;
    this.setState({ filter: filterList });
  }

  render() {
    return (
      <div className="vis-display-container">
        <VisChartSidebar
          dataset={this.props.dataset}
          chart={this.props.chart}
          updateSelectedXAxis={this.updateSelectedXAxis}
          updateSelectedYAxis={this.updateSelectedYAxis}
          updateSelectedAggregate={this.updateSelectedAggregate}
          //   updateSelectedFilter={this.updateSelectedFilter}
          uniqueValues={this.state.headersUniqueValues}
          updateSpecificFilterObject={this.updateSpecificFilterObject}
          addFilterObject={this.addFilterObject}
          headers={this.state.headers}
          runQuery={this.runQuery}
        />
        <VisChartDisplay
          dataset={this.props.dataset}
          plotlyType={this.props.chart.id}
          chartTitle={this.props.chart.chartName}
          data={this.state.data}
        />
        <VisNavBackButton handler={this.props.handler} />
        <VisNavNextButton handler={this.props.handler} />
      </div>
    );
  }
}
