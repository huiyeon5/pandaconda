import React from 'react'
import ApplyGroup from './ApplyGroup'
import ManageGroupInfo from './ManageGroupInfo'

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasGroup:null,
            managerId:null,
            groupId:null,
            numMember:0
        }
        
        this.callBackendAPI = this.callBackendAPI.bind(this)
    }

    componentDidMount() {
        this.callBackendAPI('/has_group')
        .then(res => {
            if(res.status === 200) {
                this.setState({
                    hasGroup:true,
                    managerId: res.managerId,
                    numMember: res.numMember,
                    groupId: res.group_id
                })
            } else {
                this.setState({hasGroup:false})
            }
        })
    }

    async callBackendAPI(url) {
        const response = await fetch(url);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }

    render() {
        return (
            <div>
                {this.state.hasGroup === null ? null : this.state.hasGroup ? <ManageGroupInfo manager={this.state.managerId} numMember={this.state.numMember} groupId={this.state.groupId}/> : <ApplyGroup />}
            </div>
        )
    }
}

export default Manage