import React from 'react'

class ManagePushButtons extends React.Component {


    render() {
        return (<button style={{position:`absolute`, top:`100%`, left:`50%`, transform:`translate(-50%,0%)`, marginTop:5, width:300, display:`flex`, justifyContent:`center`, alignItems:`center`}} onClick={this.props.onClick}>Push to Group Level!</button>)
    }
}

export default ManagePushButtons