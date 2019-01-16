import React from "react";
import "../css/Table"


export default class Table extends React.Component {
    constructor(){
        super()
        this.state = {
            obj:{
                data: [
                    {col_header: "Unnamed: 0", imported_as: null, drop: true, cosine: "NA"}, 
                    {col_header: "Depot", imported_as: ["Depot", "ActivityDate", "Customer", "Inventory", "SKU", "Unnamed"], drop: false, cosine: "high"}, {col_header: "SKU", imported_as: ["SKU", "ActivityDate", "Customer", "Depot", "Inventory", "Unnamed"], drop: false, cosine: "high"}, 
                    {col_header: "Customer", imported_as: ["Customer", "ActivityDate", "Depot", "Inventory", "SKU", "Unnamed"], drop: false, cosine: "high"}, {col_header: "ActivityDate", imported_as: ["ActivityDate", "Customer", "Depot", "Inventory", "SKU", "Unnamed"], drop: false, cosine: "high"}, {col_header: "Inventory", imported_as: ["Inventory", "ActivityDate", "Customer", "Depot", "SKU", "Unnamed"], drop: false, cosine: "high"}
                        ], 
                    status: 400 
            }
        };
        //this.loadTable = this.loadTable.bind(this);
        //this.postData = this.postData.bind(this);
        this.fillTable = this.fillTable.bind(this);
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

    // loadTable(e) {
    //     this.postData("/upload_api")
    //         .then(res => {
    //             if (res["status"] === 400) {
    //                 console.log(res)
    //             } else {
    //                 console.log(res);
    //                 alert("error reload table");
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }


    //{"col_header": "Depot", "imported_as": ["Depot", "ActivityDate", "Customer", "Inventory", "SKU", "Unnamed"]"drop": false, "cosine": "high"}
    fillTable(){
        var i;
        var j;
        var totalDataRows = this.state.obj.data;
            for(i=0; i<totalDataRows.length; i=i+1){
                var data=totalDataRows[i]
                
                //First Column
                var newRow = document.createElement("TR")
                var data1 = document.createElement("TD")
                var val1 = document.createTextNode(data.col_header)
                data1.appendChild(val1)
                newRow.appendChild(data1)
                
                //Second Column
                var data2 = document.createElement("TD")
                var select = document.createElement("SELECT")
                if (data.imported_as){
                    for(j=0; j<data.imported_as.length; j=j+1){
                        var options = document.createElement("OPTION")  
                        options.value=data.imported_as[j]
                        options.innerHTML = data.imported_as[j]
                        select.appendChild(options)       
                    } 
                    data2.appendChild(select)
                }
                newRow.appendChild(data2)
                
                //Third Column
                var data3 = document.createElement("TD")
                var check = document.createElement("input")
                check.setAttribute("type", "checkbox")
                data3.appendChild(check)
                newRow.appendChild(data3)

                //Fourth Column
                var data4 = document.createElement("TD")
                var check2 = document.createElement("input")
                check2.setAttribute("type", "checkbox")
                data4.appendChild(check2)
                newRow.appendChild(data4)


                document.querySelector(".tBody").appendChild(newRow)

            }
            

            

        }
    
    render() {
        return(
            
            <div>
                <button onClick={this.fillTable}>here</button>
                <table className="table" id="table" >
                    <tbody className="tBody">
                        <tr>
                            <th>CSV Headers</th>
                            <th>Valid Headers</th> 
                            <th>Rename Header</th>
                            <th>Drop Header</th>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        )


    }

}