import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes);

class ValidHeaderInput extends React.Component {
    render() {
        return (
            <div style={{marginBottom:8}} className={`validHeader${this.props.num}`}>
                <FontAwesomeIcon icon={["fas", "times"]} style={{color:`red`, marginRight:10, cursor:`pointer`}} onClick={() => this.props.onRemove(this.props.num)}/>
                <label htmlFor="validheadername">Header Name: </label>
                <input className={`validheadernameinput${this.props.num}`} type="text" name="validheadername" id="validheadername" onChange={(e) => this.props.updateHeaderValue(this.props.num, e.target.value)}/>
                <select className={`validheaderdatatype${this.props.num}`} onChange={(e) => this.props.updateDataValue(this.props.num,e.target.options[e.target.options.selectedIndex].value)}>
                    <option value="date">Date</option>
                    <option value="int">Integer</option>
                    <option value="double">Float(Decimal Points</option>
                    <option value="string">String (Text)</option>
                </select>
            </div>
        )
    }
}

export default ValidHeaderInput