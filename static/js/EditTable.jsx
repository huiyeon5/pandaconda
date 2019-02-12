import React from "react";
import "../css/EditTable.css";
import EditTablePopup from './EditTablePopup' 


export default class EditTable extends React.Component {
  constructor() {
    super();
    this.state = {
      obj: null,
      showPopup: false,
      data : null
    };
    //this.loadTable = this.loadTable.bind(this);
    //this.postData = this.postData.bind(this);
    this.fillTable = this.fillTable.bind(this);
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.result = this.result.bind(this);
    this.postData = this.postData.bind(this);
  }

  togglePopup() {
    this.callBackendAPI("/view_data_api")
      .then(res => {
        console.log(res);
        if (res["status"] == 500) {
          alert("error")
        } else {
          this.setState({ data : res.data },
            () => {
              this.setState({
                showPopup: !this.state.showPopup
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });

    


  }

  componentDidMount() {
    this.callBackendAPI("/update_api")
      .then(res => {
        console.log(res);
        if (res["status"] == 500) {
          // window.location='/uploa
        } else {
          this.setState({ obj: res });
          this.fillTable();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  async callBackendAPI(url) {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  // async postData(url, bodyObj) {
  //     const response = await fetch(url, {
  //         method: "POST",
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify(bodyObj)
  //     });
  //     const body = await response.json();
  //     return body;
  // }

  fillTable() {
    var i;
    var j;
    var totalDataRows = this.state.obj.data;
    for (i = 0; i < totalDataRows.length; i = i + 1) {
      var data = totalDataRows[i];
      console.log(data)
      //First Column
      var newRow = document.createElement("TR");
      newRow.classList.add("tr");
      newRow.classList.add(`tr${i + 1}`);
      var data1 = document.createElement("TD");

      data1.classList.add(`td`);
      data1.classList.add(`td1`);
      var val1 = document.createTextNode(data.col_header);
      data1.appendChild(val1);
      newRow.appendChild(data1);

      //Second Column
      var data2 = document.createElement("TD");
      data2.classList.add(`td`);
      data2.classList.add(`td2`);
      var select = document.createElement("SELECT");
      if (data.imported_as) {
        for (j = 0; j < data.imported_as.length; j = j + 1) {
          var options = document.createElement("OPTION");
          options.value = data.imported_as[j];
          options.innerHTML = data.imported_as[j];
          select.appendChild(options);
        }
        data2.appendChild(select);
      }
      newRow.appendChild(data2);

      //Third Column
      // var data3 = document.createElement("TD")
      // data3.classList.add(`td`);
      // data3.classList.add(`td3`);
      // var check = document.createElement("input")
      // check.setAttribute("type", "checkbox")
      // data3.appendChild(check)
      // newRow.appendChild(data3)

      //Fourth Column
      var data4 = document.createElement("TD");
      data4.classList.add(`td`);
      data4.classList.add(`td4`);
      var check2 = document.createElement("input");
      check2.classList.add(`check-${i + 1}`);
      check2.setAttribute("type", "checkbox");
      // check2.setAttribute("onchange", "{this.handleChange.bind(this)}")
      if (data["drop"]) {
        check2.checked = true;
        check2.disabled = true;
      }
      check2.addEventListener("change", function(e) {
        var className = e.target.classList[0];
        var index = parseInt(
          className.substring(className.indexOf("-") + 1, className.length)
        );
        var row = document.querySelector(`.tr${index} > .td2 > select`);
        console.log(row);
        if (row.disabled) {
          row.disabled = false;
        } else {
          row.disabled = true;
        }
      });
      data4.appendChild(check2);
      newRow.appendChild(data4);

      document.querySelector(".tBody").appendChild(newRow);
    }
  }

  result() {
    var obj = {};

    /*
        var obj=
            { 
                "old_header_name" : "new_header_name" ,            

                "old_header_name" : "new_header_name"   


            }
        */

    var i;
    var totalDataRows = this.state.obj.data;

    var old_header_list = document.getElementsByClassName("td td1");
    //iterating through each row in the table
    for (i = 0; i < totalDataRows.length; i = i + 1) {
      var old_header;
      var new_header;
      //result = result + (old_header_list[i].innerHTML)
      var row = document.getElementsByClassName("tr tr" + (i + 1));
      if (document.querySelector(`.tr${i + 1} > .td4`).checked) {
        new_header = null;
      } else {
        old_header = document.querySelector(`.tr${i + 1} > .td1`).innerHTML;

        //retrieving user selected value from the dropdown

        var dropdown = document.querySelector(`.tr${i + 1} > .td2 > select`);
        if (dropdown) {
          new_header = dropdown.options[dropdown.selectedIndex].text;
        } else {
          new_header = null;
        }
      }
      var key = old_header;
      obj[key] = new_header;
    }
    this.postData("/finalize_headers_api", obj)
      .then(res => {
        if (res["status"] === 400) {
        } else {
          console.log(res);
          window.location = "/";
        }
        // }
      })
      .catch(err => {
        console.log(err);
      });
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

  // if drop, new_header will be null

  // If changed selected, new header will be the new name

  // if no change, will be the same

  render() {
    return (
      <div>
        <div className="align-right-pc">
        <button onClick={this.togglePopup.bind(this)}>Show Data</button>
        
        </div>
        <br/>
         
        <div className="table-container-pc">
          <table className="table" id="table">
            <tbody className="tBody">
              <tr className="header-edittable-pc header-value">
                <th>CSV Headers</th>
                <th>Valid Headers</th>
                <th>Drop Header</th>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="align-right-pc">
          <button className="change-btn-pc" onClick={this.result}>
            Change
          </button>

         
            {this.state.showPopup ? 
              <EditTablePopup
                data={this.state.data}
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
        </div>
      </div>
    );
  }
}
