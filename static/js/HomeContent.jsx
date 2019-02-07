import React from "react";
import HomeVizCard from './HomeVizCard';

require("../css/fullstack.css");
require("../css/HomeContent.css");
var $ = require("jquery");

export default class HomeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saveViz:[]
        }

        this.callBackendAPI = this.callBackendAPI.bind(this);
    }

    componentDidMount() {
        var saveViz = []
        this.callBackendAPI('/get_all_saved_viz')
        .then(res => {
            var datas = res.data
            datas.forEach(data => {
                var keys = Object.keys(data)
                keys.forEach(key => {
                    var temp = []
                    temp.push(key)
                    temp.push(data[key])
                    saveViz.push(temp)
                })
            })

            this.setState({saveViz})
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
            <div>
                <HomeVizCard title="Saved Visualizations" list={this.state.saveViz}/>
            </div>
        );
    }
}
