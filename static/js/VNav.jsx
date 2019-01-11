import React from "react";
import "../css/VNav";

import logo from "../images/pandaconda_logo.png";

export default class VNav extends React.Component {
  render() {
    return (
      <div className="VNav">
        <div className="vertical-background">
          <img src={logo} style={{ width: 100 }} />
          <ul>
            <li className="vertical">
              <a className="nav" href="#">
                Home
              </a>
            </li>
            <li className="vertical">
              <a className="nav" href="#">
                Data
              </a>
            </li>
            <li className="vertical">
              <a className="nav" href="#">
                Visualization
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
