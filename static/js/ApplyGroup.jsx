import React from 'react'

class ApplyGroup extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            groupList: [],
            selectedGroup:-1
        }
        this.callBackendAPI = this.callBackendAPI.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.update = this.update.bind(this)
        this.postData = this.postData.bind(this)
    }

    componentDidMount() {
        this.callBackendAPI('/get_all_groups')
        .then(res => {
            if(res.status === 200) {
                this.setState({groupList:res.data})
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

    handleClick() {
        if(this.state.selectedGroup === -1) {
            alert("Please select a group to Apply for!")
        } else {
            this.postData('/apply_to_group', {group_name: this.state.selectedGroup})
            .then(res => {
                alert(`You are now in Group: ${this.state.selectedGroup}`)
                window.location.reload()
            })
        }
    }

    update(e) {
        this.setState({selectedGroup: e.target.options[e.target.selectedIndex].text})
    }

    render() {
        return (
            <div style={{display:`grid`}}>
                <h1 style={{fontSize:`25px`, fontWeight:`900`, textShadow:`rgb(255, 127, 80) 0.5px 1px 0.5px`, textTransform:`uppercase`, color: `#ff7f50`, textAlign:`center`}}>Apply for Group</h1>    
                <div style={{width:`60%`, height:300, background:`white`, padding:20, display:`flex`, flexDirection:`column`, justifyContent:`space-around`, alignItems:`center`, justifySelf:`center`}}>
                    <div style={{display:`flex`, flexDirection:`column`, justifyContent:`center`, alignItems:`center`}}>
                        <div style={{fontWeight:`bold`}}>Apply for Group ID:</div>
                        <select style={{margin:`auto`, marginTop:10}} onChange={e => this.update(e)}>
                            <option selected disabled hidden style={{ color: `gray` }}>-</option>
                            {this.state.groupList.map(function(value, i) {
                                return (
                                    <option key={i} value={value}>
                                        {value.id}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button onClick={this.handleClick}>Apply!</button>
                </div>
            </div>
        )
    }  
}

export default ApplyGroup