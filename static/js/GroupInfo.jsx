import React from 'react';

const GroupInfo = ({manager, numMember, managerName, managerEmail, groupId}) => (
    <div style={{background:`white`,padding:`5px 20px 5px`, width:`100%`, height:`100%`, gridColumn:`1/2`}}>
        <h1>Group: {groupId}</h1>
        <div>
            <div>
                {manager ? <p><b>Manager ID:</b> {manager}</p> : null}
                {managerName ? <p><b>Manager Name:</b> {managerName}</p> : null}
                {managerEmail ? <p><b>Manager Email:</b> {managerEmail}</p> : null}
            </div>
            <p>Number of Members: {numMember}</p>
        </div>
    </div>
)

export default GroupInfo