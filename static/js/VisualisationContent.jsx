import React from "react";
import "../css/VisualisationPage";
import VisSelection from "./VisSelection";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import VisChart from "./VisChart";

var $ = require("jquery");

export default class VisualisationContent extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: "selection",
      datasetNames: [
        {
          id: "item-1",
          name: "inventory.csv"
        },
        {
          id: "item-2",
          name: "sku.csv"
        },
        {
          id: "item-3",
          name: "movement.csv"
        }
      ],
      test: true
    };
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.navPageHandler = this.navPageHandler.bind(this);
  }

  /*
  Example Code:
  
  componentDidMount() {
    const posts = new Request("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
      "Content-Type": "application/json"
    });

    fetch(posts)
      .then(response => {
        return response.json();
      })
      .then(posts => {
        // When the promise has resolved we can adjust our state letting the UI know that we're no longer loading
        // and that we're ready to start showing some posts.
        debugger;
        this.setState({
          posts,
          loading: !this.state.loading
        });
      });
  }
  */

  componentDidMount() {
    console.log("In ComponentDidMount method");
    this.callBackendAPI("/get_all_dataset_api")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getData() {
    var sampleData = require("./SampleData.js").data;
    this.state = {
      data: sampleData
    };
  }

  // GET METHOD CALL
  async callBackendAPI(url) {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  /*
  <div className="vis-container">
    <div className="vis-parameters">
      
    </div>
    <div className="vis-display">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          // width={600}
          // height={300}
          data={this.state.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="ActivityDate" minTickGap={30} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Inventory"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
  */

  navPageHandler(value) {
    console.log("clicked " + value);
    this.setState({ currentPage: value });
  }

  render() {
    if (this.state.currentPage === "selection") {
      console.log("Vis Selection");
      console.log(this.state);
      return (
        <VisSelection
          handler={this.navPageHandler}
          datasetItems={this.state.datasetNames}
        />
      );
    } else if (this.state.currentPage === "chart") {
      console.log("Vis Display");
      console.log(this.state);
      return <VisChart handler={this.navPageHandler} />;
    }
  }
}
