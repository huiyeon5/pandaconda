import React from 'react'

class ManageExportButton extends React.Component {
    render() {
        return (
            <button  style={{width:`250px`, display:`flex`, justifyContent:`center`, alignItems:`center`, gridColumn:`4/5`, gridRow:`3/4`, justifySelf:`end`, alignSelf:`center`}} disabled={this.props.disable} onClick={this.props.onClick}>
                Export Data
            </button>
        )
    }
}

export default ManageExportButton