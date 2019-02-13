import React from 'react';
import GroupInfo from './GroupInfo'
import DatasetViewer from './DatasetViewer'

class ManageGroupInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            managerName:null,
            managerEmail:null,
            yourData:null,
            groupData:null,
            selectedDataset: null
        }
        this.postData = this.postData.bind(this)
        this.callBackendAPI = this.callBackendAPI.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        var self = this
        this.postData('/get_manager_info',{manager_id:this.props.manager})
        .then(res => {
            if(res.status === 200) {
                self.callBackendAPI('/get_group_user_dataset')
                .then(r => {
                    if(r.status !== 400) {
                        this.setState({
                            managerName:res.name,
                            managerEmail:res.email,
                            yourData:r.yourData,
                            groupData:r.groupData
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
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

    handleClick(name) {
        this.setState({selectedDataset:name})
    }

    render() {
        
        return (
            <div style={{display:`grid`, gridTemplateColumns:`1fr 1fr`, gridTemplateRows:`1fr 1fr`, gridGap:`20px`}}>
                <GroupInfo manager={this.props.manager} numMember={this.props.numMember} managerName={this.state.managerName} managerEmail={this.state.managerEmail} groupId={this.props.groupId}/>
                {this.state.groupData === null ? null : <DatasetViewer title="Group Datasets" data={this.state.groupData}/>}
                {this.state.yourData === null ? null : <DatasetViewer title="Your Datasets" data={this.state.yourData} select={true}/>}
            </div>
        )
    }
}

export default ManageGroupInfo