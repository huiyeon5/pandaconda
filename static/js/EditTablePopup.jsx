import React from "react";
import "../css/EditTable.css";


class EditTablePopup extends React.Component {
    componentDidMount() {
        var id = document.createElement("table")
        var trh = document.createElement("tr");
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
                td.appendChild(document.createTextNode(this.props.data[j][1][i]));
                trd.appendChild(td);
            }
            id.appendChild(trd);
        }

        document.querySelector(".popup_inner").appendChild(id)
    }

    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
          <button onClick={this.props.closePopup}>close</button>
          </div>
        </div>
      );
    }
}

export default EditTablePopup