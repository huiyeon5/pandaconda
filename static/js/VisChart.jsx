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
      data: null,
      filter: []
    };
    this.updateSelectedXAxis = this.updateSelectedXAxis.bind(this);
    this.updateSelectedYAxis = this.updateSelectedYAxis.bind(this);
    this.updateSelectedAggregate = this.updateSelectedAggregate.bind(this);
    this.updateSelectedFilter = this.updateSelectedFilter.bind(this);
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

  render() {
    return (
      <div className="vis-display-container">
        <VisChartSidebar
          dataset={this.props.dataset}
          chart={this.props.chart}
          updateSelectedXAxis={this.updateSelectedXAxis}
          updateSelectedYAxis={this.updateSelectedYAxis}
          updateSelectedAggregate={this.updateSelectedAggregate}
          updateSelectedFilter={this.updateSelectedFilter}
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
