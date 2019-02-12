import React from 'react';
import GroupInfo from './GroupInfo'

class ManageGroupInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            managerName:null,
            managerEmail:null
        }
        this.postData = this.postData.bind(this)
        this.callBackendAPI = this.callBackendAPI.bind(this)
    }

    componentDidMount() {
        var self = this
        this.postData('/get_manager_info',{manager_id:this.props.manager})
        .then(res => {
            if(res.status === 200) {
                this.setState({
                    managerName:res.name,
                    managerEmail:res.email
                })
            }
        })
    }

    
    async postData(url, bodyObj) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyObj)
        });
        const body = await response.json();
        return body;
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
                <GroupInfo manager={this.props.manager} numMember={this.props.numMember} managerName={this.state.managerName} managerEmail={this.state.managerEmail} groupId={this.props.groupId}/>
            </div>
        )
    }
}

export default ManageGroupInfo