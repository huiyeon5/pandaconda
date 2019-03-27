import React from 'react'

class ManageExportButton extends React.Component {
    render() {
        return (
            <button  style={{margin:`auto`, width:200, display:`flex`, justifyContent:`center`, alignItems:`center`, gridColumn:`4/5`}} disabled={this.props.disable} onClick={this.props.onClick}>
                Export Data
            </button>
        )
    }
}

export default ManageExportButton