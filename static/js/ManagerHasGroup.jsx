import React from 'react';

class ManagerHasGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email:null,
        }
        this.postData = this.postData.bind(this);
    }

    componentDidMount() {
        console.log(this.props.managerId)
        this.postData('/get_manager_info', { manager_id : this.props.managerId })
        .then(res => {
            if(res.status === 200) {
                this.setState({
                    name: res.name,
                    email:res.email
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

    render() {
        return (
            <h2>I have a group alr {this.state.name} {this.state.email}</h2>
        )
    }
}

export default ManagerHasGroup