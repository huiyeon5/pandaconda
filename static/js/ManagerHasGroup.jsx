import React from 'react';

class ManagerHasGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email:null,
            headers: [],
            groupData:null,
            numMembers:0
        }
        this.postData = this.postData.bind(this);
        this.callBackendAPI = this.callBackendAPI.bind(this);
    }

    componentDidMount() {
        this.postData('/get_manager_info', { manager_id : this.props.managerId })
        .then(res => {
            if(res.status === 200) {
                this.callBackendAPI('/get_valid_headers')
                .then(ress => {
                    this.callBackendAPI('/get_group_user_dataset')
                    .then(r => {
                        if(r.status != 400) {
                            this.callBackendAPI('/get_num_group_members')
                            .then(o => {
                                this.setState({
                                    name:res.name,
                                    email: res.email,
                                    headers:ress.data,
                                    groupData: r.groupData,
                                    numMembers: o.member
                                });
                            })
                        }
                    })
                }).catch(errr => {
                    console.log(errr);
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

    render() {
        return (
            <div style={{width:`100%`, height:`100%`, display:`grid`, gridTemplateColumns:`1fr 1fr`, gridTemplateRows:`1fr 1fr`, gridGap:20}}>
                <div style={{background:`white`, borderRadius:5, boxShadow:`gray 0px 4px 4px -2px`, width:`100%`, height:`100%`, position:`relative`}}>
                    <h1 style={{textAlign:`center`}}>Group Info:</h1>
                    <ul style={{position:`absolute`, listStyle:`none`, top:`50%`, left:`50%`, transform:`translate(-50%, -50%)`}}>
                        <li><b>Manager Name:</b> {this.state.name}</li> 
                        <li><b>Manager Email:</b> {this.state.email}</li>
                        <li><b>Number of Group Datasets:</b> {this.state.groupData ? this.state.groupData.length : 0}</li>
                        <li><b>Number of Members:</b> {this.state.numMembers}</li>
                        <li><b>Number of Valid Headers:</b> {this.state.headers ? this.state.headers.length : 0}</li>
                    </ul>
                </div>
                <div style={{background:`white`, borderRadius:5, boxShadow:`gray 0px 4px 4px -2px`, width:`100%`, height:`100%`, display:`grid`, gridTemplateRows:`40px auto`}}>
                    <h1 style={{textAlign:`center`}}>Group Valid Headers</h1>
                    <table style={{margin:`auto`}}>
                        <tr>
                            <th style={{border:`1px solid #ddd`, padding:4}}>Header Name</th>
                            <th style={{border:`1px solid #ddd`, padding:4}}>Header Data Type</th>
                        </tr>
                        {this.state.headers ? this.state.headers.map((header, i) => (
                            <tr key={i}>
                                <td style={{border:`1px solid #ddd`, padding:4}}><b>{header[0]}</b>:</td>
                                <td style={{border:`1px solid #ddd`, padding:4}}>{header[1]}</td>
                                <td style={{color:`blue`, textDecoration:`underline`, cursor:`pointer`}}>Edit</td>
                            </tr>
                        )): null}
                    </table>
                </div>
            </div>
        )
    }
}

export default ManagerHasGroup