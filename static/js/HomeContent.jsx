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
      go:false,
      hasGroup: null
    };

    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.selectViz = this.selectViz.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem("viz")
    var saveViz = [];
    this.callBackendAPI("/has_group")
    .then(result => {
        if(result.status === 200 || result.status === 300) {
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
          
                this.setState({ saveViz, hasGroup:true });
            });
        } else {
            this.setState({hasGroup:false})
        }
    }).catch(err => {
        console.log(err);
    })
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
      <div style={this.state.hasGroup ? {} : {width:`100%`, height:`100%`, position:`relative`}}>
        {this.state.hasGroup === null ? 
            null : 
            this.state.hasGroup ? 
                <HomeVizCard title="Saved Visualizations" list={this.state.saveViz} selectViz={this.selectViz}/>
            : <div style={{position:`absolute`, top:`45%`, left:`50%`, transform:`translate(-50%, -50%)`, display:`flex`, flexDirection:`column`, alignItems:`center`, justifyContent:`center`}}>
                Please apply for a group to use the application!
                <button style={{width:200,  display:`flex`, justifyContent:`center`, alignItems:`center`, marginTop:30}} onClick={() => window.location = "/manage"}>Apply for Group</button>
            </div>
        }
      </div>
    );
  }
}
