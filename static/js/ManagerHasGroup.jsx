import React from 'react';

class ManagerHasGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email:null,
            headers: [],
            groupData:null,
            numMembers:0,
            changed: {}
        }
        this.postData = this.postData.bind(this);
        this.callBackendAPI = this.callBackendAPI.bind(this);
        this.editHeader = this.editHeader.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
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

    editHeader(i) {
        // console.log("here" + str(i))
        document.querySelector(`.edit${i}`).style.display='none';
        var val = document.querySelector(`.originalName${i}`);
        val.style.display='none';
        document.querySelector(`.originalValue${i}`).style.display='none';
        document.querySelector(`.save${i}`).style.display='table-cell';
        document.querySelector(`.cancel${i}`).style.display='table-cell';
        var newHead = document.querySelector(`.headerName${i}`);
        newHead.style.display='table-cell';
        document.querySelector(`.headerValue${i}`).style.display='table-cell';
        var obj = this.state.changed;
        obj[i] = [val.textContent, null, null];
        this.setState({
            changed: obj
        })
    }
    
    cancelEdit(i) {
        // console.log("here" + str(i))
        document.querySelector(`.edit${i}`).style.display='table-cell';
        document.querySelector(`.originalName${i}`).style.display='table-cell';
        document.querySelector(`.originalValue${i}`).style.display='table-cell';
        document.querySelector(`.save${i}`).style.display='none';
        document.querySelector(`.cancel${i}`).style.display='none';
        document.querySelector(`.headerName${i}`).style.display='none';
        document.querySelector(`.headerValue${i}`).style.display='none';
        delete this.state.changed[i]
    }

    editNewText(e, i) {
        var newString = e.target.value;
        var obj = this.state.changed;
        var newList = obj[i];
        newList[1] = newString;
        obj[i] = newList
        this.setState({
            changed: obj
        })
    }

    editNewType(e, i) {
        let {value} = e.target;
        var obj = this.state.changed;
        var newList = obj[i];
        newList[2] = value;
        obj[i] = newList
        this.setState({
            changed: obj
        })
    }

    submit() {
        this.postData('/change_valid_header', {headers: this.state.changed})
        .then(res => {
            if(res.status === 200) {
                alert("Changed!")
                window.location.reload();
            } else {
                alert("Make all selections!")
            }
        })
    }



    render() {
        return (
            <div style={{width:`100%`, height:`100%`, display:`grid`, gridTemplateColumns:`1fr 1fr`, gridTemplateRows:`1fr 1fr`, gridGap:20}}>
                <div style={{background:`white`, borderRadius:5, boxShadow:`gray 0px 4px 4px -2px`, width:`100%`, height:`40vh`, position:`relative`}}>
                    <h1 style={{textAlign:`center`}}>Group Info:</h1>
                    <ul style={{position:`absolute`, listStyle:`none`, top:`50%`, left:`50%`, transform:`translate(-50%, -50%)`}}>
                        <li><b>Manager Name:</b> {this.state.name}</li> 
                        <li><b>Manager Email:</b> {this.state.email}</li>
                        <li><b>Number of Group Datasets:</b> {this.state.groupData ? this.state.groupData.length : 0}</li>
                        <li><b>Number of Members:</b> {this.state.numMembers}</li>
                        <li><b>Number of Valid Headers:</b> {this.state.headers ? this.state.headers.length : 0}</li>
                    </ul>
                </div>
                <div style={{background:`white`, borderRadius:5, boxShadow:`gray 0px 4px 4px -2px`, width:`100%`, height:`40vh`, display:`grid`, gridTemplateRows:`40px auto`, overflowY:`scroll`}}>
                    <h1 style={{textAlign:`center`}}>Group Valid Headers</h1>
                    <table style={{margin:`auto`, marginTop: 20}}>
                        <thead>
                            <tr>
                                <th style={{border:`1px solid #ddd`, padding:4}}>Header Name</th>
                                <th style={{border:`1px solid #ddd`, padding:4}}>Header Data Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.headers ? this.state.headers.map((header, i) => (
                                <tr key={i}>
                                    <td className={`originalName${i}`}style={{border:`1px solid #ddd`, padding:4}}><b>{header[0]}</b></td>
                                    <td className={`headerName${i}`}style={{border:`1px solid #ddd`, padding:4, display:`none`}}><input type="text" name="" id="" value={this.state.changed[i] ? this.state.changed[i][1] : ""} onChange={(e) => this.editNewText(e,i)}/></td>
                                    <td className={`originalValue${i}`}style={{border:`1px solid #ddd`, padding:4}}>{header[1]}</td>
                                    <td className={`headerValue${i}`}style={{border:`1px solid #ddd`, padding:4, display:`none`}}>
                                        <select name="" id="" onChange={(e) => this.editNewType(e,i)}>
                                            <option selected="true" disabled="disabled">Choose Type</option>   
                                            <option value="text">String</option>
                                            <option value="date">Date</option>
                                            <option value="float">Decimal</option>
                                            <option value="int">Integer</option>
                                        </select>
                                    </td>
                                    <td className={`edit${i}`} style={{color:`blue`, textDecoration:`underline`, cursor:`pointer`}} onClick={() => this.editHeader(i)}>Edit</td>
                                    <td className={`save${i}`} style={{color:`blue`, textDecoration:`underline`, cursor:`pointer`, display:`none`}} onClick={() => this.submit()}>Save</td>
                                    <td className={`cancel${i}`} style={{color:`blue`, textDecoration:`underline`, cursor:`pointer`, display:`none`}} onClick={() => this.cancelEdit(i)}>Cancel</td>
                                </tr>
                            )): null}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ManagerHasGroup