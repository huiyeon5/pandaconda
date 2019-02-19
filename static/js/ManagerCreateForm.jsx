import React from 'react';
import ValidHeaderInput from './ValidHeaderInput'

class ManagerCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupname:null,
            validHeaders:[],
        }

        this.addValidHeader = this.addValidHeader.bind(this)
        this.removeValidHeader = this.removeValidHeader.bind(this)
        this.updateGroupName = this.updateGroupName.bind(this)
        this.updateHeaderValue = this.updateHeaderValue.bind(this)
        this.updateDataValue = this.updateDataValue.bind(this)
        this.postData = this.postData.bind(this)
        this.createGroup = this.createGroup.bind(this)
    }

    addValidHeader() {
        var validHeaders = this.state.validHeaders;

        validHeaders.push({
            show: true,
            headerName: null,
            dataType:"date"
        })

        this.setState({validHeaders})
    }
    
    removeValidHeader(i) {
        var validHeaders = this.state.validHeaders;
    
        var obj = validHeaders[i];
        obj['show'] = false;
        validHeaders[i] = obj
        document.querySelector(`.validHeader${i}`).style.display = `none`;
    
        this.setState({validHeaders})
    }
    
    updateGroupName(i) {
        this.setState({groupname:i});
    }
    
    updateHeaderValue(i, value) {
        var validHeaders = this.state.validHeaders;
    
        var obj = validHeaders[i];
        obj['headerName'] = value;
        validHeaders[i] = obj
    
        this.setState({validHeaders})
    }

    updateDataValue(i, value) {
        var validHeaders = this.state.validHeaders;
    
        var obj = validHeaders[i];
        obj['dataType'] = value;
        validHeaders[i] = obj
    
        this.setState({validHeaders})
    }

    createGroup() {
        if(this.state.groupname) {
            var post = []
            var fine = true;
            this.state.validHeaders.forEach(header => {
                var temp = {}
                if(header['show']) {
                    if(header['headerName'] && header['dataType']) {
                        temp['header'] = header['headerName']
                        temp['type'] = header['dataType']
                        post.push(temp)
                    } else {
                        alert("Please add Header Name / Data Type for all Fields")
                        fine = false;
                    }
                }
            })
            var finalObj = {
                groupname: this.state.groupname,
                data: post
            }
            if(fine) {
                this.postData('/create_groups', finalObj)
                .then(res => {
                    if(res.status === 200) {
                        alert("Group has been created!")
                        window.location = "/"
                    } else {
                        alert("Group Name already Exists!")
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        } else {
            alert("Please Add Group Name!")
        }
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

    render() {
        return (
            <div style={{height:`100%`, display:`grid`, gridTemplateRows:`100px auto`, position:`relative`}}>
                <div>
                    <h3>You need 2 things in order to create a Group</h3>
                    <ul>
                        <li>You need to add the Group Name</li>
                        <li>You need to add a List of Valid Headers for your Group</li>
                    </ul>
                </div>
                <div style={{display:`grid`, gridTemplateColumns:`1fr 1fr`, height:`100%`}}>
                    <div style={{width:`100%`, height:`100%`, display:`flex`, justifyContent:`flex-start`, alignItems:`center`, flexDirection:`column`, marginTop:30}}>
                        <label htmlFor="groupname">Enter the Group Name: </label>
                        <input type="text" name="groupname" id="groupname" onChange={(e)=> this.updateGroupName(e.target.value)}/>
                    </div>
                    <div style={{width:`100%`, height:`100%`, position:`relative`}}>
                        <button onClick={this.addValidHeader} style={{margin:`auto`, position:`absolute`, top:0, left:`50%`, transform:`translateX(-50%)`, width:200}}>Add Valid Header</button>
                        <div style={{position:`absolute`, top:50, left:`50%`, transform:`translateX(-50%)`,width:`100%`, display:`flex`, flexDirection:`column`, alignItems:`center`}}>
                            {this.state.validHeaders.map((item,i) => (
                                <ValidHeaderInput 
                                    key={i} 
                                    num={i} 
                                    onRemove={this.removeValidHeader} 
                                    updateDataValue={this.updateDataValue}
                                    updateHeaderValue={this.updateHeaderValue}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <button style={{position:`absolute`, top:`90%`, left:`50%`, transform:`translate(-50%, -50%)`}} onClick={this.createGroup}>Create Group!</button>
            </div>
        )
    }
}

export default ManagerCreateForm