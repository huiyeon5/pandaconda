import React from "react";
import Login from "./Login";
import { PageHeader } from "react-bootstrap";
import VisualisationContent from "./VisualisationContent";

require("../css/fullstack.css");
var $ = require("jquery");

export default class App extends React.Component {
  render() {
    return (
      <div>
        <VisualisationContent />
      </div>
    );
  }
}
