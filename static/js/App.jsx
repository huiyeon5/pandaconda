import React from "react";
import VNav from "./VNav";
import Login from "./Login";
import Signup from "./Signup";
import Upload from "./Upload";
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
