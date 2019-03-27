import React from 'react'
import '../css/DatasetViewerPC.css'

class DatasetViewer extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.handleGroupClick = this.handleGroupClick.bind(this)
    }

    handleClick(e, i) {
        this.removeClass();
        var el = document.querySelector(`.data${i + 1}`);
        el.classList.add("dsactive");
        var selected = el.classList[1];
        this.props.onClick(document.querySelector("."+selected + " .datasetnamepc").innerText)
    }

    handleGroupClick(e, i) {
        this.removeClass();
        var el = document.querySelector(`.data${i + 1}s`);
        el.classList.add("dsactive");
        var selected = el.classList[1];
        this.props.onClick(document.querySelector("."+selected + " .datasetnamepc").innerText)
    }

    removeClass() {
        var s = document.querySelectorAll(".datasetpc")
        s.forEach(item => {
            item.classList.remove("dsactive");
        })
        var s = document.querySelectorAll(".datasetpcs")
        s.forEach(item => {
            item.classList.remove("dsactive");
        })
    }

    render() {
        if(this.props.select) {
            return (
                <div style={{background:`white`, maxWidth:`100%`, height:`100%`, overflowY:`scroll`, padding:10, borderRadius:`5px`, boxShadow:`0 4px 4px -2px gray`,gridColumn:`1/5`, zIndex:1000, gridRow:`2/3`}}>
                    <h2 style={{marginBottom:0}}>{this.props.title}</h2>
                    {this.props.select ? <h4 style={{fontSize:11, fontStyle:`italic`, marginTop:0}}>(Click on the dataset to push to group level)</h4> :null}
                    <div>
                        {this.props.data.map((d, i) => {
                            return (
                                <div key={i} className={`datasetpc data${i + 1}`} onClick={(e) => this.handleClick(e, i)}><span className="datasetindexpc">{i + 1}.</span><span className="datasetnamepc">{d}</span></div>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{background:`white`, maxWidth:`100%`, height:`100%`, overflowY:`scroll`, padding:10, borderRadius:`5px`, boxShadow:`0 4px 4px -2px gray`, zIndex:1000, gridRow:`1/2`, gridColumn:`3/5`}}>
                    <h2 style={{marginBottom:0}}>{this.props.title}</h2>
                    <div>
                        {this.props.data.map((d, i) => {
                            return (
                                <div key={i} className={`datasetpcs data${i + 1}s`} onClick={(e) => this.handleGroupClick(e, i)}><span className="datasetindexpc">{i + 1}.</span><span className="datasetnamepc">{d}</span></div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
}

export default DatasetViewer