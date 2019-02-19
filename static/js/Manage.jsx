import React from 'react'
import ApplyGroup from './ApplyGroup'
import ManageGroupInfo from './ManageGroupInfo'
import ManagerManage from './ManagerManage'

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasGroup:null,
            isManager:false,
            managerId:null,
            groupId:null,
            group_name:null,
            numMember:0
        }
        
        this.callBackendAPI = this.callBackendAPI.bind(this)
    }

    componentDidMount() {
        localStorage.removeItem("viz")
        this.callBackendAPI('/has_group')
        .then(res => {
            if(res.status === 301) {
                this.setState({
                    isManager:true,
                    hasGroup:false
                })
            } else if(res.status === 300) {
                this.setState({
                    isManager: true,
                    hasGroup: true,
                    groupId: res.group_id,
                    managerId: res.managerId
                })
            } else if(res.status === 200) {
                this.setState({
                    hasGroup:true,
                    managerId: res.managerId,
                    numMember: res.numMember,
                    groupId: res.group_id
                })
            } else {
                this.setState({hasGroup:false})
            }
        }).catch(err => {
            console.log(err)
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
            <div style={{width:`100%`, height:`100%`}}>
                {this.state.hasGroup === null ? null : this.state.isManager ? <ManagerManage groupId={this.state.groupId} managerId={this.state.managerId}/> : this.state.hasGroup ? <ManageGroupInfo manager={this.state.managerId} numMember={this.state.numMember} groupId={this.state.groupId}/> : <ApplyGroup />}
            </div>
        )
    }
}

export default Manage