import React from 'react';

const GroupInfo = ({manager, numMember, managerName, managerEmail, groupId}) => (
    <div style={{background:`white`,padding:`5px 20px 5px`, width:300, height:300}}>
        <h1>Group: {groupId}</h1>
        <div>
            <div>
                <h4>Manager: </h4>
                {manager ? <p><b>ID:</b> {manager}</p> : null}
                {managerName ? <p><b>Name:</b> {managerName}</p> : null}
                {managerEmail ? <p><b>Email:</b> {managerEmail}</p> : null}
            </div>
            <p>Number of Members: {numMember}</p>
        </div>
    </div>
)

export default GroupInfo