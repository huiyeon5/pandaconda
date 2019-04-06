import React from "react";
import "../css/VisualisationPage";
import VisNavBackButton from "./VisNavBackButton";
import VisNavNextButton from "./VisNavNextButton";
import VisSaveButton from "./VisSaveButton";
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
      filter: [],
      topKTog: false,
      topKSort: null,
      topKLimit: null,
      alreadyUpdate: false,
      showSaveName:false
    };
    this.updateSelectedAggregate = this.updateSelectedAggregate.bind(this);
    this.updateSelectedFilter = this.updateSelectedFilter.bind(this);
    this.addFilterObject = this.addFilterObject.bind(this);
    this.updateSpecificFilterObject = this.updateSpecificFilterObject.bind(
      this
    );
    this.toggleTopK = this.toggleTopK.bind(this);
    this.updateTopKSort = this.updateTopKSort.bind(this);
    this.updateTopKLimit = this.updateTopKLimit.bind(this);
    this.postData = this.postData.bind(this);
    this.runQuery = this.runQuery.bind(this);
    this.saveViz = this.saveViz.bind(this);
    this.removeFilterObjects = this.removeFilterObjects.bind(this);
    this.reRender = this.reRender.bind(this);
    this.showSaveViz = this.showSaveViz.bind(this);
    this.handleSaveVizName = this.handleSaveVizName.bind(this);
    this.closeSaveViz = this.closeSaveViz.bind(this);
  }

  componentDidMount() {
      console.log("mount")
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

  runQuery(selectedXAxis, selectedYAxis) {
    this.setState(
      {xaxis: selectedXAxis, yaxis: selectedYAxis},
      () => {
        if(localStorage.getItem('viz') === null) {
          if (this.state.xaxis && this.state.yaxis && this.state.aggregate) {
            var queryObj = {
              selectedData: this.props.dataset,
              headers: [this.state.xaxis, this.state.yaxis],
              aggregate: this.state.aggregate,
              filter: this.state.filter,
              topKSort: this.state.topKSort,
              topKLimit: this.state.topKLimit
            };
            this.postData("/viz_filter_api", queryObj).then(res => {
              this.setState({ data: res.data });
            });
          } else {
            alert("Please make all the necessary Selections to run the charts!");
          }
        } else {
          var item = localStorage.getItem("viz")
          var obj = JSON.parse(item)[1]
          if (this.state.xaxis && this.state.yaxis && this.state.aggregate) {
            var queryObj = {
            selectedData: obj.selectedData,
            headers: [this.state.xaxis, this.state.yaxis],
            aggregate: this.state.aggregate,
            filter: this.state.filter,
            topKSort: this.state.topKSort,
            topKLimit: this.state.topKLimit
            };
            // localStorage.removeItem("viz")
            this.postData("/viz_filter_api", queryObj).then(res => {
            this.setState({ data: res.data });
            });
          } else {
              alert("Please make all the necessary Selections to run the charts!");
          }
        }
      }
    )
  }

  removeFilterObjects() {
    this.setState({ filter: [] });
  }

  showSaveViz() {
    this.setState({showSaveName:true});
  }

  closeSaveViz() {
    this.setState({showSaveName:false});
  }
  
  handleSaveVizName(e) {
    this.setState({saveName:e})
  }

  saveViz() {
    if(this.state.saveName) {

        if(localStorage.getItem('viz') === null) {
            if (this.state.xaxis && this.state.yaxis && this.state.aggregate) {
            var queryObj = {
                selectedData: this.props.dataset,
                headers: [this.state.xaxis, this.state.yaxis],
                aggregate: this.state.aggregate,
                filter: this.state.filter,
                topKTog: this.state.topKTog,
                topKLimit: this.state.topKLimit,
                topKSort: this.state.topKSort,
                plotlyType: this.props.chart.id,
                chartTitle:this.props.chart.chartName,
                vizName:this.state.saveName
            };
            this.postData("/save_visualization", queryObj).then(res => {
                if (res.status === 200) {
                    alert("Visualization Saved!");
                }
                localStorage.removeItem("viz")
                window.location ="/"
            }).catch(err => {
                console.log(err)
            });
            } else {
                alert("Please make all the necessary Selections to run the charts!");
            }
        } else {
            if (this.state.xaxis && this.state.yaxis && this.state.aggregate) {
            var item = localStorage.getItem("viz")
            var obj = JSON.parse(item)[1]
            var queryObj = {
                selectedData: obj.selectedData,
                headers: [this.state.xaxis, this.state.yaxis],
                aggregate: this.state.aggregate,
                filter: this.state.filter,
                topKTog: this.state.topKTog,
                topKLimit: this.state.topKLimit,
                topKSort: this.state.topKSort,
                plotlyType: obj.plotlyType,
                chartTitle: obj.chartTitle,
                vizName:this.state.saveName
            };
            this.postData("/save_visualization", queryObj).then(res => {
                if (res.status === 200) {
                    alert("Visualization Saved!");
                }
                localStorage.removeItem("viz")
                window.location ="/"
            }).catch(err => {
                console.log(err)
            });
            } else {
            alert("Please make all the necessary Selections to run the charts!");
            }
        }
    }   else {
        alert("Please add the name!")
    }
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

  toggleTopK() {
    this.setState(
      prevState => ({
        topKTog: !prevState.topKTog
      }),
      () => {
        if (!this.state.topKTog) {
          this.setState({ topKSort: null, topKLimit: null });
        }
      }
    );
  }

  updateTopKSort(value) {
    this.setState({ topKSort: value });
  }

  updateTopKLimit(value) {
    this.setState({ topKLimit: value });
  }

  componentWillUnmount() {
        console.log("unmount")
      localStorage.removeItem("viz")
  }

  reRender(obj) {
    if (obj) {
        this.postData("/get_headers_api", { selectedData: obj.selectedData })
          .then(res => {
            if (res.status === 200) {
              this.setState({ alreadyUpdate:true,}, ()=> {this.setState({headers: res.headers})});
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
                dataset: obj.selectedData,
                column: colName
              })
                .then(res => {
                  if (res.status === 200) {
                    this.setState(prevState => {
                      let tempHeadersUniqueValues = prevState.headersUniqueValues;
                      tempHeadersUniqueValues[colName] = res.data;
                      return { headersUniqueValues: tempHeadersUniqueValues,  };
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

  render() {
    var item = localStorage.getItem("viz")
    if(item !== null ) {
        var obj = JSON.parse(item)[1]
        if(!this.state.alreadyUpdate) {
            this.postData("/viz_filter_api", obj).then(res => {
                this.setState({ data: res.data },
                () => {
                    this.reRender(obj);
                });
            });
        }
        return (
            <div className="vis-display-container" style={{ position: `relative` }}>
                <VisChartSidebar
                    dataset={obj.selectedData}
                    updateSelectedAggregate={this.updateSelectedAggregate}
                    //   updateSelectedFilter={this.updateSelectedFilter}
                    uniqueValues={this.state.headersUniqueValues}
                    updateSpecificFilterObject={this.updateSpecificFilterObject}
                    addFilterObject={this.addFilterObject}
                    headers={this.state.headers}
                    runQuery={this.runQuery}
                    topKTog={this.state.topKTog}
                    plotlyType={obj.plotlyType}
                    toggleTopK={this.toggleTopK}
                    updateTopKSort={this.updateTopKSort}
                    updateTopKLimit={this.updateTopKLimit}
                />
                <VisChartDisplay
                    dataset={obj.selectedData}
                    plotlyType={obj.plotlyType}
                    chartTitle={obj.chartTitle}
                    data={this.state.data}
                />
                <VisNavBackButton handler={this.props.handler} />
                {/* <VisNavNextButton handler={this.props.handler} /> */}
                <VisSaveButton onClick={this.showSaveViz} />
                <div style={{position:`fixed`, top:`30%`, left:`50%`, transform:`translate(-50%, -50%)`, boxShadow:`0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)`, background:`white`, width: 500, height:250, padding:`10px 10px 0px`, borderRadius:20, display:`none`}}>
                    <h3>Save Visualization</h3>
                    <div style={{position:`absolute`, top:`50%`, left:`50%`, transform:`translate(-50%, -50%)`, width:`60%`}}>
                        <label htmlFor="savevizname">Enter the Name of the Visualization: </label>
                        <input type="text" name="savevizname" id="savevizname"/>
                    </div>
                    <div style={{position:`absolute`, bottom:0, right:0}}>
                        <button style={{backgroundColor:`lightgreen`}} onClick={this.saveViz}>Save</button>
                        <button style={{backgroundColor:`red`}} onClick={this.closeSaveViz}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
      <div className="vis-display-container" style={{ position: `relative` }}>
        <VisChartSidebar
          dataset={this.props.dataset}
          chart={this.props.chart}
          updateSelectedAggregate={this.updateSelectedAggregate}
          //   updateSelectedFilter={this.updateSelectedFilter}
          uniqueValues={this.state.headersUniqueValues}
          updateSpecificFilterObject={this.updateSpecificFilterObject}
          addFilterObject={this.addFilterObject}
          headers={this.state.headers}
          runQuery={this.runQuery}
          topKTog={this.state.topKTog}
          plotlyType={this.props.chart.id}
          toggleTopK={this.toggleTopK}
          updateTopKSort={this.updateTopKSort}
          updateTopKLimit={this.updateTopKLimit}
          removeFilterObjects={this.removeFilterObjects}
        />
        <VisChartDisplay
          dataset={this.props.dataset}
          plotlyType={this.props.chart.id}
          chartTitle={this.props.chart.chartName}
          mode={this.props.chart.mode}
          data={this.state.data}
          xaxis={this.state.xaxis}
          yaxis={this.state.yaxis}
        />
        <VisNavBackButton handler={this.props.handler} />
        {/* <VisNavNextButton handler={this.props.handler} /> */}
        <VisSaveButton onClick={this.showSaveViz} />
        {this.state.showSaveName ? (
            <div style={{position:`fixed`, top:`30%`, left:`50%`, transform:`translate(-50%, -50%)`, boxShadow:`0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)`, background:`white`, width: 500, height:250, padding:`10px 10px 0px`, borderRadius:20}}>
                <h3>Save Visualization</h3>
                <div style={{position:`absolute`, top:`50%`, left:`50%`, transform:`translate(-50%, -50%)`, width:`60%`}}>
                    <label htmlFor="savevizname">Enter the Name of the Visualization: </label>
                    <input type="text" name="savevizname" id="savevizname" onChange={(e) => this.handleSaveVizName(e.target.value)}/>
                </div>
                <div style={{position:`absolute`, bottom:10, right:10}}>
                    <button style={{backgroundColor:`lightgreen`}} onClick={this.saveViz}>Save</button>
                    <button style={{backgroundColor:`red`}} onClick={this.closeSaveViz}>Cancel</button>
                </div>
            </div>
        ): null}
      </div>
    );
  }
}
