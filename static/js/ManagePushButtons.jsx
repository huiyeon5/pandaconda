import React from 'react'

class ManagePushButtons extends React.Component {


    render() {
        return (<button style={{width:400, display:`flex`, justifyContent:`center`, alignItems:`center`, gridColumn:`1/4`, gridRow:`3/4`, justifySelf:`start`, alignSelf:`center`}} onClick={this.props.onClick}>Push to Group Level!</button>)
    }
}

export default ManagePushButtons