import React from "react";
import HomeVizCard from "./HomeVizCard";
import { Redirect, BrowserRouter } from "react-router-dom";

require("../css/fullstack.css");
require("../css/HomeContent.css");
var $ = require("jquery");

export default class HomeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveViz: [],
      selectedIndex:-1,
      go:false
    };

    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.selectViz = this.selectViz.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem("viz")
    var saveViz = [];
    this.callBackendAPI("/get_all_saved_viz").then(res => {
      var datas = res.data;
      datas.forEach(data => {
        var keys = Object.keys(data);
        keys.forEach(key => {
          var temp = [];
          temp.push(key);
          temp.push(data[key]);
          saveViz.push(temp);
        });
      });

      this.setState({ saveViz });
    });
  }

  selectViz(index) {
    this.setState({
        selectedIndex:index,
        go:true
    })
  }

  async callBackendAPI(url) {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  render() {
    if(this.state.go) {
        localStorage.setItem('viz', JSON.stringify(this.state.saveViz[this.state.selectedIndex]))
        console.log(localStorage.getItem('viz'))
        window.location = "/visualisation";
    }
    return (
      <div>
        <HomeVizCard title="Saved Visualizations" list={this.state.saveViz} selectViz={this.selectViz}/>
      </div>
    );
  }
}
