import React from "react";
import "../css/VisualisationPage";
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

var $ = require("jquery");

export default class VisualisationContent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getData() {
    var sampleData = require("./SampleData.js").data;
    this.state = {
      data: sampleData
    };
  }

  render() {
    {
      this.getData();
    }
    return (
      <div className="vis-container">
        <div className="vis-parameters" />
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
    );
  }
}
