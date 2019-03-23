import React from 'react';
import GroupInfo from './GroupInfo'
import DatasetViewer from './DatasetViewer'
import ManagePushButtons from './ManagePushButtons'
import ManageExportButton from './ManageExportButton'

class ManageGroupInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            managerName:null,
            managerEmail:null,
            yourData:null,
            groupData:null,
            selectedDataset: null,
            selectedGroupDataset: null
        }
        this.postData = this.postData.bind(this)
        this.callBackendAPI = this.callBackendAPI.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.pushToGroup = this.pushToGroup.bind(this)
        this.exportData = this.exportData.bind(this)
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
        // console.log(bodyObj)
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
        // console.log(name)
        this.setState({selectedDataset:name})
    }

    pushToGroup() {
        if(this.state.selectedDataset === null) {
            alert("Please select a dataset to Push!")
        }else {
            var self = this
            this.postData('/push_to_group', {data_name:this.state.selectedDataset})
            .then(res => {
                if(res.status === 200) {
                    alert("Dataset is now at Group Level!")
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
                } else {
                    alert("Dataset Already exists on Group Level!")
                }
            })
        }
    }

    exportData() {
        if(this.state.selectedDataset === null) {
            alert("Please Select a Dataset to export!");
        } else {
            this.postData('/get_data_for_export', {dataset: this.state.selectedDataset})
            .then(res => {
                if(res.status === 200) {
                    var dataToExport = res.data;
                    var lineArray = [];
                    dataToExport.forEach(function (infoArray, index) {
                        var line = infoArray.join(",");
                        lineArray.push(index == 0 ? "data:text/csv;charset=utf-8," + line : line);
                    });
                    var csvContent = lineArray.join("\n");
                    var encodedUri = encodeURI(csvContent);
                    var link = document.createElement("a");
                    link.setAttribute("href", encodedUri);
                    link.setAttribute("download", this.state.selectedDataset + ".csv");
                    document.body.appendChild(link); // Required for FF
                    link.click(); 
                } else {
                    alert("There seems to be an error!")
                }
            })
        }
    }

    render() {
        
        return (
            <div style={{ width:`100%`, height:`100%`}}>
                <div style={{display:`grid`, gridTemplateColumns:`1fr 1fr 1fr 1fr`, gridTemplateRows:`1fr 250px 50px`, position:`relative`, width:`100%`, height:`100%`, gridGap:20}}>
                    <GroupInfo manager={this.props.manager} numMember={this.props.numMember} managerName={this.state.managerName} managerEmail={this.state.managerEmail} groupId={this.props.groupId}/>
                    {this.state.groupData === null ? null : <DatasetViewer title="Group Datasets" data={this.state.groupData} onClick={this.handleClick}/>}
                    {this.state.yourData === null ? null : <DatasetViewer title="Your Datasets" data={this.state.yourData} select={true} onClick={this.handleClick}/>}
                    <ManagePushButtons onClick={this.pushToGroup}/>
                    <ManageExportButton onClick={this.exportData} disable={this.state.selectedDataset === null && this.state.selectedGroupDataset === null}/>
                </div>
            </div>
        )
    }
}

export default ManageGroupInfo