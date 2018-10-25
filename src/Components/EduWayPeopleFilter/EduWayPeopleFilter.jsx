import React, { Component } from 'react';
import "./EduWayPeopleFilter.css";
import EduWayPeopleInput from "../../Components/EduWayPeopleInput/EduWayPeopleInput";


class EduWayPeopleFilter extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="edu-people-list-filter">
                <EduWayPeopleInput/>
                <EduWayPeopleInput/>
                <EduWayPeopleInput/>
                <EduWayPeopleInput/>
                <EduWayPeopleInput/>
                <EduWayPeopleInput/>
                <EduWayPeopleInput/>

                <button className="edu-people-list-btn">Подобрать</button>
            </div>
         );
    }
}
 
export default EduWayPeopleFilter;