import React from "react";
import Signup from "./Signup";
import { PageHeader } from "react-bootstrap";

require("../css/fullstack.css");
var $ = require("jquery");

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Signup />
      </div>
    );
  }
}
