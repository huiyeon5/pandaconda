import React from 'react'

class ManagePushButtons extends React.Component {


    render() {
        return (<button style={{margin:`auto`, width:300, display:`flex`, justifyContent:`center`, alignItems:`center`, gridColumn:`1/3`}} onClick={this.props.onClick}>Push to Group Level!</button>)
    }
}

export default ManagePushButtons