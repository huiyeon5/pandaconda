import React from 'react';
import Plot from 'react-plotly.js';

class Visual extends React.Component {
  render() {
    return (
      <Plot
        data={[
          {
            x: this.props.x,
            y: this.props.y,
            type: this.props.chartName,
            mode: this.state.markers[this.props.chartName],
            marker: {color: 'red'},
          },
        //   {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
    );
  }
}

export default Visual;