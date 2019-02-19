import React from 'react';
import ManagerCreateForm from './ManagerCreateForm'

class ManagerNoGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: true
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        return (
            <div style={{ height:`100%`, display:`grid`, gridTemplateRows:`120px auto`}}>
                <div style={{}}>
                    <h2>Create New Group!</h2>
                    <button style={{width:300, display:`flex`, justifyContent:`center`, alignItems:`center`, margin:`auto`}} onClick={this.handleToggle}>Click Here to get Started!</button>
                </div>
                {this.state.toggle ? null : <ManagerCreateForm />}
            </div>
        )
    }
}

export default ManagerNoGroup;