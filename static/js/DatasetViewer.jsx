import React from 'react'
import '../css/DatasetViewerPC.css'

class DatasetViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            selected:null,
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        if(this.state.selected) {
            // document.querySelector("." + this.state.selected).classList.remove("dsactive");
            this.removeClass();
            e.target.classList.add("dsactive");
            var selected = e.target.classList[1];
            this.setState({selected}, () => {
                // console.log(document.querySelector("."+selected + " .datasetnamepc"))
                this.props.onClick(document.querySelector("."+selected + " .datasetnamepc").innerText)
            })
        } else {
            this.removeClass();
            e.target.classList.add("dsactive");
            var selected = e.target.classList[1];
            this.setState({selected}, () => {
                // console.log(document.querySelector("."+selected + " .datasetnamepc"))
                this.props.onClick(document.querySelector("."+selected + " .datasetnamepc").innerText)
            })
        }
    }

    removeClass() {
        var s = document.querySelectorAll(".datasetpc")
        s.forEach(item => {
            item.classList.remove("dsactive");
        })
    }

    render() {
        console.log(this.props)
        return (
            <div style={this.props.select ? {background:`white`, maxWidth:`100%`, height:`100%`, overflowY:`scroll`, padding:10, borderRadius:`5px`, boxShadow:`0 4px 4px -2px gray`,gridColumn:`1/3`} : {background:`white`, maxWidth:`100%`, height:`100%`, overflowY:`scroll`, padding:10, borderRadius:`5px`, boxShadow:`0 4px 4px -2px gray`}}>
                <h2 style={{marginBottom:0}}>{this.props.title}</h2>
                {this.props.select ? <h4 style={{fontSize:11, fontStyle:`italic`, marginTop:0}}>(Click on the dataset to push to group level)</h4> :null}
                <div>
                    {this.props.data.map((d, i) => (
                        <div key={i} className={`datasetpc data${i + 1}`} onClick={(e) => this.handleClick(e)}><span className="datasetindexpc">{i + 1}.</span><span className="datasetnamepc">{d}</span></div>
                    ))}
                </div>
            </div>
        )
    }
}

export default DatasetViewer