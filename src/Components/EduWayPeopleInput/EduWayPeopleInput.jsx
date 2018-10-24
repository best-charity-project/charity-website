import React, { Component } from 'react';
import "./EduWayPeopleInput.css";

class EduWayPeopleInput extends Component {
    state = {  }
    render() { 
        return (
            <div className="edu-way-people-input-container">
                <label className="edu-way-people-label">label</label>
                <input type="text" className="edu-way-people-input"/>
            </div>
            
        );
    }
}
 
export default EduWayPeopleInput;