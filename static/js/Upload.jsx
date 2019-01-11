import React from "react";
import "../css/VNav";
import VNav from "./VNav";
import HNav from "./HNav";

export default class Upload extends React.Component {
  render() {
    return (
      <div>
        <VNav >
        hello testing
        <input type="file" />
      </div>
    );
  }
}
