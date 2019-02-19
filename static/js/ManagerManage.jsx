import React from 'react';
import ManagerHasGroup from './ManagerHasGroup';
import ManagerNoGroup from './ManagerNoGroup';

class ManagerManage extends React.Component {
    render() {
        if(this.props.groupId === null) {
            return (
                <div style={{height:`100%`}}>
                    <ManagerNoGroup />
                </div>
            )
        } else {
            return (
                <div style={{height:`100%`}}>
                    <h1>Manager Manage</h1>
                    <ManagerHasGroup managerId={this.props.managerId}/>
                </div>
            );
        }
    }
}

export default ManagerManage;