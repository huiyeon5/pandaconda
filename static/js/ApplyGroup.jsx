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
            
        }
    }

    update(e) {
        this.setState({selectedGroup: e.target.options[e.target.selectedIndex].text})
    }

    render() {
        return (
            <div>
                <h1>Apply for Group</h1>    
                <div style={{width:300, height:300, background:`white`, padding:20, display:`flex`, flexDirection:`column`, justifyContent:`space-around`, alignItems:`center`}}>
                    <div style={{display:`flex`, flexDirection:`column`, justifyContent:`center`, alignItems:`center`}}>
                        <div>Apply for Group ID:</div>
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