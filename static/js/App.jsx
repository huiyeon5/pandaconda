import React from "react";
import Table from "./Table";
import { PageHeader } from "react-bootstrap";

require("../css/fullstack.css");
var $ = require("jquery");

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Table />
      </div>
    );
  }
}
