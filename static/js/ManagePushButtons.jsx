import React from 'react'

class ManagePushButtons extends React.Component {


    render() {
        return (<button style={{margin:`auto`, width:400, display:`flex`, justifyContent:`center`, alignItems:`center`, gridColumn:`1/4`}} onClick={this.props.onClick}>Push to Group Level!</button>)
    }
}

export default ManagePushButtons