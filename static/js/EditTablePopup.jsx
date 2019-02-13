import React from "react";
import "../css/EditTable.css";


class EditTablePopup extends React.Component {
    componentDidMount() {
        
        var id = document.createElement("table");
        id.style.width = "80%"
        id.style.position = "absolute"
        id.style.top = "50%"
        id.style.left = "50%"
        id.style.transform = "translate(-50%,-50%)"
        id.classList.add("table");
        var tBody = document.createElement("tBody");
        id.classList.add("tBody");
        var trh = document.createElement("tr");
        trh.classList.add("tr", "popup-table-header-pc")
        
        this.props.data.forEach(d => {
            var th = document.createElement("th")
            th.appendChild(document.createTextNode(d[0]))
            trh.appendChild(th);
        })

        id.appendChild(trh);

        for(let i = 0; i < this.props.data[0][1].length; i++) {
            var trd = document.createElement("tr");
            for(let j = 0; j < this.props.data.length; j++) {
                var td = document.createElement("td");
                td.style.fontSize = "12px"
                td.classList.add("td")
                td.appendChild(document.createTextNode(this.props.data[j][1][i]));
                trd.appendChild(td);
            }
            id.appendChild(trd);
        }

        document.querySelector(".popup_inner-pc").appendChild(id)
    }

    render() {
      return (
        <div className='popup-pc'>
          <div className='popup_inner-pc'>
            {/* <div className="table-container-pc">
                {/* <table className="table" id="table">
                    <tbody className="tBody">
                        <tr className="header-edittable-pc header-value-pc">
                        </tr>
                    </tbody>
                </table> 
            </div> */}
            <button id ="close-pc" onClick={this.props.closePopup}>X</button>
          </div>
        </div>
      );
    }
}

export default EditTablePopup