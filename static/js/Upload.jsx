import React from "react";
import "../css/Upload";

export default class Upload extends React.Component {
  render() {
    return (
      <VNav>
        <div className="upload--contentpc">
          <input type="file" onChange={this.handleselectedFile} />
          <button onClick={this.handleUpload}>Upload</button>
        </div>
      </VNav>
    );
  }
}
